const messages = {
    WhatsApp: "O contato por WhatsApp estará disponível quando o site for configurado para um corretor ou imobiliária.",
    Instagram: "O perfil do Instagram estará disponível quando for configurado pelo corretor ou imobiliária.",
    Facebook: "A página do Facebook estará disponível quando for configurada pelo corretor ou imobiliária."
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
    const dialog = document.querySelector("#demo-dialog");
    const closeButton = document.querySelector("#close-demo-dialog");

    if (!dialog || !closeButton) return;

    closeButton.addEventListener("click", () => {
        dialog.close();
    });
}