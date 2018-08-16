
async function getContacts() {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();
    return contacts;
  }

  function renderContactList(target, contacts) {
    const list = document.querySelector(target);
    const fragment = document.createDocumentFragment();
    contacts.forEach((contact) => {
      const item = document.createElement('LI');
      item.textContent = contact.name + ' ' + contact.surname;
      fragment.appendChild(item);
    });
    list.appendChild(fragment);
  }

  getContacts().then((contacts) => {
    renderContactList('.contacts', contacts);
  });
  