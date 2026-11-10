export interface SupportedCompetition {
  code: string;
  name: string;
  country: string;
  isCup?: boolean;
}

export const SUPPORTED_COMPETITIONS: SupportedCompetition[] = [
  { code: "PL", name: "Premier League", country: "Inggris" },
  { code: "PD", name: "La Liga", country: "Spanyol" },
  { code: "SA", name: "Serie A", country: "Italia" },
  { code: "BL1", name: "Bundesliga", country: "Jerman" },
  { code: "FL1", name: "Ligue 1", country: "Prancis" },
  { code: "DED", name: "Eredivisie", country: "Belanda" },
  { code: "PPL", name: "Primeira Liga", country: "Portugal" },
  { code: "ELC", name: "Championship", country: "Inggris" },
  { code: "CL", name: "Liga Champions UEFA", country: "Eropa", isCup: true },
  { code: "BSA", name: "Serie A Brasil", country: "Brasil" },
];

export const DEFAULT_COMPETITION = "PL";

export function getCompetitionByCode(code: string): SupportedCompetition | undefined {
  const normalized = code.toUpperCase();
  return SUPPORTED_COMPETITIONS.find((c) => c.code === normalized);
}

export function isValidCompetitionCode(code: string): boolean {
  return SUPPORTED_COMPETITIONS.some((c) => c.code === code.toUpperCase());
}
