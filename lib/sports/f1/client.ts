import {
  MRDataResponse,
  DriverStandingsTable,
  ConstructorStandingsTable,
  ScheduleTable,
  LastRaceResultsTable,
  F1DriverStanding,
  F1ConstructorStanding,
  F1Race,
  F1RaceWithResults,
  F1ApiResult,
  F1ApiError,
} from "./types";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export const CACHE_REVALIDATE = {
  STANDINGS: 3600, // 1 jam
  SCHEDULE: 21600, // 6 jam
  LAST_RESULTS: 3600, // 1 jam
} as const;

interface FetchOptions {
  revalidate: number;
}

async function fetchFromJolpicaApi<T>(
  endpoint: string,
  options: FetchOptions
): Promise<F1ApiResult<T>> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: options.revalidate,
      },
    });

    if (!response.ok) {
      const status = response.status;
      let error: F1ApiError;

      if (status === 429) {
        error = {
          code: "RATE_LIMITED",
          status,
          message:
            "Batas frekuensi permintaan ke API Formula 1 (Jolpica) tercapai. Silakan tunggu beberapa saat lalu muat ulang halaman.",
        };
      } else if (status === 404) {
        error = {
          code: "NOT_FOUND",
          status,
          message: "Data Formula 1 tidak ditemukan untuk musim yang diminta.",
        };
      } else {
        error = {
          code: "UNKNOWN",
          status,
          message: `Gagal memuat data Formula 1 dari server (Status HTTP ${status}).`,
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
          "Gagal menghubungi server Jolpica-F1. Periksa koneksi internet Anda atau coba lagi nanti.",
      },
    };
  }
}

/**
 * Mengambil klasemen pembalap Formula 1 untuk musim berjalan.
 * Cache di-revalidate setiap 1 jam (3600 detik).
 */
export async function getDriverStandings(): Promise<
  F1ApiResult<{
    season: string;
    round?: string;
    standings: F1DriverStanding[];
  }>
> {
  const result = await fetchFromJolpicaApi<
    MRDataResponse<DriverStandingsTable>
  >("/current/driverStandings.json", {
    revalidate: CACHE_REVALIDATE.STANDINGS,
  });

  if (!result.success) {
    return result;
  }

  const list =
    result.data.MRData.StandingsTable?.StandingsLists?.[0];
  const standings = list?.DriverStandings || [];

  if (standings.length === 0) {
    return {
      success: false,
      error: {
        code: "EMPTY_DATA",
        message: "Data klasemen pembalap belum tersedia untuk musim ini.",
      },
    };
  }

  return {
    success: true,
    data: {
      season: list?.season || result.data.MRData.StandingsTable?.season || "",
      round: list?.round,
      standings,
    },
  };
}

/**
 * Mengambil klasemen tim konstruktor Formula 1 untuk musim berjalan.
 * Cache di-revalidate setiap 1 jam (3600 detik).
 */
export async function getConstructorStandings(): Promise<
  F1ApiResult<{
    season: string;
    round?: string;
    standings: F1ConstructorStanding[];
  }>
> {
  const result = await fetchFromJolpicaApi<
    MRDataResponse<ConstructorStandingsTable>
  >("/current/constructorStandings.json", {
    revalidate: CACHE_REVALIDATE.STANDINGS,
  });

  if (!result.success) {
    return result;
  }

  const list =
    result.data.MRData.StandingsTable?.StandingsLists?.[0];
  const standings = list?.ConstructorStandings || [];

  if (standings.length === 0) {
    return {
      success: false,
      error: {
        code: "EMPTY_DATA",
        message: "Data klasemen konstruktor belum tersedia untuk musim ini.",
      },
    };
  }

  return {
    success: true,
    data: {
      season: list?.season || result.data.MRData.StandingsTable?.season || "",
      round: list?.round,
      standings,
    },
  };
}

/**
 * Mengambil kalender balapan Formula 1 musim berjalan.
 * Cache di-revalidate setiap 6 jam (21600 detik).
 */
export async function getSchedule(): Promise<
  F1ApiResult<{
    season: string;
    races: F1Race[];
  }>
> {
  const result = await fetchFromJolpicaApi<
    MRDataResponse<ScheduleTable>
  >("/current.json", {
    revalidate: CACHE_REVALIDATE.SCHEDULE,
  });

  if (!result.success) {
    return result;
  }

  const races = result.data.MRData.RaceTable?.Races || [];

  if (races.length === 0) {
    return {
      success: false,
      error: {
        code: "EMPTY_DATA",
        message: "Kalender balapan Formula 1 belum tersedia untuk musim ini.",
      },
    };
  }

  return {
    success: true,
    data: {
      season: result.data.MRData.RaceTable?.season || "",
      races,
    },
  };
}

/**
 * Mengambil hasil balapan terakhir (last race results).
 * Cache di-revalidate setiap 1 jam (3600 detik).
 */
export async function getLastRaceResults(): Promise<
  F1ApiResult<{
    season: string;
    round: string;
    race: F1RaceWithResults;
  }>
> {
  const result = await fetchFromJolpicaApi<
    MRDataResponse<LastRaceResultsTable>
  >("/current/last/results.json", {
    revalidate: CACHE_REVALIDATE.LAST_RESULTS,
  });

  if (!result.success) {
    return result;
  }

  const race = result.data.MRData.RaceTable?.Races?.[0];

  if (!race || !race.Results || race.Results.length === 0) {
    return {
      success: false,
      error: {
        code: "EMPTY_DATA",
        message: "Data hasil balapan terakhir belum tersedia.",
      },
    };
  }

  return {
    success: true,
    data: {
      season: result.data.MRData.RaceTable?.season || race.season,
      round: result.data.MRData.RaceTable?.round || race.round,
      race,
    },
  };
}
