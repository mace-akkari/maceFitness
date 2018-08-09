async function getContacts() {
  const response = await fetch('/api/contacts');
  const contacts = await response.json();
  return contacts;
}

function renderContactList(target, contacts) {
  const list = document.querySelector(target);
  contacts.forEach((contact) => {
    const item = document.createElement('LI');
    item.textContent = contact.name + ' ' + contact.surname;
    list.appendChild(item);
  });
}

function renderContactListExperimental(target, contacts) {
  const list = document.querySelector(target);
  const fragment = document.createDocumentFragment();
  contacts.forEach((contact) => {
    const item = document.createElement('LI');
    item.textContent = contact.name + ' ' + contact.surname;
    fragment.appendChild(item);
  });
  list.appendChild(fragment);
}

function renderSillyElement() {
  const parent = document.querySelector('.wrapper');
  const reference = document.querySelector('.contacts');
  const silly = document.createElement('h3');
  silly.textContent = 'Silly Element';
  parent.insertBefore(silly, reference);
}

getContacts().then((contacts) => {
  renderContactListExperimental('.contacts', contacts);
});
renderSillyElement()
