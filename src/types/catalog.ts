import type { CurrencyCode } from "./currencies.js";
import type { Money } from "./money.js";

export interface ItemSummary {
    id: string;
    name?: string | null;
}

export interface ItemVariationLocationOverrides {
    locationId?: string | null;
    priceMoney?: Money;
    pricingType?: "FIXED" | "VARIABLE";
    trackInventory?: boolean | null;
}

export interface ItemVariation {
    id?: string | null;
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

/**
 * Money as it travels in a catalog write: minor units (cents) as a JSON
 * number or a digit string, since a bigint cannot cross JSON.
 */
export interface MoneyInput {
    amount: number | string;
    currency: CurrencyCode;
}

export interface ItemVariationLocationOverrideInput {
    locationId: string;
    priceMoney?: MoneyInput | null;
    pricingType?: "FIXED" | "VARIABLE";
    trackInventory?: boolean | null;
}

/** A variation in a catalog item write. An `id` of an existing variation updates it. */
export interface ItemVariationInput {
    id?: string;
    name: string;
    sku?: string | null;
    upc?: string | null;
    pricingType?: "FIXED" | "VARIABLE";
    priceMoney?: MoneyInput | null;
    trackInventory?: boolean | null;
    locationOverrides?: ItemVariationLocationOverrideInput[];
}

/** The body of a catalog item create (POST), replace (PUT) or merge (PATCH). */
export interface ItemInput {
    name: string;
    displayName?: string | null;
    labelColor?: string | null;
    isTaxable?: boolean;
    isArchived?: boolean;
    image?: string | null;
    categoryIds?: string[];
    /** Storefronts that sell the item. */
    locationIds?: string[];
    /** Order is the display order. */
    variations: ItemVariationInput[];
}

export interface ItemCategoryInput {
    name: string;
    parentCategoryId?: string | null;
    imageURL?: string | null;
}

export interface ItemQuery {
    q?: string;
    categoryId?: string;
    locationId?: string;
    archived?: "true" | "false" | "all";
    limit?: number;
    offset?: number;
}

export interface ItemPage {
    items: Item[];
    total: number;
    limit: number;
    offset: number;
    /** False when the active provider owns the catalog (it is read-only here). */
    canManage: boolean;
}

/** One problem found while validating a write. Never carries the offending value. */
export interface CatalogFieldError {
    path: string;
    message: string;
}

export interface CatalogImportRowResult {
    /** 1-based line of the row in the CSV, counting the header as line 1. */
    line: number;
    status: "create" | "update" | "error";
    errors: CatalogFieldError[];
}

export interface CatalogImportReport {
    dryRun: boolean;
    /** True when the rows were written (never for a dry run or with errors). */
    applied: boolean;
    rows: CatalogImportRowResult[];
    summary: {
        rows: number;
        errors: number;
        itemsCreated: number;
        itemsUpdated: number;
        variationsCreated: number;
        variationsUpdated: number;
        categoriesCreated: number;
    };
}

/** The CSV columns for catalog import and export, in order. */
export const CATALOG_CSV_COLUMNS = [
    "item name",
    "variation name",
    "sku",
    "upc",
    "price",
    "currency",
    "category",
    "locations",
    "taxable",
    "archived",
] as const;

export type CatalogCsvColumn = (typeof CATALOG_CSV_COLUMNS)[number];
