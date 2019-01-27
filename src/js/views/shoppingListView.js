import { elements } from './base';

export const displayItem = (item) => {
    
    const html = `
    <li class="shopping__item" data-id="${item.id}">
        <div class="shopping__count">
            <input class="shopping__item__count" type="number" value="${item.qty}" step="${item.qty}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.name}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>`;
    
    elements.shoppingList.insertAdjacentHTML('beforeend', html);
};

export const removeItem = (id) => {
    const item = document.querySelector(`.shopping__item[data-id="${id}"]`);
    if(item) {
        item.parentElement.removeChild(item);
    }
};