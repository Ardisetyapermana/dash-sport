export interface TeamRef {
  team_id: string;
  name: string;
  abbreviation: string;
}

export interface StandingRow {
  league: string;
  sport: string;
  season: number;
  season_label: string;
  team: TeamRef;
  conference: "Eastern" | "Western" | string;
  division: string;
  games_played: number;
  wins: number;
  losses: number;
  win_pct: number;
  games_behind: number;
  points_for: number;
  points_against: number;
  point_differential: number;
  streak: string;
  home_record: string;
  away_record: string;
  division_record: string;
  conference_record: string;
  last_10: string;
  league_rank: number;
  conference_rank: number;
  division_rank: number;
  final: boolean;
}

export interface PeriodScores {
  home: number[];
  away: number[];
}

export interface GameVenue {
  name: string;
  city: string;
  state: string;
  country: string;
}

export interface Game {
  game_id: string;
  league: string;
  sport: string;
  season: number;
  season_label: string;
  season_type: string;
  date: string;
  start_time: string;
  status: "scheduled" | "final" | "in_play" | "postponed" | "cancelled" | string;
  status_detail: string | null;
  period: number | null;
  clock: string | null;
  home_team: TeamRef;
  away_team: TeamRef;
  home_score: number | null;
  away_score: number | null;
  period_scores: PeriodScores | null;
  decided_in: string | null;
  winner: string | null;
  venue: GameVenue | null;
  neutral_site: boolean;
  original_date: string | null;
  updated_at: string;
}

export type BasketballErrorCode =
  | "MISSING_KEY"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "EMPTY_DATA"
  | "NETWORK_ERROR"
  | "UNKNOWN";

export interface BasketballApiError {
  code: BasketballErrorCode;
  message: string;
  status?: number;
}

export type BasketballApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: BasketballApiError };
