// Traducciones centralizadas
const translations = {
    es: {
        faq: "FAQ",
        news: "Noticias",
        tournaments: "Torneos",
        winners: "Ganadores",
        discord: "Discord",
        staff: "Staff",
        admin: "Admin",
        options: "Opciones",
        join: "Únete a Nuestra Comunidad",
        description: "Selecciona tu idioma preferido.",
        footer: "&copy; 2024 Croissant Tours. Todos los derechos reservados."
    },
    en: {
        faq: "FAQ",
        news: "News",
        tournaments: "Tournaments",
        winners: "Winners",
        discord: "Discord",
        staff: "Staff",
        admin: "Admin",
        options: "Options",
        join: "Join Our Community",
        description: "Select your preferred language.",
        footer: "&copy; 2024 Croissant Tours. All rights reserved."
    }
};

// Guardar idioma en localStorage
function changeLanguage(language) {
    localStorage.setItem("language", language);
    applyLanguage(language);
}

// Aplicar traducción a los elementos
function applyLanguage(language) {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

// Detectar idioma al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("language") || "es"; // Idioma por defecto: español
    applyLanguage(savedLanguage);
});
