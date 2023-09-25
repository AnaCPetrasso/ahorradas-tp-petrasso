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


// Get a reference to the "Add Operation" button
const addOperationButton = $('#addOperationButton');

// Add a click event to the "Add Operation" button
addOperationButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Get values from the form fields
  const description = $('#descriptionInput').value;
  const amount = parseFloat($('#amountInput').value); // Convert the value to a number
  const operationType = $('#operationType').value;
  const category = $('#categorySelect').value;
  const date = $('#dateInput').value;

  // Get a reference to the operations table
  const operationsTable = $('#operationsTable');

  // Create a new row in the table
  const newRow = document.createElement('tr');

  // Apply red color style if it's an expense operation
  const amountCell = document.createElement('td');
  if (operationType === 'EXPENSE') {
    amountCell.textContent = `-$${Math.abs(amount)}`; // Add a minus sign and use absolute value
    amountCell.classList.add('text-red-600'); // Apply red color style
  } else {
    amountCell.textContent = `+$${amount}`;
    amountCell.classList.add('text-green-600'); // Apply green color style for income
  }

  // Add cells with field values
  newRow.innerHTML = `
    <td>${description}</td>
    <td>${category}</td>
    <td>${date}</td>
  `;

  // Add the amount cell to the row
  newRow.appendChild(amountCell);

  // Add actions cell (buttons) to the row
  const actionsCell = document.createElement('td');
  actionsCell.innerHTML = `
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>
  `;
  newRow.appendChild(actionsCell);

  // Add the new row to the table
  operationsTable.appendChild(newRow);

  // Hide the "No results" message (id="noOperations")
  const noOperations = $('#noOperations');
  noOperations.classList.add('hidden');

  // Show the operations table (id="withOperations")
  const withOperations = $('#withOperations');
  withOperations.classList.remove('hidden');

  // Reset the form fields
  $('#descriptionInput').value = '';
  $('#amountInput').value = '0';
  $('#operationType').value = 'EXPENSE';
  $('#categorySelect').value = 'services';
  $('#dateInput').value = '';

  // Switch to the "Balance" section
  hideAllSections(); // Hide all sections
  showSection('balanceView'); // Show the "Balance" section
});
