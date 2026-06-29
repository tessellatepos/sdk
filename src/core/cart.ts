import type { CartItem } from "../types/cart.js";

export class Cart {
    protected items: CartItem[];
    protected total: bigint;

    constructor() {
        this.items = [];
        this.total = 0n;
    }

    public clearCart() {
        this.items = [];
        this.total = 0n;
    }

    public getItems() {
        return structuredClone(this.items);
    }

    public getTotal() {
        return this.total;
    }

    public addQuantity(item: CartItem) {
        // console.log("add quantity");
        const existingItem = this.items.find(
            (cartItem) => cartItem.itemId === item.itemId,
        );

        if (!existingItem) {
            this.items.push({ ...item, quantity: 1n });
        } else {
            this.items = this.items.map((cartItem) =>
                cartItem.itemId === item.itemId
                    ? { ...cartItem, quantity: (cartItem.quantity ?? 0n) + 1n }
                    : cartItem,
            );
        }
        if (item.priceMoney !== undefined) {
            this.total += BigInt(item.priceMoney.amount);
        }
    }

    public removeQuantity(item: CartItem) {
        // console.log("remove quantity");
        const existingItem = this.items.find(
            (cartItem) => cartItem.itemId === item.itemId,
        );

        if (existingItem) {
            if (
                existingItem.quantity != undefined &&
                existingItem.quantity <= 1n
            ) {
                this.removeItem(item);
            } else {
                this.items = this.items.map((cartItem) =>
                    cartItem.itemId === item.itemId
                        ? {
                              ...cartItem,
                              quantity: (cartItem.quantity ?? 0n) - 1n,
                          }
                        : cartItem,
                );
                if (item.priceMoney !== undefined) {
                    this.total -= BigInt(item.priceMoney.amount);
                }
            }
        }
    }

    //error caused somewhere in here and the recalculating cart that it can't convert a bigint into a numbers
    public removeItem(item: CartItem) {
        // console.log("remove item");
        this.items = this.items.filter(
            (cartItem) => cartItem.itemId !== item.itemId,
        );
        this.recalculateCart();
    }

    private recalculateCart() {
        // console.log("recalculate total from: ", this.total);
        // console.log(this.items);
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

                // console.log("recalculate total between: ", this.total);
            }
            this.total = BigInt(newTotal);
            // console.log("recalculate total to: ", this.total);
        }
    }
}
