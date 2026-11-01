// Generic POS types
export type {
    Money,
    ItemSummary,
    ItemVariation,
    ItemVariationLocationOverrides,
    ItemCategory,
    Item,
    ItemCatalog,
    MoneyInput,
    ItemVariationLocationOverrideInput,
    ItemVariationInput,
    ItemInput,
    ItemCategoryInput,
    ItemQuery,
    ItemPage,
    CatalogFieldError,
    CatalogImportRowResult,
    CatalogImportReport,
    CatalogCsvColumn,
    CartItem,
    TenderType,
    CardBrand,
    CardEntryMethod,
    PaymentStatus,
    OrderState,
    DiscountType,
    Discount,
    Tender,
    Order,
    CheckoutMethod,
    CheckoutDetails,
    DeviceType,
    IConfigDevice,
    ProviderId,
    Address,
    Location,
    LocationHours,
    TimePeriod,
    Time,
    ScopeResource,
    ScopeAction,
    CoreScope,
    PluginScope,
    Scope,
    Role,
    PrincipalKind,
    Principal,
    ApiError,
    Customer,
    CustomerInput,
    CustomerQuery,
    CustomerPage,
    ApiCredential,
    ApiCredentialInput,
    ApiCredentialSecret,
} from "./types/index.js";

// Reference data (generated, see data/README.md)
export {
    COUNTRIES,
    POSTAL_CODE_LABELS,
    SUBDIVISION_LABELS,
    LOCALITY_LABELS,
    DEPENDENT_LOCALITY_LABELS,
} from "./types/countries.js";
export type {
    Country,
    CountryCode,
    AddressField,
    SubdivisionCodeOf,
    PostalCodeType,
    SubdivisionType,
    LocalityType,
    DependentLocalityType,
} from "./types/countries.js";
export { CURRENCIES, CURRENCY_COUNTRIES } from "./types/currencies.js";
export type { CurrencyCode } from "./types/currencies.js";

export { CATALOG_CSV_COLUMNS } from "./types/index.js";
export { CORE_SCOPES } from "./types/principal.js";

// Core
export { Cart } from "./core/cart.js";

// Utilities
export {
    bigintReplacer,
    stripBigints,
    parseMoney,
} from "./util/bigintReplacer.js";
export { validateAddress, type AddressError } from "./util/address.js";
export {
    toBigIntAmount,
    convertCentsToDollars,
    convertDollarsToCents,
} from "./util/money.js";
