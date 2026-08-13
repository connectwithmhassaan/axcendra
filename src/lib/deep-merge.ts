type Plain = Record<string, unknown>;

function isPlainObject(value: unknown): value is Plain {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Merge stored content over defaults so new default keys always appear,
 * while saved values win. Arrays are replaced wholesale (they are lists the
 * admin controls), but object items inside arrays are merged with the first
 * default item so new fields still get a value.
 */
export function deepMerge<T>(defaults: T, override: unknown): T {
  if (override === undefined || override === null) return defaults;

  if (Array.isArray(defaults)) {
    if (!Array.isArray(override)) return defaults;
    const template = defaults[0];
    return override.map((item) =>
      isPlainObject(template) ? deepMerge(template, item) : item,
    ) as unknown as T;
  }

  if (isPlainObject(defaults)) {
    if (!isPlainObject(override)) return defaults;
    const out: Plain = { ...defaults };
    for (const key of Object.keys(defaults)) {
      out[key] = deepMerge((defaults as Plain)[key], override[key]);
    }
    return out as T;
  }

  return (override as T) ?? defaults;
}
