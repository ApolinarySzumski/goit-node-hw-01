const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = "./db/contacts.json";

const listContacts = () => {
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .catch((error) => console.log(error.message));
};

const getContactById = (contactId) => {
  let contact = null;
  fs.readFile(contactsPath)
    .then((data) => {
      contact = JSON.parse(data).filter((contact) => contact.id === contactId);
      console.log(contact);
    })
    .catch((error) => console.log(error));
};

const removeContact = (contactId) => {
  let newContactsList = null;
  fs.readFile("contacts.json")
    .then((data) => {
      newContactsList = data.filter((contact) => contact.id !== contactId);
      //   return newContactsList;
    })
    .catch((error) => console.log(error.message));
  fs.writeFile("contacts.json", newContactsList)
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
};

const addContact = async (name, email, phone) => {
  const newContact = { name, email, phone };

  try {
    // Read the JSON file
    const data = await fs.readFile(contactsPath);

    // Parse the data (change type of data from JSON into object)
    // JSON is format to store data, but we need type of data which JavaScript understand in this case array of objects
    const array = JSON.parse(data);

    // add newContact to array
    const newArray = [...array, newContact];

    // change newArray into JSON format
    const dataToAdd = JSON.stringify(newArray);

    // overwrite contacts.json file
    await fs.writeFile(contactsPath, dataToAdd);
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
