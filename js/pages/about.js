import { initTheme } from "../modules/theme.js";
import { initMenu } from "../modules/menu.js";
import { updateFavoritesCount } from "../modules/favorites.js";
import { createWhatsAppLink } from "../modules/whatsapp.js";
import { initWhatsAppDemo } from "../modules/whatsappDemo.js";
import { siteConfig } from "../config.js";

const contactContainer = document.querySelector("#about-whatsapp-contact");

const whatsappMessage = "Olá! Visitei seu site e gostaria de conversar sobre imóveis disponíveis.";

const whatsappUrl = createWhatsAppLink(whatsappMessage);

const broker = siteConfig.broker;

document.querySelector("#broker-name").textContent = broker.name;
document.querySelector("#broker-creci").textContent = broker.creci;
document.querySelector("#broker-region").textContent = broker.region;

if (whatsappUrl) {
    contactContainer.innerHTML = `
        <a
            href="${whatsappUrl}"
            class="about-whatsapp-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar pelo WhatsApp"
        >
            <img
                src="assets/icons/whatsapp.svg"
                alt=""
                aria-hidden="true"
            >
            Conversar pelo WhatsApp
        </a>
    `;
} else {
    contactContainer.innerHTML = `
        <button
            type="button"
            class="about-whatsapp-button"
            id="whatsapp-demo-button"
        >
            <img
                src="assets/icons/whatsapp.svg"
                alt=""
                aria-hidden="true"
            >
            Conversar pelo WhatsApp
        </button>
    `;
    initWhatsAppDemo();
}

initTheme();
initMenu();
updateFavoritesCount();