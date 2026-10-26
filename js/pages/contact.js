import { initTheme } from "../modules/theme.js";
import { initMenu } from "../modules/menu.js";
import { updateFavoritesCount } from "../modules/favorites.js";
import {siteConfig} from "../config.js";
import { createWhatsAppLink } from "../modules/whatsapp.js";
import { initDemoDialog, showDemoDialog } from "../modules/demoDialog.js";
import { initFooter } from "../modules/footer.js";

const broker = siteConfig.broker;

const contactContainer = document.querySelector("#contact-whatsapp");

const whatsappMessage = "Olá! Visitei seu site e gostaria de mais informações.";

const whatsappUrl = createWhatsAppLink(whatsappMessage);

document.querySelector("#broker-name").textContent = broker.name;
document.querySelector("#broker-creci").textContent = broker.creci;
document.querySelector("#broker-region").textContent = broker.region;

if (whatsappUrl) {
    contactContainer.innerHTML = `
        <a
            href="${whatsappUrl}"
            class="whatsapp-button"
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
            class="whatsapp-button"
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
    document
        .querySelector("#whatsapp-demo-button")
        .addEventListener("click", () => {
            showDemoDialog("WhatsApp");
        });
}

initDemoDialog();
initTheme();
initMenu();
updateFavoritesCount();
initFooter();
