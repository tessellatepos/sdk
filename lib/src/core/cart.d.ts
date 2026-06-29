import type { CartItem } from "../types/cart.js";
export declare class Cart {
    protected items: CartItem[];
    protected total: bigint;
    constructor();
    clearCart(): void;
    getItems(): CartItem[];
    getTotal(): bigint;
    addQuantity(item: CartItem): void;
    removeQuantity(item: CartItem): void;
    removeItem(item: CartItem): void;
    private recalculateCart;
}
//# sourceMappingURL=cart.d.ts.map