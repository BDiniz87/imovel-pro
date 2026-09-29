
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

const savedTheme = localStorage.getItem("theme");

const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
} else if (savedTheme === "light") {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
} else if (systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
} else {
    themeToggle.textContent = "🌙";
}


const properties = [

    {
        id: 1,

        title: "Casa moderna com piscina",

        purpose: "venda",

        type: "casa",

        city: "Botucatu",

        neighborhood: "Centro",

        price: 850000,

        bedrooms: 3,

        bathrooms: 2,

        parkingSpaces: 2,

        featured: true,

        image: "assets/images/property-01.jpg"
    },

    {
        id: 2,

        title: "Apartamento próximo ao centro",

        purpose: "aluguel",

        type: "apartamento",

        city: "Botucatu",

        neighborhood: "Vila dos Lavradores",

        price: 2200,

        bedrooms: 2,

        bathrooms: 1,

        parkingSpaces: 1,

        featured: true,

        image: "assets/images/property-02.jpg"
    },

    {
        id: 3,

        title: "Casa em condomínio fechado",

        purpose: "venda",

        type: "casa",

        city: "Botucatu",

        neighborhood: "Residencial Green",

        price: 1200000,

        bedrooms: 4,

        bathrooms: 3,

        parkingSpaces: 2,

        featured: true,

        image: "assets/images/property-03.jpg"
    },

    {
        id: 4,

        title: "Terreno em área nobre",

        purpose: "venda",

        type: "terreno",

        city: "Botucatu",

        neighborhood: "Jardim Paraíso",

        price: 320000,

        bedrooms: 0,

        bathrooms: 0,

        parkingSpaces: 0,

        featured: false,

        image: "assets/images/property-04.jpg"
    },

    {
        id: 5,

        title: "Apartamento com vista panorâmica",

        purpose: "aluguel",

        type: "apartamento",

        city: "Bauru",

        neighborhood: "Centro",

        price: 3000,

        bedrooms: 3,

        bathrooms: 2,

        parkingSpaces: 2,

        featured: true,

        image: "assets/images/property-05.jpg"
    },

    {
        id: 6,

        title: "Casa térrea recém-reformada",

        purpose: "venda",

        type: "casa",

        city: "São Manuel",

        neighborhood: "Centro",

        price: 480000,

        bedrooms: 2,

        bathrooms: 2,

        parkingSpaces: 2,

        featured: false,

        image: "assets/images/property-06.jpg"
    }

];


themeToggle.addEventListener("click", () => {

    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";

    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    }

});

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("open");

    const menuIsOpen = nav.classList.contains("open");

    menuToggle.setAttribute(
        "aria-expanded",
        menuIsOpen
    );

});

const purposeButtons = document.querySelectorAll(".purpose-button");

let selectedPurpose = "venda";

purposeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        purposeButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedPurpose = button.dataset.purpose;


        /*
            Temporariamente vamos imprimir
            no console para enxergar o estado
            da aplicação mudando.
        */

        console.log(
            "Finalidade selecionada:",
            selectedPurpose
        );

    });

});

const searchForm = document.getElementById("search-form");


searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const propertyType = document.getElementById("property-type").value;

    const city = document.getElementById("city").value;

    const neighborhood = document.getElementById("neighborhood").value;

    const price = document.getElementById("price").value;

    const filters = {

        purpose: selectedPurpose,

        type: propertyType,

        city: city,

        neighborhood: neighborhood,

        price: price

    };

    /*
        Por enquanto apenas mostramos o objeto.

        Na próxima etapa esse objeto será utilizado
        para filtrar nosso array de imóveis.
    */

    console.log("Filtros selecionados:", filters);

});

function formatPrice(price, purpose) {

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


function renderProperties(propertyList) {

    const container = document.getElementById("featured-properties");

    container.innerHTML = "";

    propertyList.forEach((property) => {

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
                    class="favorite-button"
                    data-property-id="${property.id}"
                    aria-label="Adicionar aos favoritos"
                >
                    ♡
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

        container.appendChild(card);

    });
}

const featuredProperties =
    properties.filter((property) => {
        return property.featured;
    });

renderProperties(featuredProperties);

const favoriteButtons = document.querySelectorAll(".favorite-button");

favoriteButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const propertyId = button.dataset.propertyId;

        if (button.classList.contains("favorited")) {

            button.classList.remove("favorited");
            button.textContent = "♡";

            console.log("Imóvel removido dos favoritos:", propertyId);

        } else {

            button.classList.add("favorited");
            button.textContent = "♥";

            console.log("Imóvel adicionado aos favoritos:", propertyId);
        }

    });

});

