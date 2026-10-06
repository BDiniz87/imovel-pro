import { isFavorite } from "./favorites.js";
import { formatPrice } from "./formatters.js";

export function createPropertyCard(property) {

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
                class="favorite-button ${isFavorited ? "favorited" : ""}"
                data-property-id="${property.id}"
                aria-label="Adicionar aos favoritos"
            >
                ${isFavorited ? "♥" : "♡"}
            </button>

        </div>


        <div class="property-content">

            <h3>
                ${property.title}
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