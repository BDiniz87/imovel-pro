export function initTheme() {

    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

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

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            const savedTheme = localStorage.getItem("theme");
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

            const isDark = savedTheme === "dark" ||
                (savedTheme === null && systemPrefersDark);

            if (isDark) {
                document.documentElement.setAttribute("data-theme", "dark");
            } else {
                document.documentElement.removeAttribute("data-theme");
            }

            themeToggle.textContent = isDark ? "☀️" : "🌙";
        }
    });

}