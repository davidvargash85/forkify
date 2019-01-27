import UniqId from 'uniqid';

export default class ShoppingList {
    
    constructor() {
        this.items = [];
    }

    addItem(qty, unit, name) {
        
        const newItem = {
            id: UniqId(),
            qty: qty,
            unit: unit, 
            name: name
        }; 

        this.items.push(newItem);

        return newItem;
    }

    removeItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        this.items.splice(index, 1);
    }

    updateQty(id, qty) {
        this.items.find(el => el.id === id).qty = qty;
    }
}