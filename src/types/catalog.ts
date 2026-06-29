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
    pricingType?: "FIXED_PRICING" | "VARIABLE_PRICING";
    trackInventory?: boolean | null;
}

export interface ItemVariation {
    itemId?: string | null;
    name?: string | null;
    sku?: string | null;
    upc?: string | null;
    ordinal?: string | null;
    pricingType?: "FIXED_PRICING" | "VARIABLE_PRICING";
    priceMoney?: Money;
    locationOverrides?: ItemVariationLocationOverrides[] | null;
    trackInventory?: boolean | null;
    parent?: ItemSummary | null;
}

export interface ItemCategory {
    id?: string;
    name?: string | null;
    parentCategory?: ItemCategory | null;
    presentAtAllLocations?: boolean | null;
    presentAtLocationsIds?: string[];
    imageId?: string | null;
    imageURL?: string | null;
}

export interface Item {
    id: string;
    name?: string | null | undefined;
    buyerFacingName?: string | null;
    labelColor?: string | null;
    isTaxable?: boolean | null;
    variations: ItemVariation[] | null;
    categories?: ItemCategory[];
    isArchived?: boolean | null;
    reportingCategoryIds?: ItemCategory[];
    presentAtAllLocations?: boolean | null;
    presentAtLocationsIds?: string[];
    imageIds?: string[] | null;
    imageURLs?: string[] | null;
}

export interface ItemCatalog {
    items: Item[];
}
