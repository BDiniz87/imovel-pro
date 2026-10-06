export function formatPrice(price, purpose) {

    const formattedPrice =
        new Intl.NumberFormat("pt-BR", {

            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0

        }).format(price);

    if (purpose === "aluguel") {

        return `${formattedPrice} / mês`;
    }

    return formattedPrice;
}
