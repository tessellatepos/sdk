import type { Scope } from "./principal.js";

/**
 * A named client id / client secret that lets another application call the
 * gateway. The secret is shown once at creation and is never part of this
 * type; `id` is the client id.
 */
export interface ApiCredential {
    id: string;
    name: string;
    scopes: Scope[];
    /** Locations the credential may act on; at least one. */
    location_ids: string[];
    rate_limit_per_minute: number;
    /** ISO 8601, or null when it does not expire. */
    expires_at: string | null;
    /** Browser origins allowed to make read-only calls with the id alone. */
    origins: string[];
    webhook_url?: string;
    /** User id of the creator. */
    created_by: string;
    created_at: string;
    last_used_at: string | null;
}

export type ApiCredentialInput = Pick<
    ApiCredential,
    "name" | "scopes" | "location_ids"
> &
    Partial<
        Pick<
            ApiCredential,
            "rate_limit_per_minute" | "expires_at" | "origins" | "webhook_url"
        >
    >;

/** Returned once, when a credential is created or rotated. */
export interface ApiCredentialSecret {
    credential: ApiCredential;
    client_id: string;
    client_secret: string;
}
