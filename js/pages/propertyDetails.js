import { properties } from "../data/properties.js";
import { initTheme } from "../modules/theme.js";
import { initMenu } from "../modules/menu.js";
import { updateFavoritesCount } from "../modules/favorites.js";
import { formatPrice } from "../modules/formatters.js";

const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get("id");
const origin = urlParams.get("origem");

const property = properties.find(prop => prop.id === Number(propertyId));

const propertyDetails = document.querySelector("#property-details");

if (!property) {
    propertyDetails.innerHTML = `
        <div class="property-not-found">
            <a href="imoveis.html" class="property-details-back">
                Voltar para os imóveis
            </a>
            <h1>Imóvel não encontrado</h1>
        </div>
    `;
} else {

    const returnPaths = {
        inicio: "index.html",
        favoritos: "favoritos.html",
        venda: "imoveis.html?finalidade=venda",
        aluguel: "imoveis.html?finalidade=aluguel"
    };

    const returnUrl = returnPaths[origin] || `imoveis.html?finalidade=${property.purpose}`;

    const returnText = {
        inicio: "Voltar para o início",
        favoritos: "Voltar aos favoritos",
        venda: "Voltar para os imóveis à venda",
        aluguel: "Voltar para os imóveis para alugar"
    };

    const backText = returnText[origin] || "Voltar para os imóveis";

    propertyDetails.innerHTML = `
        <a href="${returnUrl}" class="property-details-back">
             ${backText}
        </a>

        <h1 class="property-details-title">
            ${property.title}
        </h1>

        <p class="property-details-location">
            ${property.neighborhood}, ${property.city}
        </p>

        <img
            class="property-details-image"
            src="${property.image}"
            alt="${property.title}"
        >

        <p class="property-details-price">
            ${formatPrice(property.price, property.purpose)}
        </p>

    `;
}


initTheme();
initMenu();
updateFavoritesCount();
