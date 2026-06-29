export class Cart {
    constructor() {
        this.items = [];
        this.total = 0n;
    }
    clearCart() {
        this.items = [];
        this.total = 0n;
    }
    getItems() {
        return structuredClone(this.items);
    }
    getTotal() {
        return this.total;
    }
    addQuantity(item) {
        // console.log("add quantity");
        const existingItem = this.items.find((cartItem) => cartItem.itemId === item.itemId);
        if (!existingItem) {
            this.items.push({ ...item, quantity: 1n });
        }
        else {
            this.items = this.items.map((cartItem) => cartItem.itemId === item.itemId
                ? { ...cartItem, quantity: (cartItem.quantity ?? 0n) + 1n }
                : cartItem);
        }
        if (item.priceMoney !== undefined) {
            this.total += BigInt(item.priceMoney.amount);
        }
    }
    removeQuantity(item) {
        // console.log("remove quantity");
        const existingItem = this.items.find((cartItem) => cartItem.itemId === item.itemId);
        if (existingItem) {
            if (existingItem.quantity != undefined &&
                existingItem.quantity <= 1n) {
                this.removeItem(item);
            }
            else {
                this.items = this.items.map((cartItem) => cartItem.itemId === item.itemId
                    ? {
                        ...cartItem,
                        quantity: (cartItem.quantity ?? 0n) - 1n,
                    }
                    : cartItem);
                if (item.priceMoney !== undefined) {
                    this.total -= BigInt(item.priceMoney.amount);
                }
            }
        }
    }
    //error caused somewhere in here and the recalculating cart that it can't convert a bigint into a numbers
    removeItem(item) {
        // console.log("remove item");
        this.items = this.items.filter((cartItem) => cartItem.itemId !== item.itemId);
        this.recalculateCart();
    }
    recalculateCart() {
        // console.log("recalculate total from: ", this.total);
        // console.log(this.items);
        let newTotal = 0n;
        if (this.items.length === 0) {
            this.total = 0n;
        }
        else {
            for (const item of this.items) {
                if (item.quantity !== undefined &&
                    item.priceMoney !== undefined) {
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
