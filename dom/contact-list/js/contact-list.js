const contacts = JSON.parse(loadContacts());

const contactsList = document.querySelector('.contacts-list');

const contactsArray = [];

contacts.forEach(contact => {
  contactsArray.push(`<li data-email="${contact.email}" data-phone="${contact.phone}"><strong>${contact.name}</strong></li>`);
});

contactsList.innerHTML = contactsArray.join('');