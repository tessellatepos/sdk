/**
 * How a plugin's members join. "open": a first successful login creates an
 * active member. "approval": it creates a pending member that cannot sign in
 * until staff with `members:write` approve it.
 */
export type MemberSignupPolicy = "open" | "approval";

/** "pending" members await approval; "disabled" members cannot sign in. */
export type MemberStatus = "active" | "pending" | "disabled";

/**
 * Someone who signs in through a plugin's member login rather than as staff.
 * Members are not host users: they hold no roles and no core scopes. Optional
 * text fields are "" when unset, matching Customer.
 */
export interface Member {
    id: string;
    /** The plugin whose login created the member. */
    plugin: string;
    /** The plugin's member login provider id. */
    provider: string;
    /** The member's stable id at the provider (e.g. a Discord user id). */
    external_id: string;
    display_name: string;
    email: string;
    status: MemberStatus;
    /** The linked customer, when staff have linked one. */
    customer_id: string | null;
    /** ISO 8601 */
    created_at: string;
    /** ISO 8601 */
    updated_at: string;
    /** ISO 8601; null until the first sign-in completes. */
    last_login_at: string | null;
}

export interface MemberQuery {
    /** Matches display name and email. */
    text?: string;
    plugin?: string;
    status?: MemberStatus;
    limit?: number;
    cursor?: string;
}

export interface MemberPage {
    members: Member[];
    next_cursor: string | null;
}

/** What staff may change on a member. */
export interface MemberPatch {
    display_name?: string;
    status?: MemberStatus;
    /** Link to a customer, or null to unlink. */
    customer_id?: string | null;
}
