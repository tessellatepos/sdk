import type { Money } from "./money.js";

/** What a processor can do for a location. */
export interface PaymentProcessorCapabilities {
    checkout: boolean;
    invoice: boolean;
}

/** A processor as the owner sees it. Secrets are never part of this. */
export interface PaymentProcessorInfo {
    id: string;
    label: string;
    capabilities: PaymentProcessorCapabilities;
}

export type CheckoutStatus = "created" | "paid" | "expired" | "failed";

export type InvoiceStatus =
    "draft" | "sent" | "viewed" | "paid" | "overdue" | "canceled" | "refunded";

export type OnlinePaymentKind = "checkout" | "invoice";

/** The status of one payment attempt; which values apply depends on its kind. */
export type OnlinePaymentStatus = CheckoutStatus | InvoiceStatus;

/**
 * The payment state of an order, derived from its attempts. Not the same as
 * PaymentStatus, which is the status of a card tender.
 */
export type OrderPaymentStatus =
    "unpaid" | "processing" | "paid" | "failed" | "refunded";

/** One attempt to collect payment for an order (a checkout or an invoice). */
export interface OnlinePayment {
    id: string;
    order_reference: string;
    processor_id: string;
    kind: OnlinePaymentKind;
    external_id: string;
    url?: string;
    status: OnlinePaymentStatus;
    amount: Money;
    /** ISO 8601 date, invoices only. */
    due_date?: string;
    /** ISO 8601 */
    created_at: string;
    /** ISO 8601 */
    updated_at: string;
}

/** A signed webhook turned into something the host acts on. */
export type ProcessorEvent =
    | {
          /** Unique per processor; the host drops repeats. */
          id: string;
          type: "payment.updated";
          kind: OnlinePaymentKind;
          external_id: string;
          status: OnlinePaymentStatus;
          /** The processor's payment id, once money has moved. */
          payment_id?: string;
          amount?: Money;
      }
    | { id: string; type: "ignored" };
