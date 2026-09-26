import type { CartItem } from "../types/cart.js";

export class Cart {
    protected items: CartItem[];
    protected total: bigint;

    constructor() {
        this.items = [];
        this.total = 0n;
    }

    private getItemKey(item: CartItem): string {
        return item.id ?? item.itemId ?? "";
    }

    public clearCart() {
        this.items = [];
        this.total = 0n;
    }

    public getItems() {
        return this.items.map((item) => ({
            ...item,
            priceMoney: item.priceMoney ? { ...item.priceMoney } : undefined,
            parent: item.parent ? { ...item.parent } : undefined,
            locationOverrides: item.locationOverrides
                ? item.locationOverrides.map((o) => ({
                      ...o,
                      priceMoney: o.priceMoney
                          ? { ...o.priceMoney }
                          : undefined,
                  }))
                : undefined,
        })) as CartItem[];
    }

    public getTotal() {
        return this.total;
    }

    public addQuantity(item: CartItem) {
        const key = this.getItemKey(item);
        const existingItem = this.items.find(
            (cartItem) => this.getItemKey(cartItem) === key,
        );

        if (!existingItem) {
            this.items.push({ ...item, quantity: 1n });
        } else {
            this.items = this.items.map((cartItem) =>
                this.getItemKey(cartItem) === key
                    ? { ...cartItem, quantity: (cartItem.quantity ?? 0n) + 1n }
                    : cartItem,
            );
        }

        // Use the stored item's price to keep the running total consistent
        const priceItem = existingItem ?? item;
        if (priceItem.priceMoney !== undefined) {
            this.total += BigInt(priceItem.priceMoney.amount);
        }
    }

    public removeQuantity(item: CartItem) {
        const key = this.getItemKey(item);
        const existingItem = this.items.find(
            (cartItem) => this.getItemKey(cartItem) === key,
        );

        if (existingItem) {
            if ((existingItem.quantity ?? 0n) <= 1n) {
                this.removeItem(item);
            } else {
                this.items = this.items.map((cartItem) =>
                    this.getItemKey(cartItem) === key
                        ? {
                              ...cartItem,
                              quantity: (cartItem.quantity ?? 0n) - 1n,
                          }
                        : cartItem,
                );
                // Use the stored item's price for consistency
                if (existingItem.priceMoney !== undefined) {
                    this.total -= BigInt(existingItem.priceMoney.amount);
                }
            }
        }
    }

    public removeItem(item: CartItem) {
        const key = this.getItemKey(item);
        this.items = this.items.filter(
            (cartItem) => this.getItemKey(cartItem) !== key,
        );
        this.recalculateCart();
    }

    private recalculateCart() {
        let newTotal: bigint = 0n;
        if (this.items.length === 0) {
            this.total = 0n;
        } else {
            for (const item of this.items) {
                if (
                    item.quantity !== undefined &&
                    item.priceMoney !== undefined
                ) {
                    newTotal +=
                        BigInt(item.priceMoney.amount) * BigInt(item.quantity);
                }
            }
            this.total = BigInt(newTotal);
        }
    }
}
