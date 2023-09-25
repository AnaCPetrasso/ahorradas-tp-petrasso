const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Obtener todos los elementos del menú de navegación
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

// Obtener el botón "New Operation"
const newOperationButton = $('#newOperation');

// Agrega un event listener al botón
newOperationButton.addEventListener('click', (event) => {
  // Evita que se realice la acción predeterminada del botón
  event.preventDefault();

  // Oculta todas las secciones
  const sections = $$('.section');
  sections.forEach((section) => {
    section.classList.add('hidden');
  });

  // Muestra la sección "New Operation"
  const newOperationSection = $('#operationView');
  if (newOperationSection) {
    newOperationSection.classList.remove('hidden');
  }
});

const cancelButton = $('#cancelAddOperationButton');

// Encontrar la sección "balanceView"
const balanceViewSection = $('#balanceView');

// Agregar un evento de clic al botón para cambiar de sección
cancelButton.addEventListener('click', () => {
  // Ocultar todas las secciones (si es necesario)
  const sections = $$('.section');
  sections.forEach((section) => {
    section.classList.add('hidden');
  });

  // Mostrar la sección "balanceView"
  balanceViewSection.classList.remove('hidden');
});
// Obtener una referencia al botón "toggleFilters" por su ID
const toggleFiltersButton = $('#toggleFilters');

// Obtener una referencia a los filtros por su ID
const filters = $('#filters');

// Agrega un event listener al botón "toggleFilters"
toggleFiltersButton.addEventListener('click', (event) => {
  // Evita que se realice la acción predeterminada del enlace
  event.preventDefault();

  // Cambia la visibilidad de los filtros
  if (filters.style.display === 'block') {
    filters.style.display = 'none';
    toggleFiltersButton.textContent = 'Show filters'; // Cambia el texto del botón
  } else {
    filters.style.display = 'block';
    toggleFiltersButton.textContent = 'Hide filters'; // Cambia el texto del botón
  }
});

