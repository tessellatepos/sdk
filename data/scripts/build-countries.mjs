// Sources (see ../README.md):
// - address rules and subdivision lists: Google libaddressinput
//   (address-formats.json), described at
//   https://github.com/google/libaddressinput/wiki/AddressValidationMetadata
// - country names: CLDR via Intl.DisplayNames
// - default currency: country-currencies.json (hand-maintained)
import { fileURLToPath } from "node:url";
import { json, readJson, sortKeys, writeGenerated } from "./_util.mjs";

const { ZZ: defaults, ...google } = readJson("address-formats.json");
const currencies = readJson("country-currencies.json");

// Antarctica: no postal addresses and no currency.
const EXCLUDED = new Set(["AQ"]);

// libaddressinput format/require tokens -> Address field names.
const FIELDS = {
    N: "name",
    O: "organization",
    A: "address_lines",
    D: "dependent_locality",
    C: "locality",
    S: "subdivision",
    Z: "postal_code",
    X: "sorting_code",
};
// Unknown tokens (e.g. %R, the country) aren't address inputs.
const toFields = (letters = "") =>
    [...letters].map((l) => FIELDS[l]).filter(Boolean);

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const isLatin = (s) => /^[\p{Script=Latin}\p{N}\p{P}\p{Zs}]+$/u.test(s);
const split = (s) => (s ? s.split("~") : []);

// key (the value written on the address) -> English-friendly display name.
// Prefer the latinised name, then the default-language name if it's Latin
// script, then the key itself (e.g. "Co. Carlow", "Kowloon").
function subdivisionsOf(d) {
    const names = split(d.sub_names);
    const lnames = split(d.sub_lnames);
    return Object.fromEntries(
        split(d.sub_keys).map((key, i) => [
            key,
            lnames[i] || (names[i] && isLatin(names[i]) ? names[i] : key),
        ]),
    );
}

const countries = {};
for (const [code, raw] of Object.entries(google)) {
    if (EXCLUDED.has(code)) continue;
    const d = { ...defaults, ...raw };
    if (!currencies[code]) throw new Error(`no currency for ${code}`);
    const fields = toFields(
        d.fmt
            .match(/%[A-Z]/g)
            ?.join("")
            .replace(/%/g, ""),
    );
    const required = toFields(d.require);
    const missing = required.filter((f) => !fields.includes(f));
    if (missing.length)
        throw new Error(`${code}: required ${missing} not in format`);
    const has = (f) => fields.includes(f);
    countries[code] = {
        name: regionNames.of(code),
        currency: currencies[code],
        format: d.fmt,
        fields,
        required,
        uppercase: toFields(d.upper),
        postalCodePattern:
            has("postal_code") && d.zip ? `^(?:${d.zip})$` : null,
        postalCodeType: has("postal_code") ? d.zip_name_type : null,
        subdivisionType: has("subdivision") ? d.state_name_type : null,
        subdivisions:
            has("subdivision") && d.sub_keys ? subdivisionsOf(d) : null,
        localityType: has("locality") ? d.locality_name_type : null,
        dependentLocalityType: has("dependent_locality")
            ? d.sublocality_name_type
            : null,
    };
}

// "post_town" -> "Post town"; a few read better by hand.
const LABEL_OVERRIDES = {
    postal: "Postal code",
    zip: "ZIP code",
    pin: "PIN code",
    eircode: "Eircode",
    do_si: "Do/si",
    village_township: "Village/township",
};
function labels(key) {
    const types = new Set(
        Object.values(countries)
            .map((c) => c[key])
            .filter(Boolean),
    );
    return json(
        Object.fromEntries(
            [...types]
                .sort()
                .map((t) => [
                    t,
                    LABEL_OVERRIDES[t] ??
                        t[0].toUpperCase() + t.slice(1).replace(/_/g, " "),
                ]),
        ),
    );
}

const out = `import type { CurrencyCode } from "./currencies.js";

/** Google zip_name_type -> label. */
export const POSTAL_CODE_LABELS = ${labels("postalCodeType")} as const;

/** Google state_name_type -> label. */
export const SUBDIVISION_LABELS = ${labels("subdivisionType")} as const;

/** Google locality_name_type -> label. */
export const LOCALITY_LABELS = ${labels("localityType")} as const;

/** Google sublocality_name_type -> label. */
export const DEPENDENT_LOCALITY_LABELS = ${labels("dependentLocalityType")} as const;

export type PostalCodeType = keyof typeof POSTAL_CODE_LABELS;
export type SubdivisionType = keyof typeof SUBDIVISION_LABELS;
export type LocalityType = keyof typeof LOCALITY_LABELS;
export type DependentLocalityType = keyof typeof DEPENDENT_LOCALITY_LABELS;

/** Address inputs, as named in Country.fields/required/uppercase. */
export type AddressField = ${Object.values(FIELDS)
    .map((f) => JSON.stringify(f))
    .join(" | ")};

/** The *Type fields are null when the country's format doesn't use that field. */
export type Country = {
    name: string;
    /** Default currency. */
    currency: CurrencyCode;
    /** Google format string, e.g. "%N%n%O%n%A%n%C, %S %Z". */
    format: string;
    /** Fields in the format, in display order. */
    fields: readonly AddressField[];
    required: readonly AddressField[];
    uppercase: readonly AddressField[];
    /** Anchored; match against the trimmed, uppercased value. */
    postalCodePattern: string | null;
    postalCodeType: PostalCodeType | null;
    subdivisionType: SubdivisionType | null;
    /** Value written on the address -> display name. Null means free text. */
    subdivisions: Readonly<Record<string, string>> | null;
    localityType: LocalityType | null;
    dependentLocalityType: DependentLocalityType | null;
};

export const COUNTRIES = ${json(sortKeys(countries))} as const satisfies Record<string, Country>;

export type CountryCode = keyof typeof COUNTRIES;

/** Valid subdivision values for a country (never for free-text countries). */
export type SubdivisionCodeOf<C extends CountryCode> = keyof NonNullable<
    (typeof COUNTRIES)[C]["subdivisions"]
>;
`;
writeGenerated(fileURLToPath(import.meta.url), "countries.ts", out);
