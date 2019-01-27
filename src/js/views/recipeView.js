import { elements, elementStrings } from './base';
import { Fraction } from 'fractional';

const getFractionStr = num => {
    const f = new Fraction(num);
    if(num){
        return Number.isInteger(num) ? num : `${f.numerator}/${f.denominator}` ;
    } else {
        return '?';
    }
}

const displayIngredient = (ing) => {
    return  `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${getFractionStr(ing.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.ingredient}
        </div>
    </li>
    `;
}

export const displayRecipe = (recipe, liked) => {
    const html = `
    <figure class="recipe__fig">
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease" >
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${liked ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(ing => displayIngredient(ing)).join(' ')}
        </ul>

        <button class="btn-small recipe__btn add__ingr__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </a>
    </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', html);
}

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

export const updateIngredientsCount = (recipe) => {
    
    const ingList = document.querySelector('.recipe__ingredient-list');
    if(ingList) {
        ingList.innerHTML = ''; 

        const ingHtml = recipe.ingredients.map(ing => displayIngredient(ing)).join(' ');
    
        ingList.innerHTML = ingHtml;
    }
}

export const toggleLikeBtn = (liked) => {
    document.querySelector('.header__likes use').setAttribute('href', `img/icons.svg#icon-heart${liked ? '' : '-outlined'}`);
}