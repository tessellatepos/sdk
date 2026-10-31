/**
 * Payment/catalog provider identifiers. "square" talks to Square's APIs;
 * "local" is the in-house, cash-only provider backed entirely by Postgres,
 * used for demos and testing without an external processor.
 */
export type ProviderId = "square" | "local";
