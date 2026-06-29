export const bigintReplacer = (_, v) => typeof v === "bigint" ? v.toString() : v;
