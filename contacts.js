const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = "./db/contacts.json";

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log("Error:", error.message);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const array = JSON.parse(data);
    const searchedContact = array.filter(
      (contact) => contact.id === contactId,
    )[0];
    return searchedContact;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    const dataToAdd = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, dataToAdd);
    return newContacts;
  } catch (error) {
    console.log("Error:", error.message);
    return [];
  }
};

const addContact = async (name, email, phone) => {
  const newContact = { id: uuidv4(), name, email, phone };

  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = [...contacts, newContact];
    const dataToAdd = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, dataToAdd);
    return newContacts;
  } catch (error) {
    console.log("Error:", error.message);
    return [];
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
