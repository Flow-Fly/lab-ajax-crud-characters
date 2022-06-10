/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const baseUrl = "http://localhost:5005/api/characters/";

// All DOM manipulation
const characterTemplate = document.getElementById("template");
const charactersContainer = document.querySelector(".characters-container");
const nameToFetch = document.querySelector('[name="character-name"]');
const idToDelete = document.querySelector('[name="character-id-delete"]');

//DOM for create form
const creationForm = document.getElementById("new-character-form");
const nameToCreate = creationForm.querySelector('[name="name"]');
const occupationToCreate = creationForm.querySelector('[name="occupation"]');
const weaponToCreate = creationForm.querySelector('[name="weapon"]');
const cartoonToCreate = creationForm.querySelector('[name="cartoon"]');

// DOM for edit form
const editForm = document.getElementById("edit-character-form");
const idToEdit = editForm.querySelector('[name="chr-id"]');
const nameToEdit = editForm.querySelector('[name="name"]');
const occupationToEdit = editForm.querySelector('[name="occupation"]');
const weaponToEdit = editForm.querySelector('[name="weapon"]');
const cartoonToEdit = editForm.querySelector('[name="cartoon"]');

// Buttons
const deleteButton = document.querySelector("#delete-one");
const createButton = creationForm.querySelector("#send-data");
const editButton = editForm.querySelector("#send-data");

// Event listener
document
  .getElementById("fetch-all")
  .addEventListener("click", displayAllCharacter);

document
  .getElementById("fetch-one")
  .addEventListener("click", displayOneCharacter);

document
  .getElementById("delete-one")
  .addEventListener("click", deleteOneCharacter);

document
  .getElementById("edit-character-form")
  .addEventListener("submit", editCharacter);

document
  .getElementById("new-character-form")
  .addEventListener("submit", createCharacter);

// All Functions

// Display all characters
async function displayAllCharacter() {
  charactersContainer.innerHTML = null;
  const allCharacters = await getAllCharacters();
  allCharacters.forEach((character) => {
    const clone = characterTemplate.content.cloneNode(true);
    clone.querySelector(".character-id").textContent = character._id;
    clone.querySelector(".name").textContent = character.name;
    clone.querySelector(".occupation").textContent = character.occupation;
    clone.querySelector(".cartoon").textContent = character.cartoon;
    clone.querySelector(".weapon").textContent = character.weapon;
    charactersContainer.appendChild(clone);
  });
}

async function getAllCharacters() {
  const { data } = await axios.get(baseUrl);
  return data;
}

// Display one character
async function displayOneCharacter() {
  charactersContainer.innerHTML = null;
  const name = nameToFetch.value;
  const myCharacter = await getOneCharacter(name);
  console.log("myCharacter", myCharacter);

  const clone = characterTemplate.content.cloneNode(true);
  clone.querySelector(".character-id").textContent = myCharacter._id;
  clone.querySelector(".name").textContent = myCharacter.name;
  clone.querySelector(".occupation").textContent = myCharacter.occupation;
  clone.querySelector(".cartoon").textContent = myCharacter.cartoon;
  clone.querySelector(".weapon").textContent = myCharacter.weapon;
  charactersContainer.appendChild(clone);
}

async function getOneCharacter(name) {
  if (!name) {
    return;
  }
  const { data } = await axios.get(`${baseUrl}/${name}`);
  return data[0];
}

// Delete one character
async function deleteOneCharacter() {
  try {
    const id = idToDelete.value;
    await axios.delete(`${baseUrl}/${id}`);
    deleteButton.style.backgroundColor = "green";
    displayAllCharacter();
  } catch (error) {
    console.error(error);
    deleteButton.style.backgroundColor = "red";
  }
}

// Create new character
async function createCharacter(event) {
  event.preventDefault();
  try {
    const name = nameToCreate.value;
    const occupation = occupationToCreate.value;
    const weapon = weaponToCreate.value;
    let cartoon = false;
    cartoonToCreate.checked ? (cartoon = true) : (cartoon = false);
    await axios.post(baseUrl, {
      name,
      occupation,
      cartoon,
      weapon,
    });
    createButton.style.backgroundColor = "green";
    displayAllCharacter();
  } catch (error) {
    createButton.style.backgroundColor = "red";
    console.error(error);
  }
}

// Update new character
async function editCharacter(event) {
  event.preventDefault();
  try {
    const id = idToEdit.value;
    const name = nameToEdit.value;
    const occupation = occupationToEdit.value;
    const weapon = weaponToEdit.value;
    let cartoon = false;
    cartoonToEdit.checked ? (cartoon = true) : (cartoon = false);
    await axios.patch(`${baseUrl}/${id}`, {
      name,
      occupation,
      cartoon,
      weapon,
    });
    editButton.style.backgroundColor = "green";
    displayAllCharacter();
  } catch (error) {
    editButton.style.backgroundColor = "red";
    console.error(error);
  }
}
