export function paginateProperties(properties, page, itemsPerPage) {

    const startIndex = (page - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    return properties.slice(startIndex,endIndex);

}

export function getTotalPages(totalItems, itemsPerPage) {

    return Math.ceil(totalItems / itemsPerPage);

}