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

    const propertyImages = property.images ?? [property.image];

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

        <div class="property-gallery">
            <img
                class="property-details-image"
                src="${propertyImages[0]}"
                alt="${property.title}"
            >

            <div class="property-gallery-thumbnails">
                ${propertyImages.map((image, index) => `
                    <button
                        type="button"
                        class="property-gallery-thumbnail"
                        aria-label="Visualizar foto ${index + 1} do imóvel"
                    >
                        <img
                            src="${image}"
                            alt=""
                            loading="lazy"
                        >
                    </button>
                `).join("")}
            </div>
        </div>

        <p class="property-details-price">
            ${formatPrice(property.price, property.purpose)}
        </p>

        <div class="property-details-features">

            ${
                property.bedrooms > 0
                    ? `
                        <div class="property-feature">
                            <span class="property-feature-icon">🛏️</span>
                            <strong>${property.bedrooms}</strong>
                            <span>Quartos</span>
                        </div>
                    `
                    : ""
            }

            ${
                property.bathrooms > 0
                    ? `
                        <div class="property-feature">
                            <span class="property-feature-icon">🚿</span>
                            <strong>${property.bathrooms}</strong>
                            <span>Banheiros</span>
                        </div>
                    `
                    : ""
            }

            ${
                property.parkingSpaces > 0
                    ? `
                        <div class="property-feature">
                            <span class="property-feature-icon">🚗</span>
                            <strong>${property.parkingSpaces}</strong>
                            <span>Vagas</span>
                        </div>
                    `
                    : ""
            }

        </div>

    `;

    const mainImage = document.querySelector(".property-details-image");

    const thumbnails = document.querySelectorAll(".property-gallery-thumbnail");

    thumbnails.forEach((thumbnail, index) => {

        const isSelected = index === 0;

        thumbnail.classList.toggle("is-active", isSelected);
        thumbnail.setAttribute("aria-pressed", String(isSelected));

        thumbnail.addEventListener("click", () => {

            mainImage.src = propertyImages[index];

            thumbnails.forEach((button, buttonIndex) => {
                const isActive = buttonIndex === index;

                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });

        });
    });
}


initTheme();
initMenu();
updateFavoritesCount();
