const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Function to hide all sections
function hideAllSections() {
  const sections = $$('.section');
  sections.forEach((section) => {
    section.classList.add('hidden');
  });
}

// Function to show a section by its ID
function showSection(sectionId) {
  const targetSection = $(`#${sectionId}`);
  if (targetSection) {
    targetSection.classList.remove('hidden');
  }
}

// Function to toggle text and visibility of filters
function toggleFilters() {
  const filters = $('#filters');
  const toggleFiltersButton = $('#toggleFilters');

  if (filters.style.display === 'block') {
    filters.style.display = 'none';
    toggleFiltersButton.textContent = 'Show filters';
  } else {
    filters.style.display = 'block';
    toggleFiltersButton.textContent = 'Hide filters';
  }
}

// Get all navigation menu items
const navItems = $$('.navbarItem');

// Add an event listener to each menu item
navItems.forEach((navItem) => {
  navItem.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = navItem.getAttribute('data-section');

    // Hide all sections and show the corresponding section
    hideAllSections();
    showSection(sectionId);
  });
});

// Get the "New Operation" button
const newOperationButton = $('#newOperation');

// Add an event listener to the button
newOperationButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Hide all sections and show the "New Operation" section
  hideAllSections();
  showSection('operationView');
});

const cancelButton = $('#cancelAddOperationButton');

// Find the "balanceView" section
const balanceViewSection = $('#balanceView');

// Add a click event to the button to switch sections
cancelButton.addEventListener('click', () => {
  // Hide all sections (if needed)
  hideAllSections();

  // Show the "balanceView" section
  showSection('balanceView');
});

// Get a reference to the "toggleFilters" button by its ID
const toggleFiltersButton = $('#toggleFilters');

// Add an event listener to the "toggleFilters" button
toggleFiltersButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Toggle the visibility of filters
  toggleFilters();
});

