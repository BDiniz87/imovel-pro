import { properties } from "./data/properties.js";
import { toggleFavorite} from "./modules/favorites.js";
import { initTheme } from "./modules/theme.js";
import { initMenu } from "./modules/menu.js";
import { 
    filterProperties, 
    getNeighborhoods, 
    getCities, 
    getPriceConfig,
    sortProperties 
} from "./modules/filters.js";
import { formatPrice } from "./modules/formatters.js";
import { createPropertyCard } from "./modules/propertyCard.js";

const priceInput = document.getElementById("price");
const priceValue = document.getElementById("price-value");

const citySelect = document.getElementById("city");
const neighborhoodSelect = document.getElementById("neighborhood");

const propertiesContainer = document.getElementById("featured-properties");

const propertiesTitle = document.getElementById("properties-title");
const propertiesDescription = document.getElementById("properties-description");

const clearFiltersButton = document.getElementById("clear-filters");


const purposeButtons = document.querySelectorAll(".purpose-button");

let selectedPurpose = "venda";

const searchForm = document.getElementById("search-form");

const sortSelect = document.getElementById("sort-properties");

const cities = getCities(properties);

const featuredProperties =
    properties.filter((property) => {
        return property.featured;
    })
;

let currentProperties = featuredProperties;

cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
})

function updateNeighborhoods(selectedCity) {

    const neighborhoods = getNeighborhoods(properties, selectedCity);

    neighborhoodSelect.innerHTML = `
        <option value="">Todos</option>
    `;

    neighborhoods.forEach((neighborhood) => {

        const option = document.createElement("option");

        option.value = neighborhood;

        option.textContent = neighborhood;

        neighborhoodSelect.appendChild(option);

    });

}

citySelect.addEventListener("change", () => {

    const selectedCity = citySelect.value;

    updateNeighborhoods(selectedCity);

})

purposeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        purposeButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedPurpose = button.dataset.purpose;

        updatePriceRange();

    });

});

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const propertyType = document.getElementById("property-type").value;

    const city = document.getElementById("city").value;

    const neighborhood = document.getElementById("neighborhood").value;

    const price = Number(priceInput.value);

    const filters = {

        purpose: selectedPurpose,

        type: propertyType,

        city,

        neighborhood,

        price

    };

    const filteredProperties = filterProperties(properties,filters);

    currentProperties = filteredProperties;

    updateResultsHeader(filteredProperties.length);

    clearFiltersButton.hidden = false;

    renderProperties(filteredProperties);

});

sortSelect.addEventListener("change", () => {

    const sortType = sortSelect.value;

    const sortedProperties = sortProperties(currentProperties, sortType);

    renderProperties(sortedProperties);

});

function updateResultsHeader(resultCount) {

    if (resultCount === 0) {
        propertiesTitle.textContent =
            "Nenhum imóvel encontrado";

        propertiesDescription.textContent =
            "Tente alterar os filtros da sua busca.";

    } else if (resultCount === 1) {
        propertiesTitle.textContent =
            "1 imóvel encontrado";

        propertiesDescription.textContent =
            "Confira o imóvel que corresponde aos filtros selecionados.";

    } else {
        propertiesTitle.textContent =
            `${resultCount} imóveis encontrados`;

        propertiesDescription.textContent =
            "Confira os imóveis que correspondem aos filtros selecionados.";
    }
}

clearFiltersButton.addEventListener("click", () => {

    selectedPurpose = "venda";

    purposeButtons.forEach((button) => {
        button.classList.remove("active");
    });

    const buyButton = document.querySelector('.purpose-button[data-purpose="venda"]');

    buyButton.classList.add("active");

    document.getElementById("property-type").value = "";
    citySelect.value = "";

    updateNeighborhoods("");
    neighborhoodSelect.value = "";

    updatePriceRange();

    sortSelect.value = "default";

    propertiesTitle.textContent = "Imóveis em destaque";
    propertiesDescription.textContent = "Confira algumas das melhores oportunidades disponíveis.";
    currentProperties = featuredProperties;
    renderProperties(featuredProperties);
    clearFiltersButton.hidden = true;
    
});

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

        const card = createPropertyCard(property);

        container.appendChild(card);
    });
}

propertiesContainer.addEventListener("click", (event) => {

    const button = event.target.closest(".favorite-button");

    if (!button) {
        return;
    }

    const propertyId = Number(button.dataset.propertyId);

    const isFavorited = toggleFavorite(propertyId);

    button.classList.toggle("favorited", isFavorited);

    button.textContent = isFavorited ? "♥" : "♡";

});

priceInput.addEventListener("input", () => {

    updatePriceDisplay();
});

function updatePriceRange() {

    const priceConfig = getPriceConfig(selectedPurpose);

    priceInput.min = priceConfig.min;
    priceInput.max = priceConfig.max;
    priceInput.step = priceConfig.step;
    priceInput.value = priceConfig.value;

    updatePriceDisplay();
}

function updatePriceDisplay() {
    const currentPrice = Number(priceInput.value);

    priceValue.textContent = formatPrice(currentPrice, selectedPurpose);
}

initTheme();
initMenu();
updateNeighborhoods("");
renderProperties(featuredProperties);