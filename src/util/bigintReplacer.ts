import type { Money } from "../types/money.js";

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

/**
 * Reverses stripBigints for a single Money value: bigint amounts come back
 * out of JSON/jsonb as strings, so this converts them back to bigint. The
 * opposite of stripBigints, scoped to the Money shape.
 * @param raw the value read back from a Money-shaped JSON/jsonb column
 * @returns the parsed Money, or undefined if raw wasn't a Money-shaped value
 */
export function parseMoney(raw: unknown): Money | undefined {
    if (!raw || typeof raw !== "object") return undefined;
    const { amount, currency } = raw as {
        amount?: string | number;
        currency?: string;
    };
    if (amount === undefined || currency === undefined) return undefined;
    return { amount: BigInt(amount), currency };
}
