import type { CountryCode } from "./countries.js";

/**
 * A postal address, usable for shipping, billing and business locations.
 * Which fields apply, which are required, and how they're labelled depend on
 * the country; see COUNTRIES[country] (fields, required, *Type, subdivisions).
 * Field names match AddressField, except addressLines -> addressLine1/2.
 */
export interface Address {
    country: CountryCode;
    /** Recipient, cardholder or contact name. */
    name?: string;
    organization?: string;
    addressLine1: string;
    addressLine2?: string;
    /** Suburb, neighbourhood, district... (COUNTRIES[c].dependentLocalityType). */
    dependentLocality?: string;
    /** City, town, post town... (COUNTRIES[c].localityType). */
    locality?: string;
    /** State, province, county... A key of COUNTRIES[c].subdivisions when that list exists. */
    subdivision?: string;
    postalCode?: string;
    sortingCode?: string;
}
