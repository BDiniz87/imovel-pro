export function paginateProperties(properties, page, itemsPerPage) {

    const startIndex = (page - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    return properties.slice(startIndex,endIndex);

}

export function getTotalPages(totalItems, itemsPerPage) {

    return Math.ceil(totalItems / itemsPerPage);

}

export function renderPagination(
    container,
    pagesContainer,
    previousButton,
    nextButton,
    currentPage,
    totalPages,
    onPageChange
) {

    container.hidden = totalPages <= 1;
    previousButton.disabled = currentPage <= 1; 
    nextButton.disabled = currentPage >= totalPages;

    pagesContainer.replaceChildren();

    
    for (let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement('button');

        pageButton.type = "button";
        pageButton.textContent = page;
        pageButton.classList.add("pagination-button");
        if(page === currentPage) {
            pageButton.classList.add('active');
            pageButton.setAttribute("aria-current", "page");
        }
        pageButton.addEventListener("click", () => {
            onPageChange(page);
        });
        pagesContainer.appendChild(pageButton);
    }

}