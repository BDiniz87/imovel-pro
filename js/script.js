
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

const priceInput = document.getElementById("price");
const priceValue = document.getElementById("price-value");

const citySelect = document.getElementById("city");
const neighborhoodSelect = document.getElementById("neighborhood");

const propertiesContainer = document.getElementById("featured-properties");

const savedTheme = localStorage.getItem("theme");

const favorites = [];

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

const cities = [
    ...new Set(
        properties.map((property) => {
            return property.city;
        })
    )
];

cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
})

console.log("Cidades: ", cities);

function updateNeighborhoods(selectedCity) {
    
    let propertiesFromCity;

    if(selectedCity === ""){
        propertiesFromCity = properties;
    } else {
        propertiesFromCity = properties.filter((property) =>{
            return property.city === selectedCity;
        });
    }

    const neighborhoods = [
        ...new Set(
                propertiesFromCity.map((property) => {
                    return property.neighborhood;
                })
        )
    ];

    neighborhoodSelect.innerHTML = `
        <option value="">Todos</option>
    `;

    neighborhoods.forEach((neighborhood) => {

        const option = document.createElement("option");

        option.value = neighborhood;

        option.textContent = neighborhood;

        neighborhoodSelect.appendChild(option);

    });

    console.log("Bairros disponíveis: ", neighborhoods);

}

citySelect.addEventListener("change", () => {

    const selectedCity = citySelect.value;

    updateNeighborhoods(selectedCity);

})

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

        updatePriceRange();


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

    const price = Number(priceInput.value);

    const filters = {

        purpose: selectedPurpose,

        type: propertyType,

        city: city,

        neighborhood: neighborhood,

        price: price

    };

    const filteredProperties = properties.filter((property) => {

       const matchesPurpose = property.purpose === filters.purpose;
       const matchesType = filters.type === "" || property.type === filters.type;
       const matchesCity = filters.city === "" || property.city === filters.city;
       const matchesNeighborhood = filters.neighborhood === "" || property.neighborhood === filters.neighborhood;
       const matchesPrice = property.price <= filters.price;

       return matchesPurpose && matchesType && matchesCity && matchesNeighborhood && matchesPrice;

    });

    console.log("Resultados:", filteredProperties);

    console.log("Filtros selecionados:", filters);

    renderProperties(filteredProperties);

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

    if (propertyList.length === 0) {

        container.innerHTML = `
            <p class="no-results">
                Nenhum imóvel encontrado com os filtros selecionados.
            </p>
        `;

        return;
    }

    propertyList.forEach((property) => {

        const isFavorited = favorites.includes(property.id);

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
                    class="favorite-button ${isFavorited ? "favorited" : ""}"
                    data-property-id="${property.id}"
                    aria-label="Adicionar aos favoritos"
                >
                    ${isFavorited ? "♥" : "♡"}
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

propertiesContainer.addEventListener("click", (event) => {

    // Descobre se o usuário clicou em um botão de favorito.
    const button = event.target.closest(".favorite-button");

    // Se não clicou em um botão de favorito, encerra a função.
    if (!button) {
        return;
    }

    // O dataset retorna texto, então transformamos o ID em número.
    const propertyId = Number(button.dataset.propertyId);


    // Verifica se esse imóvel já está no array de favoritos.
    if (favorites.includes(propertyId)) {

        // Descobre a posição do ID dentro do array.
        const index = favorites.indexOf(propertyId);

        // Remove o ID do array.
        favorites.splice(index, 1);

        // Atualiza o botão.
        button.classList.remove("favorited");
        button.textContent = "♡";

        console.log("Imóvel removido dos favoritos:", propertyId);

    } else {

        // Adiciona o ID ao array de favoritos.
        favorites.push(propertyId);

        // Atualiza o botão.
        button.classList.add("favorited");
        button.textContent = "♥";

        console.log("Imóvel adicionado aos favoritos:", propertyId);
    }

    console.log("Favoritos:", favorites);
});

function formatFilterPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency:"BRL",
        maximumFractionDigits: 0
    }).format(price);
}

priceInput.addEventListener("input", () => {

    updatePriceDisplay();
});

function updatePriceRange() {
    if (selectedPurpose === "venda") {
        priceInput.min = 100000;
        priceInput.max = 3000000;
        priceInput.step = 50000;
        priceInput.value= 3000000;
    } else {
        priceInput.min = 500;
        priceInput.max = 10000;
        priceInput.step = 250;
        priceInput.value = 10000;
    }

    updatePriceDisplay();
}

function updatePriceDisplay() {
    const currentPrice = Number(priceInput.value);

    if (selectedPurpose === "aluguel") {
        priceValue.textContent = `${formatFilterPrice(currentPrice)} / mês`;
    } else {
        priceValue.textContent = formatFilterPrice(currentPrice);
    }
}