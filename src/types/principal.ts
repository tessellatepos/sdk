/** What a scope applies to. */
export type ScopeResource =
    | "catalog"
    | "orders"
    | "customers"
    | "locations"
    | "devices"
    | "users"
    | "credentials"
    | "dashboard"
    | "settings"
    | "payments"
    | "plugins";

export type ScopeAction = "read" | "write" | "admin";

/** A scope the host defines, e.g. "orders:write". "*" grants everything. */
export type CoreScope = `${ScopeResource}:${ScopeAction}` | "*";

/** A scope a plugin defines for its own gateway routes: "plugin:<name>:<verb>". */
export type PluginScope = `plugin:${string}:${string}`;

export type Scope = CoreScope | PluginScope;

/**
 * Core scopes a gateway credential may be granted. Limited to the data
 * resources the gateway exposes: admin and host-only scopes are never
 * grantable to a credential.
 */
export const CORE_SCOPES = [
    "catalog:read",
    "catalog:write",
    "orders:read",
    "orders:write",
    "customers:read",
    "customers:write",
    "locations:read",
] as const satisfies readonly CoreScope[];

/** Roles the host ships. Roles map to scopes; endpoints check scopes. */
export type Role = "owner" | "manager" | "cashier" | "viewer";

export type PrincipalKind = "user" | "device" | "credential" | "service";

/**
 * Who is making a request, resolved once by the auth layer.
 * `locationIds` limits where the principal may act ("all" for unrestricted).
 */
export interface Principal {
    kind: PrincipalKind;
    id: string;
    display_name?: string;
    /** Role names; the host's roles plus any a plugin contributed. */
    roles: string[];
    scopes: Scope[];
    location_ids: string[] | "all";
}

/** The error body every API endpoint returns. */
export interface ApiError {
    message: string;
    code?: string;
}
