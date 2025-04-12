// Initialize data from local storage
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Get the elements
const contactList = document.getElementById('contactList');
const modal = document.getElementById('modal');
const createContactButton = document.getElementById('createContactButton');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

// Save contacts to local storage
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts)); // Set key-value pairs and convert the array to a string because local storage only accepts strings
}

// Render contacts to the UI. This will be called every time the create, update, and/or delete a contact is executed
function renderContacts() {
    const contactCount = document.getElementById('contactCount');
    contactList.innerHTML = ''; // Clear the contact list before rendering

    // Update the contact count based on the saved pairs in local storage
    if (contacts.length === 0) {
        contactCount.textContent = "Belum ada kontak tersimpan";
    } else {
        contactCount.textContent = `${contacts.length} kontak tersimpan`;
    }

    // Loop through the contacts and create a card for each
    contacts.forEach((contact, index) => {
        contactList.innerHTML += `
            <div class="card">
                <div>
                <h3>${contact.name}</h3>
                <p class="info">
                    <i class="fa-solid fa-phone"></i>
                    ${contact.phone}
                </p>
                <p class="info">
                    <i class="fa-solid fa-envelope"></i>
                    ${contact.email ? contact.email : '-'}
                </p>
                </div>
                <div class="actions">
                    <button id="updateContact" onclick="updateContact(${index})">
                        <i class="fa-solid fa-pen"></i>Ubah
                    </button>
                    <button id="deleteContact" onclick="deleteContact(${index})">
                        <i class="fa-solid fa-trash"></i>Hapus
                    </button>
                </div>
            </div>
        `;
    });
}

// Show modal for creating or editing a contact
function showModal(edit = false, index = null) {
    modal.classList.remove('hidden');
    // If edit is true, allow to change the form with renewed data
    if (edit) {
        const c = contacts[index];
        document.getElementById('contactId').value = index; // Set the index of the contact being edited
        document.getElementById('name').value = c.name;
        document.getElementById('phone').value = c.phone;
        document.getElementById('email').value = c.email;
        document.getElementById('modalTitle').textContent = "Ubah Kontak"; // Change the title of the modal
    } else {
        contactForm.reset();
        document.getElementById('contactId').value = '';
        document.getElementById('modalTitle').textContent = "Tambah Kontak";
    }
}

// Hide modal
function hideModal() {
    modal.classList.add('hidden');
}

// Update contact will be called when the update button is clicked
function updateContact(index) {
    showModal(true, index); // Show the modal with the contact data to be edited
}

// Delete contact will be called when the delete button is clicked
function deleteContact(index) {
    // Confirm before deleting the contact. If the user clicks "OK", remove the contact from the array and update local storage
    if (confirm(`Hapus kontak ${contacts[index].name}?`)) {
        contacts.splice(index, 1); // Remove element from an array
        saveContacts();
        renderContacts();
    }
}

// Event listeners for form submission and button clicks. When the form is submitted, prevent the default action and save the contact
contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('contactId').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const newContact = { name, phone, email };

    // If id is not empty, it means this updating an existing contact based on the index. Otherwise, it means this is creating a new contact
    if (id) {
        contacts[id] = newContact;
    } else {
        contacts.push(newContact);
    }

    saveContacts();
    renderContacts();
    hideModal();
});

// Event listeners for the create contact button and close modal button
createContactButton.addEventListener('click', () => showModal());
closeModal.addEventListener('click', hideModal);

// Close the modal when pressing the Escape key
window.onkeydown = function (event) {
    if (event.key === "Escape") hideModal();
};

renderContacts();