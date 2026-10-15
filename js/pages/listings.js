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

const listingsGrid = document.querySelector("#listings-grid");
const paginationContainer = document.querySelector("#pagination");
const paginationPages = document.querySelector("#pagination-pages");
const previousPageButton = document.querySelector("#previous-page");
const nextPageButton = document.querySelector("#next-page");

const propertiesPerPage = 4;
let currentPage = 1;
let currentProperties = properties;

function renderListings() {

    const paginatedProperties = paginateProperties(currentProperties, currentPage, propertiesPerPage);
    const cards = paginatedProperties.map(property => createPropertyCard(property));
    
    listingsGrid.replaceChildren(...cards);

}

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

initTheme();
initMenu();
renderListings();
updatePagination();
initFavoriteButtons(listingsGrid);