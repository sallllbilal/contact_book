const contactList = document.getElementById("contact-list");
const addContactBtn = document.getElementById("add-contact");
const modal = document.getElementById("modal");
const closeModalBtn = document.querySelector(".close");
const saveContactBtn = document.getElementById("save-contact");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const imageInput = document.getElementById("image");

let contacts = [];

addContactBtn.addEventListener("click", () => {
  openModal();
});

closeModalBtn.addEventListener("click", () => {
  closeModal();
});

saveContactBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const phone = phoneInput.value;
  const image = imageInput.value;

  if (name && phone && image) {
    if (editingIndex !== -1) {
      // Editing existing contact
      contacts[editingIndex] = { name, phone, image };
      editingIndex = -1;
    } else {
      // Adding new contact
      contacts.push({ name, phone, image });
    }

    updateContactList();
    closeModal();
    clearInputs();
  }
});

let editingIndex = -1;

function openModal(index = -1) {
  if (index !== -1) {
    editingIndex = index;
    const contact = contacts[index];
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    imageInput.value = contact.image;
  } else {
    clearInputs();
  }

  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  editingIndex = -1;
}

function clearInputs() {
  nameInput.value = "";
  phoneInput.value = "";
  imageInput.value = "";
}

function updateContactList() {
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <div>
                <img src="${contact.image}" alt="${contact.name}" class="contact-image">
            </div>
            <div>
                <h3>${contact.name}</h3>
                <p>${contact.phone}</p>
            </div>
            <div class="actions">
                <button class="edit" onclick="openModal(${index})">Edit</button>
                <button class="delete" onclick="deleteContact(${index})">Delete</button>
            </div>
        `;
    contactList.appendChild(li);
  });
}

function deleteContact(index) {
  contacts.splice(index, 1);
  updateContactList();
}

updateContactList();
