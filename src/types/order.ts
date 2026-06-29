import type { Money } from "./money.js";
import type { CartItem } from "./cart.js";

export type TenderType =
    | "CARD"
    | "CASH"
    | "THIRD_PARTY_CARD"
    | "GIFT_CARD"
    | "NO_SALE"
    | "ACCOUNT"
    | "OTHER";

export type CardBrand =
    | "VISA"
    | "MASTERCARD"
    | "AMERICAN_EXPRESS"
    | "INTERAC"
    | "DISCOVER"
    | "JCB"
    | "CHINA_UNIONPAY"
    | "OTHER_BRAND";

export type CardEntryMethod =
    | "KEYED"
    | "SWIPED"
    | "EMV"
    | "CONTACTLESS"
    | "ON_FILE";

export type PaymentStatus = "AUTHORIZED" | "CAPTURED" | "VOIDED" | "FAILED";

export type OrderState = "OPEN" | "COMPLETED" | "CANCELED" | "DRAFT";

export type DiscountType =
    | "FIXED_AMOUNT"
    | "FIXED_PERCENTAGE"
    | "VARIABLE_AMOUNT"
    | "VARIABLE_PERCENTAGE";

export interface Discount {
    id: string;
    name?: string | null;
    discountType?: DiscountType;
    amountMoney?: {
        amount: bigint;
        currency: string;
    };
    percentage?: string | null;
    pinRequired?: boolean | null;
    labelColor?: string | null;
    modifyTaxBasis?: "MODIFY_TAX_BASIS" | "DO_NOT_MODIFY_TAX_BASIS";
    maximumAmountMoney?: {
        amount: bigint;
        currency: string;
    };
}

export interface Tender {
    id: string;
    locationId: string;
    transactionId: string;
    createdAt?: string;
    amountMoney?: Money;
    tipMoney?: Money;
    processingFeeMoney?: Money;
    customerId?: string | null;
    type: TenderType;
    cardDetails?: {
        status: PaymentStatus;
        card: {
            cardBrand: CardBrand;
            last4: string;
            expMonth: number;
            expYear: number;
        };
        entryMethod: CardEntryMethod;
    };
    cashDetails?: {
        buyerTenderedMoney?: Money;
        changeBackMoney?: Money;
    };
    accountDetails?: {
        status: PaymentStatus;
    };
    paymentId?: string | null;
}

export interface Order {
    id?: string;
    locationId: string;
    referenceId?: string | null;
    source?: {
        name?: string | null;
    };
    customerId?: string | null;
    lineItems?: CartItem[] | null;
    taxes?: null;
    discounts: Discount[];
    netAmount?: {
        totalMoney?: Money;
        taxMoney?: Money;
        discountMoney?: Money;
        tipMoney?: Money;
        serviceChargeMoney?: Money;
    };
    roundingAdjustment?: Money;
    tenders?: Tender[];
    createdAt?: string;
    updatedAt?: string;
    closedAt?: string;
    state?: OrderState;
    version?: number;
    totalMoney?: Money;
    totalTaxMoney?: Money;
    totalDiscountMoney?: Money;
    totalTipMoney?: Money;
    totalServiceChargeMoney?: Money;
}
