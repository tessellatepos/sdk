import type { Money } from "./money.js";

export interface ItemSummary {
    id: string;
    name?: string | null;
}

export interface ItemVariationLocationOverrides {
    locationId?: string | null;
    priceMoney?: {
        amount: bigint;
        currency: string;
    };
    pricingType?: "FIXED" | "VARIABLE";
    trackInventory?: boolean | null;
}

export interface ItemVariation {
    itemId?: string | null;
    name?: string | null;
    sku?: string | null;
    upc?: string | null;
    ordinal?: string | null;
    pricingType?: "FIXED" | "VARIABLE";
    priceMoney?: Money;
    locationOverrides?: ItemVariationLocationOverrides[] | null;
    trackInventory?: boolean | null;
    parent?: ItemSummary | null;
}

export interface ItemCategory {
    id?: string;
    name?: string | null;
    parentCategory?: ItemCategory | null;
    imageId?: string | null;
    imageURL?: string | null;
}

export interface Item {
    id: string;
    name?: string | null | undefined;
    displayName?: string | null;
    labelColor?: string | null;
    isTaxable?: boolean | null;
    variations: ItemVariation[] | null;
    categories?: ItemCategory[];
    isArchived?: boolean | null;
    locationIds?: string[] | null;
    image?: string | null;
}

export interface ItemCatalog {
    items: Item[];
}
