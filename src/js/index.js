import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import LikedList from './models/LikedList';

import { clearLoader, setLoader, elements } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likeView from './views/likeView';

/* APP GLOBAL STATE
- Search object 
- Current recipe object
- Shopping list
- Liked recipes
*/
const state = {};

const searchCtrl = async () => {

    //read query input from UI
    const q = searchView.getInput();

    //instantiate new search object into state
    state.search = new Search(q);

    //wait for promess to fulfill
    await state.search.getRecipes();
    
    //clear UI input and previous results before showing new
    searchView.clearInput();
    searchView.clearSearchResults();
    
    //show loader while recipes load
    setLoader(elements.searchResultsList);
    
    //show results to UI
    searchView.showRecipes(state.search.result);
    
    //clear loader after search results
    clearLoader();
}

const recipeCtrl = async () => {
    
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        //recipe selection highlighted with gray background
        searchView.highlightSelection(id);

        state.selectedRecipe = new Recipe(id);
        //query and await API 
        await state.selectedRecipe.getRecipeById();

        //show recipe on UI
        recipeView.clearRecipe();

        //create liked list in state if does not exist
        if(!state.likedList) {
            state.likedList = new LikedList();
        }

        const liked = state.likedList.contains(id);
        recipeView.displayRecipe(state.selectedRecipe, liked);
    }
    
};

const shoppingListCtrl = () => {
    if(!state.shoppingList) {
        state.shoppingList = new ShoppingList();
    }

    state.selectedRecipe.ingredients.forEach(ing => {
        const item = state.shoppingList.addItem(ing.count, ing.unit, ing.ingredient);
        shoppingListView.displayItem(item);
    });
    
};

//search resul selection event
['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeCtrl));

//search event
elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchCtrl();
});

//pagination event 
elements.searchResultsPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto);
        searchView.clearSearchResults();
        
        searchView.showRecipes(state.search.result, gotoPage);
    }
});

//handler for liked recipes
const likeCtrl = () => {
    //create liked list in state if does not exist
    if(!state.likedList) {
        state.likedList = new LikedList();
    }
    
    //check if likedList contais current recipe Id
    //add to list in case does not exist
    if(!state.likedList.contains(state.selectedRecipe.id)) {
        const like = state.likedList.addItem(
            state.selectedRecipe.id,
            state.selectedRecipe.title,
            state.selectedRecipe.publisher,
            state.selectedRecipe.imageUrl
        );

        //showing the like heart in the recipe
        recipeView.toggleLikeBtn(true);

        //add the liked recipe to the likes view
        likeView.displayLike(like);

    //remove from list if already exist
    } else {   
        state.likedList.removeItem(state.selectedRecipe.id);
        recipeView.toggleLikeBtn(false);
    }

    likeView.likesMenuVisible(state.likedList.items.length > 0);
};

//recipe events (servings, like, add to shopping list)
elements.recipe.addEventListener('click', (e) => {
    
    const btnInc = e.target.matches('.btn-increase, .btn-increase *');
    const btnDec = e.target.matches('.btn-decrease, .btn-decrease *');
    const btnAddToList = e.target.matches('.recipe__btn, .add__ingr__btn *');
    const btnLike = e.target.matches('.recipe__love, .recipe__love *');
    
    if (btnInc || btnDec) {
        //update ingredients servings
        state.selectedRecipe.updateServings(btnInc ? 'inc' : 'dec');

        //display updated ingredient count
        recipeView.updateIngredientsCount(state.selectedRecipe);
    } else if (btnAddToList) {
        shoppingListCtrl();
    } else if (btnLike) {
        likeCtrl();
    }

});

//shopping list click event
elements.shoppingList.addEventListener('click', (e) => {

    const id = e.target.closest('.shopping__item').dataset.id;

    const delBtn = e.target.matches('.shopping__delete, .shopping__delete *');
    const upDown = e.target.matches('.shopping__item__count');

    if(delBtn && id) {
        state.shoppingList.removeItem(id);
        shoppingListView.removeItem(id);
    } else if (upDown) {
        const qty = parseFloat(e.target.value);
        state.shoppingList.updateQty(id, qty);
        console.log(state.shoppingList);
    }
});

// // //GLOBAL INITIALIZATION
// const init = () => {
//     likesView.likesVisible(false);
// };

// init();