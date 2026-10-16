import { initTheme } from "../modules/theme.js";
import { initMenu } from "../modules/menu.js";
import {
    initFavoriteButtons,
    updateFavoritesCount,
    isFavorite
} from "../modules/favorites.js";
import { properties } from "../data/properties.js";
import { createPropertyCard } from "../modules/propertyCard.js";

const favoritesGrid = document.getElementById("favorites-grid");

function renderFavorites() {

    const favoriteProperties = properties.filter((property) => {
        return isFavorite(property.id);
    });

    favoritesGrid.innerHTML = "";

    if(favoriteProperties.length === 0) {

        favoritesGrid.innerHTML = `
            <div class="favorites-empty">
                <h2>Nenhum imóvel favorito ainda</h2>
                <p>Explore nossos imóveis e salve os que mais gostar.</p>
                <a href="imoveis.html" class="favorites-explore">
                    Explorar imóveis
                </a>
            </div>
        `;

        return;

    }

    favoriteProperties.forEach((property) => {

        const card = createPropertyCard(property);

        favoritesGrid.appendChild(card);
    });

}

initTheme();
initMenu();
initFavoriteButtons(favoritesGrid, renderFavorites);
updateFavoritesCount();
renderFavorites();