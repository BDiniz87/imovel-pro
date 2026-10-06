export function initMenu() {

    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("open");

        const menuIsOpen = nav.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            menuIsOpen
        );

    });

}