const messages = {
    WhatsApp: "O contato por WhatsApp estará disponível quando o site for configurado para um corretor ou imobiliária.",
    Instagram: "O perfil do Instagram estará disponível quando for configurado pelo corretor ou imobiliária.",
    Facebook: "A página do Facebook estará disponível quando for configurada pelo corretor ou imobiliária.",
    Email: "O contato por e-mail estará disponível quando o site for configurado para um corretor ou imobiliária."
};

export function showDemoDialog(service) {
    const dialog = document.querySelector("#demo-dialog");
    const message = document.querySelector("#demo-dialog-message");

    if (!dialog || !message) return;

    message.textContent = messages[service] ?? "Este recurso ainda não está disponível na versão demonstrativa.";

    if (!dialog.open) {
        dialog.showModal();
    }
}

export function initDemoDialog() {
    let dialog = document.querySelector("#demo-dialog");

    if (!dialog) {
        dialog = document.createElement("dialog");

        dialog.id = "demo-dialog";
        dialog.className = "demo-dialog";

        dialog.setAttribute("aria-labelledby", "demo-dialog-title");
        dialog.setAttribute("aria-describedby", "demo-dialog-message");

        dialog.innerHTML = `
            <h2 id="demo-dialog-title">Versão demonstrativa</h2>

            <p id="demo-dialog-message"></p>

            <button type="button" id="close-demo-dialog">
                Entendi
            </button>
        `;

        document.body.appendChild(dialog);
    }

    const closeButton = dialog.querySelector("#close-demo-dialog");

    if (!closeButton) return;

    closeButton.onclick = () => {
        dialog.close();
    };
}