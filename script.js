let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
const contactList = document.getElementById('contactList');
const modal = document.getElementById('modal');
const createContactButton = document.getElementById('createContactButton');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
    const contactCount = document.getElementById('contactCount');
    contactList.innerHTML = '';

    if (contacts.length === 0) {
        contactCount.textContent = "Belum ada kontak tersimpan";
    } else {
        contactCount.textContent = `${contacts.length} kontak tersimpan`;
    }

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
                    <button class="updateContact" onclick="updateContact(${index})">
                        <i class="fa-solid fa-pen"></i>Ubah
                    </button>
                    <button class="deleteContact" onclick="deleteContact(${index})">
                        <i class="fa-solid fa-trash"></i>Hapus
                    </button>
                </div>
            </div>
        `;
    });
}

function showModal(edit = false, index = null) {
    modal.classList.remove('hidden');
    if (edit) {
        const c = contacts[index];
        document.getElementById('contactId').value = index;
        document.getElementById('name').value = c.name;
        document.getElementById('phone').value = c.phone;
        document.getElementById('email').value = c.email;
        document.getElementById('modalTitle').textContent = "Ubah Kontak";
    } else {
        contactForm.reset();
        document.getElementById('contactId').value = '';
        document.getElementById('modalTitle').textContent = "Tambah Kontak";
    }
}

function hideModal() {
    modal.classList.add('hidden');
}

function updateContact(index) {
    showModal(true, index);
}

function deleteContact(index) {
    if (confirm(`Hapus kontak ${contacts[index].name}?`)) {
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
    }
}

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('contactId').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const newContact = { name, phone, email };

    if (id) {
        contacts[id] = newContact;
    } else {
        contacts.push(newContact);
    }

    saveContacts();
    renderContacts();
    hideModal();
});

createContactButton.addEventListener('click', () => showModal());
closeModal.addEventListener('click', hideModal);

window.onclick = function (event) {
    if (event.target == modal) hideModal();
};

renderContacts();