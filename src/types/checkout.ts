export type CheckoutMethod = "TERMINAL" | "READER" | "CASH";

export interface CheckoutDetails {
    method: CheckoutMethod;
}
