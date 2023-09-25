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

// Get a reference to the "Add Category" button
const addCategoryButton = $('#addCategoryButton');

// Add a click event to the "Add Category" button
addCategoryButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the category name from the input field
  const categoryName = $('#categoryInput').value;

  // Check if the category name is not empty
  if (categoryName.trim() !== '') {
    // Get a reference to the "Categories" container
    const categoriesContainer = $('#categories');

    // Create a new category row
    const newCategoryRow = document.createElement('div');
    newCategoryRow.classList.add('mb-3');

    // Add the HTML content for the category row
    newCategoryRow.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="tag is-primary is-light">${categoryName}</span>
        <div class="flex items-center space-x-2">
          <a href="#" class="mr-4 is-size-7 edit-link">Edit</a>
          <a href="#" class="is-size-7 delete-link">Delete</a>
        </div>
      </div>
    `;

    // Append the new category row to the "Categories" container
    categoriesContainer.appendChild(newCategoryRow);

    // Clear the input field
    $('#categoryInput').value = '';
  }
});

// Get a reference to the "Categories" container
const categoriesContainer = $('#categories');

// Add a click event listener for delete links and edit links
categoriesContainer.addEventListener('click', (event) => {
  const deleteLink = event.target.closest('.delete-link');
  const editLink = event.target.closest('.edit-link');

  if (deleteLink) {
    event.preventDefault();
    const categoryRow = deleteLink.closest('.mb-3');
    if (categoryRow) {
      categoryRow.remove();
    }
  } else if (editLink) {
    event.preventDefault();
    // Navigate to the "Edit Transaction" section
    hideAllSections();
    showSection('editCategoryView');
  }
});

// Add a click event to the "Edit Category" button in the edit category view
const editCategoryButton = $('#editCategoryButton');

editCategoryButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Get the edited category name from the input field
  const editedCategoryName = $('#editCategoryNameInput').value;

  // Get the currently selected category row
  const selectedCategoryRow = $('.selected-category');

  // Update the category name in the selected category row
  const categoryNameSpan = selectedCategoryRow.querySelector('.tag.is-primary.is-light');
  categoryNameSpan.textContent = editedCategoryName;

  // Switch back to the "Categories" view
  hideAllSections();
  showSection('categoriesView');
});

// Add a click event to the "Cancel" button in the edit category view
const cancelEditCategoryButton = $('#cancelEditCategoryButton');

cancelEditCategoryButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Switch back to the "Categories" view without making any changes
  hideAllSections();
  showSection('categoriesView');
});

// Add a click event to the "Edit" button in a category row
categoriesContainer.addEventListener('click', (event) => {
  const editLink = event.target.closest('.edit-link');

  if (editLink) {
    event.preventDefault();

    // Get the category name from the selected category row
    const selectedCategoryRow = editLink.closest('.mb-3');
    const categoryNameSpan = selectedCategoryRow.querySelector('.tag.is-primary.is-light');
    const categoryName = categoryNameSpan.textContent;

    // Populate the edit category input field with the current category name
    $('#editCategoryNameInput').value = categoryName;

    // Mark the selected category row for reference
    selectedCategoryRow.classList.add('selected-category');


  }
});
// Go to "editCategoryView" 
const editLinks = $$('#categoryView .edit-link');
editLinks.forEach((editLink) => {
  editLink.addEventListener('click', (event) => {
    event.preventDefault();

    // Hide all sections
    hideAllSections();

    // Show "editCategoryView"
    showSection('editCategoryView');
  });
});


// Function to  the "editCategoryNameInput" and show the "editCategoryView" section
function editCategory() {
  // Get the current category name from the <span> element
  const categorySpan = $('#categoryView .tag.is-primary.is-light');
  const currentCategoryName = categorySpan.textContent;

  // Set the current category name in the "editCategoryNameInput"
  $('#editCategoryNameInput').value = currentCategoryName;

  // Show the "editCategoryView" section
  showSection('editCategoryView');
}

// Function to cancel editing and return to "categoryView"
function cancelEditCategory() {
  showSection('categoryView');
}

// Function to update the category name and return to "categoryView"
function updateCategoryName() {
  // Get the edited category name from the input field
  const editedCategoryName = $('#editCategoryNameInput').value;

  // Find the span element within the "categoryView" section
  const categorySpan = $('#categoryView .tag.is-primary.is-light');

  // Update the content of the span with the edited category name
  categorySpan.textContent = editedCategoryName;

  // Show the "categoryView" section
  showSection('categoryView');
}

// Add a click event to the "Edit" link in "categoryView"
const editLink = $('#categoryView .edit-link');
editLink.addEventListener('click', (event) => {
  event.preventDefault();
  editCategory();
});

// Add a click event to the "Cancel" button in "editCategoryView"

cancelEditCategoryButton.addEventListener('click', (event) => {
  event.preventDefault();
  cancelEditCategory();
});

// Add a click event to the "Edit Category" button in "editCategoryView"

editCategoryButton.addEventListener('click', (event) => {
  event.preventDefault();
  updateCategoryName();
});