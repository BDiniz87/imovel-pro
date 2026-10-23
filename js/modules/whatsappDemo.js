export function initWhatsAppDemo() {
    const demoButton = document.querySelector("#whatsapp-demo-button");
    const demoDialog = document.querySelector("#whatsapp-demo-dialog");
    const closeDialogButton = document.querySelector("#close-whatsapp-dialog");

    if (!demoButton || !demoDialog || !closeDialogButton) {
        return;
    }

    demoButton.addEventListener("click", () => {
        demoDialog.showModal();
    });

    closeDialogButton.addEventListener("click", () => {
        demoDialog.close();
    });
}