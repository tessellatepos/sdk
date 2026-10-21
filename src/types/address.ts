import type { CountryCode } from "./countries.js";

/**
 * A postal address, usable for shipping, billing and business locations.
 * Which fields apply, which are required, and how they're labelled depend on
 * the country; see COUNTRIES[country] (fields, required, *Type, subdivisions).
 * Field names match AddressField, except address_lines -> address_line_1/2.
 */
export interface Address {
    country: CountryCode;
    /** Recipient, cardholder or contact name. */
    name?: string;
    organization?: string;
    address_line_1: string;
    address_line_2?: string;
    /** Suburb, neighbourhood, district... (COUNTRIES[c].dependentLocalityType). */
    dependent_locality?: string;
    /** City, town, post town... (COUNTRIES[c].localityType). */
    locality?: string;
    /** State, province, county... A key of COUNTRIES[c].subdivisions when that list exists. */
    subdivision?: string;
    postal_code?: string;
    sorting_code?: string;
}
