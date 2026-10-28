import { CurrencyCode } from "./currencies.js";

export interface Money {
    amount: bigint;
    currency: CurrencyCode;
}
