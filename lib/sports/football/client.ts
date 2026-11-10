import {
  StandingsResponse,
  MatchesResponse,
  TopScorersResponse,
  FootballApiResult,
  FootballApiError,
} from "./types";

const BASE_URL = "https://api.football-data.org/v4";

// Revalidation cache times in seconds per requirements
export const CACHE_REVALIDATE = {
  STANDINGS: 600, // 10 menit
  MATCHES: 300, // 5 menit
  TOP_SCORERS: 1800, // 30 menit
} as const;

interface FetchOptions {
  revalidate: number;
  queryParams?: Record<string, string | number | undefined>;
}

async function fetchFromFootballApi<T>(
  endpoint: string,
  options: FetchOptions
): Promise<FootballApiResult<T>> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    return {
      success: false,
      error: {
        code: "MISSING_KEY",
        message:
          "API Key (FOOTBALL_DATA_API_KEY) belum dikonfigurasi di lingkungan server (.env.local).",
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
        "X-Auth-Token": apiKey.trim(),
      },
      next: {
        revalidate: options.revalidate,
      },
    });

    if (!response.ok) {
      const status = response.status;
      let error: FootballApiError;

      if (status === 401 || status === 403) {
        error = {
          code: status === 401 ? "UNAUTHORIZED" : "FORBIDDEN",
          status,
          message:
            "Akses API ditolak atau kunci API tidak valid. Periksa konfigurasi FOOTBALL_DATA_API_KEY di server.",
        };
      } else if (status === 429) {
        error = {
          code: "RATE_LIMITED",
          status,
          message:
            "Batas permintaan API football-data.org tercapai (maksimal 10 request/menit untuk paket gratis). Silakan tunggu sebentar sebelum memuat ulang.",
        };
      } else if (status === 404) {
        error = {
          code: "NOT_FOUND",
          status,
          message:
            "Data kompetisi tidak ditemukan atau tidak tersedia dalam paket gratis.",
        };
      } else {
        error = {
          code: "UNKNOWN",
          status,
          message: `Gagal memuat data dari football-data.org (Status HTTP ${status}).`,
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
          "Gagal menghubungi server football-data.org. Periksa koneksi internet Anda atau coba lagi nanti.",
      },
    };
  }
}

/**
 * Mengambil klasemen liga sepak bola berdasarkan kode kompetisi (e.g. 'PL', 'PD', 'SA').
 * Cache di-revalidate setiap 10 menit (600 detik).
 */
export async function getStandings(
  code: string
): Promise<FootballApiResult<StandingsResponse>> {
  const result = await fetchFromFootballApi<StandingsResponse>(
    `/competitions/${encodeURIComponent(code.toUpperCase())}/standings`,
    {
      revalidate: CACHE_REVALIDATE.STANDINGS,
    }
  );

  if (result.success) {
    if (!result.data.standings || result.data.standings.length === 0) {
      return {
        success: false,
        error: {
          code: "EMPTY_DATA",
          message:
            "Data klasemen belum tersedia untuk musim kompetisi yang dipilih.",
        },
      };
    }
  }

  return result;
}

export interface GetMatchesOptions {
  dateFrom?: string;
  dateTo?: string;
  matchday?: number;
  status?: string;
}

/**
 * Mengambil jadwal dan hasil pertandingan berdasarkan kode kompetisi dan opsi filter.
 * Cache di-revalidate setiap 5 menit (300 detik).
 */
export async function getMatches(
  code: string,
  options?: GetMatchesOptions
): Promise<FootballApiResult<MatchesResponse>> {
  const result = await fetchFromFootballApi<MatchesResponse>(
    `/competitions/${encodeURIComponent(code.toUpperCase())}/matches`,
    {
      revalidate: CACHE_REVALIDATE.MATCHES,
      queryParams: {
        dateFrom: options?.dateFrom,
        dateTo: options?.dateTo,
        matchday: options?.matchday,
        status: options?.status,
      },
    }
  );

  if (result.success) {
    if (!result.data.matches || result.data.matches.length === 0) {
      return {
        success: false,
        error: {
          code: "EMPTY_DATA",
          message:
            "Tidak ada pertandingan yang ditemukan untuk kriteria yang dipilih.",
        },
      };
    }
  }

  return result;
}

/**
 * Mengambil daftar pencetak gol terbanyak (top skorer) untuk sebuah kompetisi.
 * Cache di-revalidate setiap 30 menit (1800 detik).
 */
export async function getTopScorers(
  code: string,
  limit: number = 20
): Promise<FootballApiResult<TopScorersResponse>> {
  const result = await fetchFromFootballApi<TopScorersResponse>(
    `/competitions/${encodeURIComponent(code.toUpperCase())}/scorers`,
    {
      revalidate: CACHE_REVALIDATE.TOP_SCORERS,
      queryParams: {
        limit,
      },
    }
  );

  if (result.success) {
    if (!result.data.scorers || result.data.scorers.length === 0) {
      return {
        success: false,
        error: {
          code: "EMPTY_DATA",
          message:
            "Data pencetak gol terbanyak belum tersedia untuk kompetisi ini.",
        },
      };
    }
  }

  return result;
}
