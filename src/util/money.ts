type MoneyAmount = bigint | string | number | null | undefined;

/**
 * Money amounts round-trip through JSON as strings (bigints don't survive
 * JSON.stringify on their own — see stripBigints), so values typed as
 * `bigint` are often actually strings by the time they reach a consumer.
 * Coerce defensively.
 * @param amount the amount to coerce, in whatever form it arrived as
 * @returns the amount as a bigint, or 0n if amount is null/undefined
 */
export function toBigIntAmount(amount: MoneyAmount): bigint {
    if (typeof amount === "bigint") return amount;
    if (amount === undefined || amount === null) return 0n;
    return BigInt(amount);
}

/**
 * Formats a cents amount (as stored/transmitted) into a dollars-and-cents
 * string, e.g. 1050n -> "10.50".
 * @param cents the amount in cents, in whatever form it arrived as
 * @returns the formatted dollar amount, without a currency symbol
 */
export function convertCentsToDollars(cents: MoneyAmount): string {
    const amount = toBigIntAmount(cents);
    const negative = amount < 0n;
    const abs = negative ? -amount : amount;
    const s = abs.toString();
    const centsPart = s.slice(-2).padStart(2, "0");
    const dollarsPart = s.slice(0, -2) || "0";
    return `${negative ? "-" : ""}${dollarsPart}.${centsPart}`;
}
