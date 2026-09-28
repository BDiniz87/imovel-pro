
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