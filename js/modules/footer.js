import { siteConfig } from "../config.js";
import { createWhatsAppLink } from "./whatsapp.js";
import { initDemoDialog, showDemoDialog } from "./demoDialog.js";

function createContactElement(label, url, icon) {
    const element = document.createElement(url ? "a" : "button");

    if (url) {
        element.href = url;

        if (!url.startsWith("mailto:")) {
            element.target = "_blank";
            element.rel = "noopener noreferrer";
        }
    } else {
        element.type = "button";

        element.addEventListener("click", () => {
            showDemoDialog(label);
        });
    }

    element.className = "footer-contact-link";

    const iconElement = document.createElement("img");
    iconElement.src = `assets/icons/${icon}.svg`;
    iconElement.alt = "";
    iconElement.setAttribute("aria-hidden", "true");

    const textElement = document.createElement("span");
    textElement.textContent = label === "Email" ? "E-mail" : label;

    element.append(iconElement, textElement);

    return element;
}

export function initFooter() {
    const footer = document.querySelector("#site-footer");

    if (!footer) return;

    const { site, broker, social, developer } = siteConfig;

    const whatsappUrl = createWhatsAppLink(
        "Olá! Visitei seu site e gostaria de saber mais sobre os imóveis disponíveis."
    );

    footer.innerHTML = `
        <div class="container footer-content">
            <div class="footer-brand">
                <h2 id="footer-site-name"></h2>
                <p id="footer-site-description"></p>

                <div class="footer-broker">
                    <strong id="footer-broker-name"></strong>
                    <p id="footer-broker-creci"></p>
                    <div class="footer-region">
                        <img
                            src="assets/icons/map-pin.svg"
                            alt=""
                            aria-hidden="true"
                        >
                        <p id="footer-broker-region"></p>
                    </div>
                </div>
            </div>

            <nav class="footer-navigation" aria-label="Navegação do rodapé">
                <h3>Navegação</h3>

                <a href="index.html">Início</a>
                <a href="imoveis.html?finalidade=venda">Comprar</a>
                <a href="imoveis.html?finalidade=aluguel">Alugar</a>
                <a href="sobre.html">Sobre</a>
                <a href="contato.html">Contato</a>
            </nav>

            <div class="footer-contact">
                <h3>Contato e redes sociais</h3>
                <div class="footer-social-links" id="footer-social-links"></div>
            </div>
        </div>

        <div class="container footer-bottom">
            <p id="footer-copyright"></p>

            <a
                id="footer-developer"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span id="footer-developer-name"></span>

                <img
                    src="assets/icons/external-link.svg"
                    alt=""
                    aria-hidden="true"
                >
            </a>
        </div>
    `;

    const siteNameElement = footer.querySelector("#footer-site-name");

    if (site.nameHighlight && site.name.endsWith(site.nameHighlight)) {
        const regularName = site.name.slice(0, -site.nameHighlight.length);

        siteNameElement.append(document.createTextNode(regularName));

        const highlight = document.createElement("span");
        highlight.className = "footer-brand-highlight";
        highlight.textContent = site.nameHighlight;

        siteNameElement.append(highlight);
    } else {
        siteNameElement.textContent = site.name;
    }
    footer.querySelector("#footer-site-description").textContent = site.description;

    footer.querySelector("#footer-broker-name").textContent = broker.name;
    footer.querySelector("#footer-broker-creci").textContent = broker.creci;
    footer.querySelector("#footer-broker-region").textContent = broker.region;

    footer.querySelector("#footer-copyright").textContent =
        `© ${new Date().getFullYear()} ${site.name}. Todos os direitos reservados.`;

    const developerLink = footer.querySelector("#footer-developer");

    footer.querySelector("#footer-developer-name").textContent = `Desenvolvido por ${developer.name}`;
    developerLink.href = developer.url;

    const socialContainer = footer.querySelector("#footer-social-links");

    const contacts = [
        {
            label: "WhatsApp",
            url: whatsappUrl,
            icon: "whatsapp"
        },
        {
            label: "Email",
            url: broker.email ? `mailto:${broker.email}` : "",
            icon: "mail"
        },
        {
            label: "Instagram",
            url: social.instagram,
            icon: "instagram"
        },
        {
            label: "Facebook",
            url: social.facebook,
            icon: "facebook"
        }
    ];

    contacts.forEach(contact => {
        const element = createContactElement(
            contact.label,
            contact.url,
            contact.icon
        );

        socialContainer.appendChild(element);
    });

    initDemoDialog();
}