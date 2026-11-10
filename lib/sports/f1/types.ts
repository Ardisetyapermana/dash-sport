export interface F1Driver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url?: string;
  givenName: string;
  familyName: string;
  dateOfBirth?: string;
  nationality: string;
}

export interface F1Constructor {
  constructorId: string;
  url?: string;
  name: string;
  nationality: string;
}

export interface F1DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: F1Driver;
  Constructors: F1Constructor[];
}

export interface F1ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: F1Constructor;
}

export interface F1CircuitLocation {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface F1Circuit {
  circuitId: string;
  url?: string;
  circuitName: string;
  Location: F1CircuitLocation;
}

export interface F1Session {
  date: string;
  time?: string;
}

export interface F1Race {
  season: string;
  round: string;
  url?: string;
  raceName: string;
  Circuit: F1Circuit;
  date: string;
  time?: string;
  FirstPractice?: F1Session;
  SecondPractice?: F1Session;
  ThirdPractice?: F1Session;
  Qualifying?: F1Session;
  Sprint?: F1Session;
  SprintQualifying?: F1Session;
}

export interface F1RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: F1Driver;
  Constructor: F1Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: {
    millis?: string;
    time?: string;
  };
  FastestLap?: {
    rank?: string;
    lap?: string;
    Time?: {
      time?: string;
    };
  };
}

export interface F1RaceWithResults extends F1Race {
  Results: F1RaceResult[];
}

// Jolpica MRData wrapper interfaces
export interface MRDataResponse<TTable> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
  } & TTable;
}

export interface DriverStandingsTable {
  StandingsTable: {
    season: string;
    round?: string;
    StandingsLists: Array<{
      season: string;
      round: string;
      DriverStandings: F1DriverStanding[];
    }>;
  };
}

export interface ConstructorStandingsTable {
  StandingsTable: {
    season: string;
    round?: string;
    StandingsLists: Array<{
      season: string;
      round: string;
      ConstructorStandings: F1ConstructorStanding[];
    }>;
  };
}

export interface ScheduleTable {
  RaceTable: {
    season: string;
    Races: F1Race[];
  };
}

export interface LastRaceResultsTable {
  RaceTable: {
    season: string;
    round: string;
    Races: F1RaceWithResults[];
  };
}

export type F1ErrorCode =
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "EMPTY_DATA"
  | "NETWORK_ERROR"
  | "UNKNOWN";

export interface F1ApiError {
  code: F1ErrorCode;
  message: string;
  status?: number;
}

export type F1ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: F1ApiError };
