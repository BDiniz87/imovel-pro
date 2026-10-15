const savedFavorites = localStorage.getItem("favorites");
const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

function saveFavorites() {

    localStorage.setItem("favorites",JSON.stringify(favorites));
}

export function toggleFavorite(propertyId) {

    if (isFavorite(propertyId)) {

        const index = favorites.indexOf(propertyId);

        favorites.splice(index, 1);

    } else {

        favorites.push(propertyId);

    }

    saveFavorites();

    return isFavorite(propertyId);
}

export function isFavorite(propertyId) {

    return favorites.includes(propertyId);
}

export function initFavoriteButtons(container) {

    container.addEventListener("click", (event) => {
    
        const button = event.target.closest(".favorite-button");
    
        if (!button) {
            return;
        }
    
        const propertyId = Number(button.dataset.propertyId);
    
        const isFavorited = toggleFavorite(propertyId);
    
        button.classList.toggle("favorited", isFavorited);
    
        button.textContent = isFavorited ? "♥" : "♡";
    
    });

}