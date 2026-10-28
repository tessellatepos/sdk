# Tessellate POS SDK Data

Reference data for addresses, countries and currencies.
`src/types/countries.ts` and `src/types/currencies.ts` are generated from the
sources below by `pnpm run build:data` (offline); don't edit them by hand.

| Source file               | What                                                                                                                               | Origin                                                                                                                                                                                            | Updated           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `address-formats.json`    | Per-country address format, required fields, postal code patterns, field label types, subdivision (state/province/county...) lists | [Google libaddressinput](https://github.com/google/libaddressinput/wiki/AddressValidationMetadata), `https://chromium-i18n.appspot.com/ssl-address/data/{CC}`. Refresh with `pnpm run fetch:data` | October 3rd, 2026 |
| `currency.xml`            | ISO 4217 currency codes and names                                                                                                  | [SIX ISO 4217 list one](https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml)                                                                | October 3rd, 2026 |
| `country-currencies.json` | Default currency per country                                                                                                       | Hand-maintained (derived from `currency.xml`; PS → ILS, GS → GBP and XK → EUR are de facto, not ISO)                                                                                              | October 3rd, 2026 |
| —                         | English country names                                                                                                              | CLDR, via Node's `Intl.DisplayNames` at build time                                                                                                                                                | —                 |

Generated:

- `src/types/countries.ts` — `COUNTRIES` (one entry per country: name,
  currency, address format/fields/required, postal code pattern, label types,
  subdivisions), the label tables (`POSTAL_CODE_LABELS`, `SUBDIVISION_LABELS`,
  ...), `CountryCode`.
- `src/types/currencies.ts` — `CURRENCIES` (code → name), `CURRENCY_COUNTRIES`
  (currency → countries), `CurrencyCode`.
