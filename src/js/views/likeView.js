import { elements, truncateTitles } from './base';

export const likesMenuVisible = (visible) => {
    return elements.likesMenu.style.visibility = visible ? "visible" : "hidden";
} 

export const displayLike = (likeItem) => {
    const html = `
    <li>
        <a class="likes__link" href="#${likeItem.recipeId}">
            <figure class="likes__fig">
                <img src="${likeItem.imageUrl}" alt="${truncateTitles(likeItem.title, 17)}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${truncateTitles(likeItem.title, 17)}</h4>
                <p class="likes__author">${likeItem.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend', html);
}

