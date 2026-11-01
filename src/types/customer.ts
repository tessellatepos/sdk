import type { Address } from "./address.js";

/**
 * A customer of the store, provider-agnostic. Optional text fields are ""
 * when unset, matching Location.
 */
export interface Customer {
    id: string;
    given_name: string;
    family_name: string;
    company_name: string;
    email: string;
    phone_number: string;
    address?: Address;
    /** YYYY-MM-DD */
    birthday?: string;
    note: string;
    tags: string[];
    /** ISO 8601 */
    created_at: string;
    /** ISO 8601 */
    updated_at: string;
}

export type CustomerInput = Omit<Customer, "id" | "created_at" | "updated_at">;

export interface CustomerQuery {
    /** Matches names, email, phone and company. */
    text?: string;
    email?: string;
    phone_number?: string;
    tag?: string;
    limit?: number;
    cursor?: string;
}

export interface CustomerPage {
    customers: Customer[];
    next_cursor: string | null;
}
