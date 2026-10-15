import { initTheme } from "../modules/theme.js";
import { initMenu } from "../modules/menu.js";
import { properties } from "../data/properties.js";
import { createPropertyCard } from "../modules/propertyCard.js";
import { initFavoriteButtons } from "../modules/favorites.js";
import {
    paginateProperties,
    getTotalPages,
    renderPagination
} from "../modules/pagination.js";
import { 
    filterProperties,
    getCities,
    getNeighborhoods,
    getPriceConfig,
    sortProperties
 } from "../modules/filters.js";
 import { formatPrice } from "../modules/formatters.js";

const listingsGrid = document.querySelector("#listings-grid");
const paginationContainer = document.querySelector("#pagination");
const paginationPages = document.querySelector("#pagination-pages");
const previousPageButton = document.querySelector("#previous-page");
const nextPageButton = document.querySelector("#next-page");

const listingsFilterForm = document.querySelector("#listings-filter-form");
const purposeSelect = document.querySelector("#listing-purpose");
const typeSelect = document.querySelector("#listing-type");
const citySelect = document.querySelector("#listing-city");
const neighborhoodSelect = document.querySelector("#listing-neighborhood");

const priceInput = document.querySelector("#listing-price");
const priceValue = document.querySelector("#listing-price-value");

const clearFiltersButton = document.querySelector("#clear-listings-filters");

const sortSelect = document.querySelector("#listing-sort");

const cities = getCities(properties);

const defaultProperties = properties.filter(
    property => property.purpose === "venda"
);

const propertiesPerPage = 4;
let currentPage = 1;
let currentProperties = defaultProperties;
let filteredProperties = defaultProperties;

cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
})

function updateNeighborhoods(selectedCity) {

    const neighborhoods = getNeighborhoods(properties, selectedCity);

    neighborhoodSelect.innerHTML = `
        <option value="">Todos os bairros</option>
    `;

    neighborhoods.forEach((neighborhood) => {

        const option = document.createElement("option");

        option.value = neighborhood;

        option.textContent = neighborhood;

        neighborhoodSelect.appendChild(option);

    });

}

citySelect.addEventListener("change", () => {
    updateNeighborhoods(citySelect.value);
});

function renderListings() {

    if (currentProperties.length === 0) {

        listingsGrid.innerHTML = `
            <p class="no-results">
                Nenhum imóvel encontrado com os filtros selecionados.
            </p>
        `;

        return;
    }

    const paginatedProperties = paginateProperties(currentProperties, currentPage, propertiesPerPage);
    const cards = paginatedProperties.map(property => createPropertyCard(property));

    listingsGrid.replaceChildren(...cards);

}

function updatePriceDisplay() {

    const currentPrice = Number(priceInput.value);

    priceValue.textContent = formatPrice(currentPrice, purposeSelect.value);
}

function updatePriceRange() {

    const priceConfig = getPriceConfig(purposeSelect.value);

    priceInput.min = priceConfig.min;
    priceInput.max = priceConfig.max;
    priceInput.step = priceConfig.step;
    priceInput.value = priceConfig.value;

    updatePriceDisplay();
}

priceInput.addEventListener("input", () => {
    updatePriceDisplay();
});

purposeSelect.addEventListener("change", () => {
    updatePriceRange();
});

function handlePageChange(page) {

    currentPage = page;
    renderListings();
    updatePagination();

}

function updatePagination() {
    const totalPages = getTotalPages(
        currentProperties.length,
        propertiesPerPage
    );

    renderPagination(
        paginationContainer,
        paginationPages,
        previousPageButton,
        nextPageButton,
        currentPage,
        totalPages,
        handlePageChange
    );
}

nextPageButton.addEventListener("click", () => {

    const totalPages = getTotalPages(
        currentProperties.length,
        propertiesPerPage
    );

    if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
    }

});

previousPageButton.addEventListener("click", () => {

    if (currentPage > 1) {
        handlePageChange(currentPage - 1);
    }

});

listingsFilterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const filters = {

        purpose: purposeSelect.value,

        type: typeSelect.value,

        city:citySelect.value,

        neighborhood:neighborhoodSelect.value,

        price: Number(priceInput.value)

    };

    filteredProperties = filterProperties(properties,filters);
    currentProperties = sortProperties(filteredProperties, sortSelect.value);

    currentPage = 1;

    renderListings();
    updatePagination();
});

clearFiltersButton.addEventListener("click", () => {

    listingsFilterForm.reset();
    updateNeighborhoods("");
    updatePriceRange();

    filteredProperties = defaultProperties;
    currentProperties = defaultProperties;
    currentPage = 1;
    sortSelect.value = "default";

    renderListings();
    updatePagination();

});

sortSelect.addEventListener("change", () => {

    currentProperties = sortProperties(filteredProperties, sortSelect.value);
    handlePageChange(1);

});

initTheme();
initMenu();
updateNeighborhoods("");
updatePriceRange();
renderListings();
updatePagination();
initFavoriteButtons(listingsGrid);