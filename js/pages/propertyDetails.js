import { properties } from "../data/properties.js";
import { initTheme } from "../modules/theme.js";
import { initMenu } from "../modules/menu.js";
import {
    isFavorite,
    initFavoriteButtons,
    updateFavoritesCount
} from "../modules/favorites.js";
import { formatPrice } from "../modules/formatters.js";
import { createWhatsAppLink } from "../modules/whatsapp.js";
import { initWhatsAppDemo } from "../modules/whatsappDemo.js";

const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get("id");
const origin = urlParams.get("origem");

const property = properties.find(prop => prop.id === Number(propertyId));

const propertyDetails = document.querySelector("#property-details");

function renderGalleryThumbnails(images) {
    return images.map((image, index) => `
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
    `).join("");
}

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

    const propertyDescription = property.description ?? "Descrição não disponível para este imóvel.";

    const propertyUrl = new URL(
        `imovel.html?id=${property.id}`,
        window.location.href
    ).href;

    const whatsappMessage = `Olá! Tenho interesse no imóvel "${property.title}", anunciado por ${formatPrice(property.price, property.purpose)}.\n\nLink: ${propertyUrl}`;

    const whatsappUrl = createWhatsAppLink(whatsappMessage);
    
    propertyDetails.innerHTML = `
        <a href="${returnUrl}" class="property-details-back">
             ${backText}
        </a>

        <div class="property-details-heading">
            <h1 class="property-details-title">
                ${property.title}
            </h1>

            <div class="property-details-actions">

                <button
                    type="button"
                    class="favorite-button ${isFavorite(property.id) ? "favorited" : ""}"
                    data-property-id="${property.id}"
                    aria-label="Favoritar ${property.title}"
                    aria-pressed="${isFavorite(property.id)}"
                >
                    ${isFavorite(property.id) ? "♥" : "♡"}
                </button>

                 <button
                    type="button"
                    class="property-share-button"
                    aria-label="Compartilhar imóvel"
                    title="Compartilhar imóvel"
                >
                    <img src="assets/icons/share.svg" alt="" aria-hidden="true">
                </button>
                
            </div>

        </div>

        <p
            id="share-feedback"
            class="share-feedback"
            role="status"
            aria-live="polite"
        ></p>

        <p class="property-details-location">
            ${property.neighborhood}, ${property.city}
        </p>

        <div class="property-gallery ${propertyImages.length === 1 ? "single-image" : ""}">
            <img
                class="property-details-image"
                src="${propertyImages[0]}"
                alt="${property.title}"
            >

            ${
                propertyImages.length > 1
                    ? `
                        <div class="property-gallery-thumbnails">
                            ${renderGalleryThumbnails(propertyImages)}
                        </div>
                    `
                    : ""
            }
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

        <section class="property-description">
            <h2>Sobre este imóvel</h2>
            <p>${propertyDescription}</p>
        </section>

        <div class="property-contact">

            ${
                whatsappUrl
                    ? `
                        <a
                            href="${whatsappUrl}"
                            class="whatsapp-button property-whatsapp-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Tenho interesse neste imóvel. Entrar em contato pelo WhatsApp"
                        >
                            <img src="assets/icons/whatsapp.svg" alt="" aria-hidden="true">
                            Tenho interesse
                        </a>
                    `
                    : `
                        <button
                            type="button"
                            class="whatsapp-button property-whatsapp-button"
                            id="whatsapp-demo-button"
                            aria-label="Tenho interesse neste imóvel. Ver informações sobre o contato na versão demonstrativa"
                        >
                            <img src="assets/icons/whatsapp.svg" alt="" aria-hidden="true">
                            Tenho interesse
                        </button>
                    `
            }

        </div>

        <dialog id="whatsapp-demo-dialog" class="whatsapp-demo-dialog" aria-labelledby="whatsapp-demo-title">
            <h2 id="whatsapp-demo-title">Versão demonstrativa</h2>

            <p>
                Este é um site de demonstração do ImóvelPro.
                O contato por WhatsApp estará disponível quando
                o site for configurado para um corretor ou imobiliária.
            </p>

            <button type="button" id="close-whatsapp-dialog">
                Entendi
            </button>
        </dialog>

    `;

    initFavoriteButtons(propertyDetails);

    const shareButton = document.querySelector(".property-share-button");

    const shareFeedback = document.querySelector("#share-feedback");

    let feedbackTimeout;

    function showShareFeedback(message) {
        clearTimeout(feedbackTimeout);

        shareFeedback.textContent = message;

        feedbackTimeout = setTimeout(() => {
            shareFeedback.textContent = "";
        }, 4000);
    }

    shareButton.addEventListener("click", async () => {

        try {
            if (navigator.share) {
                await navigator.share({
                    title: property.title,
                    text: `Confira este imóvel: ${property.title}`,
                    url: propertyUrl
                });
            } else if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(propertyUrl);
                showShareFeedback("Link copiado!");
            } else {
                showShareFeedback("Compartilhamento indisponível neste navegador.");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Erro ao compartilhar imóvel:", error);
                showShareFeedback("Não foi possível compartilhar o imóvel.");
            }
        }
    });

    initWhatsAppDemo();
    
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
