export default class LikedList {
    
    constructor() {
        this.items = [];
    }

    addItem(recipeId, title, publisher, imageUrl) {
        
        const newItem = {
            recipeId: recipeId,
            title: title,
            publisher: publisher,
            imageUrl: imageUrl
        }; 

        this.items.push(newItem);

        return newItem;
    }

    removeItem(recipeId) {
        const index = this.items.findIndex(item => item.recipeId === recipeId);
        this.items.splice(index, 1);
    }

    contains(recipeId) {
        return this.items.findIndex(el => el.recipeId === recipeId) !== -1;
    }
}