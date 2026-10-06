export function filterProperties(properties, filters) {

    return properties.filter((property) => {

        const matchesPurpose = property.purpose === filters.purpose;
        const matchesType = filters.type === "" || property.type === filters.type;
        const matchesCity = filters.city === "" || property.city === filters.city;
        const matchesNeighborhood =
            filters.neighborhood === "" ||
            property.neighborhood === filters.neighborhood;
        const matchesPrice = property.price <= filters.price;

        return matchesPurpose &&
            matchesType &&
            matchesCity &&
            matchesNeighborhood &&
            matchesPrice;
    });
}

export function getNeighborhoods(properties, selectedCity) {

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

    return neighborhoods;

}

export function getCities(properties) {
    
    const cities = [
        ...new Set(
            properties.map((property) => {
                return property.city;
            })
        )
    ];

    return cities;

}

export function getPriceConfig(purpose) {

    if (purpose === "venda") {
        return{
            min: 100000,
            max:  3000000,
            step:  50000,
            value:3000000
        };
    } else {
        return{
            min: 500,
            max: 10000,
            step: 250,
            value: 10000
        };
    }

}

export function sortProperties(properties, sortType) {

    const sortedProperties = [...properties];

    if (sortType === "price-asc") {
        sortedProperties.sort((a,b) => a.price - b.price);
    } else if (sortType === "price-desc") {
        sortedProperties.sort((a,b) => b.price - a.price);
    }

    return sortedProperties;

}