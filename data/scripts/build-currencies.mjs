// Sources (see ../README.md):
// - currency codes and names: SIX ISO 4217 list one (currency.xml)
// - country -> currency: country-currencies.json (hand-maintained)
import { fileURLToPath } from "node:url";
import {
    json,
    readData,
    readJson,
    sortKeys,
    writeGenerated,
} from "./_util.mjs";

const xml = readData("currency.xml");
const tag = (block, name) =>
    block.match(new RegExp(`<${name}[^>]*>([^<]*)</${name}>`))?.[1].trim();

// code -> name; entries without a Ccy (e.g. Antarctica) are skipped.
const currencies = {};
for (const [, block] of xml.matchAll(/<CcyNtry>([\s\S]*?)<\/CcyNtry>/g)) {
    const code = tag(block, "Ccy");
    if (code) currencies[code] ??= tag(block, "CcyNm");
}

// Inverse of country-currencies.json.
const countriesByCurrency = {};
for (const [country, code] of Object.entries(
    readJson("country-currencies.json"),
)) {
    if (!currencies[code])
        throw new Error(`${country}: unknown currency ${code}`);
    (countriesByCurrency[code] ??= []).push(country);
}

const out = `import type { CountryCode } from "./countries.js";

/** ISO 4217 code -> name. */
export const CURRENCIES = ${json(sortKeys(currencies))} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

/**
 * Currency -> countries that default to it (the inverse of
 * COUNTRIES[code].currency). Currencies no country defaults to are absent.
 */
export const CURRENCY_COUNTRIES = ${json(sortKeys(countriesByCurrency))} as const satisfies Partial<Record<CurrencyCode, readonly CountryCode[]>>;
`;
writeGenerated(fileURLToPath(import.meta.url), "currencies.ts", out);
