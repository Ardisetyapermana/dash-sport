import {
  StandingRow,
  Game,
  BasketballApiResult,
  BasketballApiError,
} from "./types";

const BASE_URL = "https://api.api-ninjas.com/v1";

// Revalidation cache times in seconds per requirements
export const CACHE_REVALIDATE = {
  STANDINGS: 1800, // 30 menit
  GAMES: 600, // 10 menit
} as const;

interface FetchOptions {
  revalidate: number;
  queryParams?: Record<string, string | number | undefined>;
}

async function fetchFromBasketballApi<T>(
  endpoint: string,
  options: FetchOptions
): Promise<BasketballApiResult<T>> {
  const apiKey =
    process.env.API_NINJAS_KEY || process.env.API_NINJA_KEY;

  if (!apiKey || apiKey.trim() === "") {
    return {
      success: false,
      error: {
        code: "MISSING_KEY",
        message:
          "API Key (API_NINJAS_KEY) belum dikonfigurasi di lingkungan server (.env.local).",
      },
    };
  }

  // Build URL with query params
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (options.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": apiKey.trim(),
        Accept: "application/json",
      },
      next: {
        revalidate: options.revalidate,
      },
    });

    if (!response.ok) {
      const status = response.status;
      let error: BasketballApiError;

      if (status === 400 || status === 401 || status === 403) {
        error = {
          code: status === 401 ? "UNAUTHORIZED" : "FORBIDDEN",
          status,
          message:
            "Akses API ditolak atau kunci API tidak valid. Periksa konfigurasi API_NINJAS_KEY di server.",
        };
      } else if (status === 429) {
        error = {
          code: "RATE_LIMITED",
          status,
          message:
            "Batas frekuensi permintaan ke API Basketball (API Ninjas) tercapai (100 request/jam untuk paket gratis). Silakan tunggu beberapa saat lalu muat ulang halaman.",
        };
      } else if (status === 404) {
        error = {
          code: "NOT_FOUND",
          status,
          message:
            "Data bola basket tidak ditemukan untuk liga atau parameter yang diminta.",
        };
      } else {
        error = {
          code: "UNKNOWN",
          status,
          message: `Gagal memuat data bola basket dari API Ninjas (Status HTTP ${status}).`,
        };
      }

      return { success: false, error };
    }

    const data = (await response.json()) as T;
    return { success: true, data };
  } catch (err) {
    const isNetworkError =
      err instanceof TypeError && err.message.toLowerCase().includes("fetch");
    return {
      success: false,
      error: {
        code: isNetworkError ? "NETWORK_ERROR" : "UNKNOWN",
        message:
          "Gagal menghubungi server API Ninjas. Periksa koneksi internet Anda atau coba lagi nanti.",
      },
    };
  }
}

export interface GetStandingsOptions {
  league?: string;
  season?: number;
}

/**
 * Mengambil klasemen bola basket (NBA) untuk musim berjalan atau musim yang ditentukan.
 * Cache di-revalidate setiap 30 menit (1800 detik).
 */
export async function getStandings(
  options?: string | GetStandingsOptions
): Promise<BasketballApiResult<StandingRow[]>> {
  const opts: GetStandingsOptions =
    typeof options === "string" ? { league: options } : options || {};

  const queryParams: Record<string, string | number | undefined> = {
    league: opts.league || "nba",
  };
  if (opts.season !== undefined) {
    queryParams.season = opts.season;
  }

  const result = await fetchFromBasketballApi<StandingRow[]>(
    "/basketballstandings",
    {
      revalidate: CACHE_REVALIDATE.STANDINGS,
      queryParams,
    }
  );

  if (result.success && (!result.data || result.data.length === 0)) {
    return {
      success: false,
      error: {
        code: "EMPTY_DATA",
        message: "Data klasemen bola basket belum tersedia untuk musim ini.",
      },
    };
  }

  return result;
}

export interface GetGamesOptions {
  league?: string;
  date?: string; // Format: YYYY-MM-DD
  season?: number;
  seasonType?: string;
}

/**
 * Mengambil jadwal dan skor pertandingan bola basket (NBA).
 * Cache di-revalidate setiap 10 menit (600 detik).
 */
export async function getGames(
  options?: string | GetGamesOptions
): Promise<BasketballApiResult<Game[]>> {
  const opts: GetGamesOptions =
    typeof options === "string" ? { date: options } : options || {};

  const queryParams: Record<string, string | number | undefined> = {
    league: opts.league || "nba",
  };
  if (opts.date) {
    queryParams.date = opts.date;
  }
  if (opts.season !== undefined) {
    queryParams.season = opts.season;
  }
  if (opts.seasonType) {
    queryParams.season_type = opts.seasonType;
  }

  const result = await fetchFromBasketballApi<Game[]>("/basketballgames", {
    revalidate: CACHE_REVALIDATE.GAMES,
    queryParams,
  });

  if (result.success && (!result.data || result.data.length === 0)) {
    return {
      success: false,
      error: {
        code: "EMPTY_DATA",
        message: "Tidak ada data pertandingan basket yang ditemukan.",
      },
    };
  }

  return result;
}
