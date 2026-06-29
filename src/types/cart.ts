import type { ItemVariation, ItemSummary } from "./catalog.js";

export interface CartItem extends ItemVariation {
    imageURL?: string | null;
    quantity?: bigint;
    parent?: ItemSummary | null;
}
