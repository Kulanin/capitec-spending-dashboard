export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date;

export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export function buildQueryString(params: QueryParams | null | undefined): string {
  if (!params) return '';

  const search = new URLSearchParams();

  for (const [key, rawValue] of Object.entries(params)) {
    if (rawValue === undefined || rawValue === null || rawValue === '') continue;

    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    for (const value of values) {
      if (value === undefined || value === null || value === '') continue;
      search.append(key, serialize(value));
    }
  }

  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

function serialize(value: string | number | boolean | Date): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}