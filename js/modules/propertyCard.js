import { isFavorite } from "./favorites.js";
import { formatPrice } from "./formatters.js";

export function createPropertyCard(property, origin) {

    const isFavorited = isFavorite(property.id);

    const card = document.createElement("article");

    card.classList.add("property-card");

    card.innerHTML = `

        <div class="property-image">

            <img
                src="${property.image}"
                alt="${property.title}"
            >

            <span class="property-purpose">
                ${property.purpose === "venda" ? "Venda" : "Aluguel"}
            </span>

            <button
                type="button"
                class="favorite-button ${isFavorited ? "favorited" : ""}"
                data-property-id="${property.id}"
                aria-label="${isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
                aria-pressed="${isFavorited}"
            >
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/>
                </svg>
            </button>

        </div>


        <div class="property-content">

            <h3>
                <a href="imovel.html?id=${property.id}&origem=${origin}">
                    ${property.title}
                </a>
            </h3>

            <p class="property-location">
                ${property.neighborhood},
                ${property.city}
            </p>


            <div class="property-features">

                ${
                    property.bedrooms > 0
                        ? `<span>🛏 ${property.bedrooms}</span>`
                        : ""
                }

                ${
                    property.bathrooms > 0
                        ? `<span>🚿 ${property.bathrooms}</span>`
                        : ""
                }

                ${
                    property.parkingSpaces > 0
                        ? `<span>🚗 ${property.parkingSpaces}</span>`
                        : ""
                }

            </div>


            <p class="property-price">

                ${formatPrice(
                    property.price,
                    property.purpose
                )}

            </p>

        </div>
    `;

    return card;

}