export const bigintReplacer = (_: string, v: unknown) =>
    typeof v === "bigint" ? v.toString() : v;

/**
 * Recursively converts bigints (e.g. Money amounts, item quantities) into
 * strings, so the value can round-trip through JSON — over the wire, into
 * jsonb storage, etc. — without a "Do not know how to serialize a BigInt"
 * error.
 * @param value the value to strip bigints from
 * @returns a deep copy of value with every bigint replaced by its string form
 */
export function stripBigints<T>(value: T): T {
    if (value === undefined) {
        return null as T;
    }
    return JSON.parse(JSON.stringify(value, bigintReplacer));
}
