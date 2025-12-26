/* ===========================
LIGHT/DARK TOGGLE + LOGO 
=========================== */

const themeToggle = document.getElementById("theme-toggle");
const logo = document.getElementById("site-logo");

const LOGO_LIGHT = "assets/images/bean_boutique_light_transparent.svg";
const LOGO_DARK = "assets/images/bean_boutique_dark_transparent.svg";

// Automatic Dark Theme if system default is dark
const systemPrefersDark = window.matchMedia(
	"(prefers-color-scheme: dark)"
).matches;

function applyTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);

	// Toggle icon
	themeToggle.className =
		theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";

	// Toggle logo
	if (logo) {
		logo.src = theme === "dark" ? LOGO_DARK : LOGO_LIGHT;
	}
}

// Initial theme
const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

// Toggle handler
themeToggle.addEventListener("click", () => {
	const current = document.documentElement.getAttribute("data-theme");
	applyTheme(current === "dark" ? "light" : "dark");
});
