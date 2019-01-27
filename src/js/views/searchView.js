import { elements, truncateTitles } from './base';

export const getInput = () => elements.searchField.value;

const showPageBtn = (page, type) => {
    const html = `
    <button class="btn-inline results__btn--${type}" data-goto="${page}">
    <svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type == 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${page}</span>
    </button>`;
    
    elements.searchResultsPages.insertAdjacentHTML('afterbegin', html);
};

const showRecipe = (recipe) => {

    const html = `<li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${truncateTitles(recipe.title, 17)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;

    elements.searchResultsList.insertAdjacentHTML('beforeend', html);
};

export const showRecipes = (recipes, page = 1, pageSize = 10) => {

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageCount = Math.ceil(recipes.length / pageSize);

    recipes.slice(start, end).forEach(recipe => {
        showRecipe(recipe);
    });

    if (page === 1) {
        showPageBtn(page + 1, 'next');
    } else if (page > 1 && page < pageCount) {
        showPageBtn(page - 1, 'prev');
        showPageBtn(page + 1 , 'next');
    } else {
        showPageBtn(page - 1, 'prev');
    }
};

export const clearInput = () => {
    elements.searchField.value = '';
};

export const clearSearchResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResultsPages.innerHTML = '';
};

export const highlightSelection = (id) => {
    document.querySelectorAll('.results__link').forEach(e => {
        e.classList.remove('results__link--active');
    });

    const selected = document.querySelector(`.results__link[href="#${id}"]`);
    if(selected) {
        selected.classList.add('results__link--active');
    }
};