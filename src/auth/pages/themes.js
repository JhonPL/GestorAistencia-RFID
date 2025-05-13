const themes = [
    {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#0F3460"
    },
    {
        background: "#461220",
        color: "#FFFFFF",
        primaryColor: "#E94560"
    },
    {
        background: "#192A51",
        color: "#FFFFFF",
        primaryColor: "#967AA1"
    },
    {
        background: "#F7B267",
        color: "#000000",
        primaryColor: "#F4845F"
    },
    {
        background: "#F25F5C",
        color: "#000000",
        primaryColor: "#642B36"
    },
    {
        background: "#231F20",
        color: "#FFF",
        primaryColor: "#BB4430"
    },
    {
        background: "#7FFFD4",        
        color: "#003333",             
        primaryColor: "#7fba27"
    }
];
let currentThemeIndex = 0;
let autoThemeInterval = null;

const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
};

const displayThemeButtons = (onThemeClick) => {
    const btnContainer = document.querySelector(".theme-btn-container");
    if (!btnContainer) return;
    btnContainer.innerHTML = ""; // Limpia antes de agregar
    themes.forEach((theme, idx) => {
        const div = document.createElement("div");
        div.className = "theme-btn";
        div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
        btnContainer.appendChild(div);
        div.addEventListener("click", () => {
            setTheme(theme);
            stopAutoTheme();
            if (onThemeClick) onThemeClick(idx);
        });
    });
};

function startAutoTheme(intervalMs = 5000) {
    stopAutoTheme();
    autoThemeInterval = setInterval(() => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        setTheme(themes[currentThemeIndex]);
    }, intervalMs);
}

function stopAutoTheme() {
    if (autoThemeInterval) {
        clearInterval(autoThemeInterval);
        autoThemeInterval = null;
    }
}

export { displayThemeButtons, startAutoTheme, stopAutoTheme, setTheme, themes };