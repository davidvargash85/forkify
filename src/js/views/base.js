export const elements = {
    searchForm: document.querySelector('.search'),    
    searchField: document.querySelector('.search__field'),    
    searchField: document.querySelector('.search__field'),    
    searchResultsList: document.querySelector('.results__list'),
    searchResultsPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes'),
    likesList: document.querySelector('.likes__list'),
};

export const elementStrings = {
    loader: 'loader',
    ingList: '.recipe__ingredient-list'
}

export const setLoader = (parent) => {
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    var loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}

export const truncateTitles = (title, maxSize) => {
    if (title <= maxSize) {
        return title;
    }

    let result = [];

    title.split(' ').reduce((acc, word) => {
        if (acc + word.length <= maxSize) {
            result.push(word);
        }
        return acc + word.length;
    }, 0);

    return `${result.join(' ')}...`;
}