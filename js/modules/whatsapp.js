import { siteConfig } from "../config.js";

export function createWhatsAppLink(message) {

    const whatsappNumber = siteConfig.whatsappNumber;

    if (!whatsappNumber) {
        return null;
    }
    
    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return whatsappUrl;

}