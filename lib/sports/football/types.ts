export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string | null;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string | null;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number | null;
  winner?: Team | null;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface StandingRow {
  position: number;
  team: Team;
  playedGames: number;
  form?: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface StandingGroup {
  stage: string;
  type: string;
  group: string | null;
  table: StandingRow[];
}

export interface StandingsResponse {
  filters: Record<string, unknown>;
  area: Area;
  competition: Competition;
  season: Season;
  standings: StandingGroup[];
}

export interface ScoreTime {
  home: number | null;
  away: number | null;
}

export interface MatchScore {
  winner: string | null;
  duration: string;
  fullTime: ScoreTime;
  halfTime?: ScoreTime;
}

export interface Match {
  id: number;
  utcDate: string;
  status:
    | "SCHEDULED"
    | "TIMED"
    | "CALLED_OFF"
    | "IN_PLAY"
    | "PAUSED"
    | "EXTRA_TIME"
    | "PENALTY_SHOOTOUT"
    | "FINISHED"
    | "SUSPENDED"
    | "POSTPONED"
    | "CANCELLED"
    | "AWARDED";
  matchday: number | null;
  stage: string;
  group: string | null;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: MatchScore;
}

export interface MatchesResponse {
  filters: Record<string, unknown>;
  competition: Competition;
  season: Season;
  matches: Match[];
}

export interface Player {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationality?: string;
  section?: string;
  position?: string | null;
  shirtNumber?: number | null;
}

export interface Scorer {
  player: Player;
  team: Team;
  playedMatches: number;
  goals: number;
  assists: number | null;
  penalties: number | null;
}

export interface TopScorersResponse {
  count: number;
  filters: Record<string, unknown>;
  competition: Competition;
  season: Season;
  scorers: Scorer[];
}

export type FootballErrorCode =
  | "MISSING_KEY"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "EMPTY_DATA"
  | "NETWORK_ERROR"
  | "UNKNOWN";

export interface FootballApiError {
  code: FootballErrorCode;
  message: string;
  status?: number;
}

export type FootballApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: FootballApiError };
