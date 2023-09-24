const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Obtén todos los elementos del menú de navegación
const navItems = $$('.navbarItem');

// Agrega un event listener a cada elemento del menú
navItems.forEach((navItem) => {
  navItem.addEventListener('click', (event) => {
    // Evita que se realice la acción predeterminada del enlace
    event.preventDefault();

    // Obtiene el valor del atributo data-section
    const sectionId = navItem.getAttribute('data-section');

    // Oculta todas las secciones
    const sections = $$('.section');
    sections.forEach((section) => {
      section.classList.add('hidden');
    });

    // Muestra la sección correspondiente
    const targetSection = $(`#${sectionId}`);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
  });
});
