import {
    COUNTRIES,
    type AddressField,
    type Country,
} from "../types/countries.js";
import type { Address } from "../types/address.js";

export type AddressError = {
    field: AddressField;
    reason: "required" | "invalid";
};

const valueOf = (address: Address, field: AddressField) =>
    (field === "address_lines"
        ? address.address_line_1
        : address[field]
    )?.trim() ?? "";

/** Checks required fields, the postal code pattern and the subdivision list. */
export function validateAddress(address: Address): AddressError[] {
    const country: Country = COUNTRIES[address.country];
    const errors: AddressError[] = country.required
        .filter((field) => !valueOf(address, field))
        .map((field) => ({ field, reason: "required" }));

    const postalCode = valueOf(address, "postal_code").toUpperCase();
    if (
        postalCode &&
        country.postalCodePattern &&
        !new RegExp(country.postalCodePattern).test(postalCode)
    )
        errors.push({ field: "postal_code", reason: "invalid" });

    const subdivision = valueOf(address, "subdivision");
    if (
        subdivision &&
        country.subdivisions &&
        !Object.prototype.hasOwnProperty.call(country.subdivisions, subdivision)
    )
        errors.push({ field: "subdivision", reason: "invalid" });

    return errors;
}
