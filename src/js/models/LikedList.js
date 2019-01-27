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

        //persist data to local storage
        this.persistData();

        return newItem;
    }

    removeItem(recipeId) {
        const index = this.items.findIndex(item => item.recipeId === recipeId);
        this.items.splice(index, 1);

        //persist data to local storage
        this.persistData();
    }

    contains(recipeId) {
        return this.items.findIndex(el => el.recipeId === recipeId) !== -1;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.items));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        if(storage) {
            this.items = storage;
        }
    }
}