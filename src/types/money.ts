export interface Money {
    amount?: bigint;
    currency: CurrencyCode;
}

export enum CurrencyCode {
    USD = "USD",
    EUR = "EUR",
    JPY = "JPY",
    GBP = "GBP",
    CAD = "CAD",
    AUD = "AUD",
    CNY = "CNY",
    ZND = "NZD"
}
