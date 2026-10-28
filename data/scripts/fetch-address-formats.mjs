// Downloads Google's libaddressinput metadata for every country into
// ../address-formats.json. Run `node fetch-address-formats.mjs` to refresh;
// the build scripts only read the cached file.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { dataDir, sortKeys } from "./_util.mjs";

const BASE =
    "https://www.gstatic.com/chrome/autofill/libaddressinput/chromium-i18n/ssl-address/data";
// See https://github.com/google/libaddressinput/wiki/AddressValidationMetadata
const KEEP = [
    "fmt",
    "require",
    "upper",
    "zip",
    "zip_name_type",
    "state_name_type",
    "locality_name_type",
    "sublocality_name_type",
    // subdivision (state/province/county...) list
    "sub_keys",
    "sub_names",
    "sub_lnames",
    "sub_isoids",
];

const ORIGINAL = "https://chromium-i18n.appspot.com/ssl-address/data";

// gstatic is a snapshot that lacks a few countries (e.g. MY); fall back to the
// original host, which also serves the country list.
const get = async (key) => {
    const path = key ? `/${key}` : "";
    for (const base of key ? [BASE, ORIGINAL] : [ORIGINAL]) {
        const res = await fetch(base + path);
        if (res.ok) return res.json();
    }
    throw new Error(`${key || "(index)"}: not found`);
};

const index = await get("");
const countries = index.countries.split("~");

const out = { ZZ: pick(await get("ZZ")) };
function pick(d) {
    return Object.fromEntries(KEEP.filter((k) => k in d).map((k) => [k, d[k]]));
}
await Promise.all(
    countries.map(async (c) => {
        out[c] = pick(await get(c));
    }),
);

writeFileSync(
    join(dataDir, "address-formats.json"),
    JSON.stringify(sortKeys(out), null, 2) + "\n",
);
console.log(
    `wrote address-formats.json (${countries.length} countries + ZZ defaults)`,
);
