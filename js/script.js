
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
    
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