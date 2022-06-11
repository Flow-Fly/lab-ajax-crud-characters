// const { create } = require("../../models/Character.model");

/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.getElementById("template");
const baseUrl = "http://localhost:5005/api/characters";

const characterContainer = qs(".characters-container");

const nameInput = qs("input[name=character-name]");
const idInput = qs("input[name=character-id-delete");

const createName = qs("#new-character-form .field input[name=name]");
const createOccupation = qs(
  "#new-character-form:nth-child(2) input[name=occupation]"
);

const createWeapon = qs(
  "#new-character-form > div:nth-child(3) > input:nth-child(2)"
);

const createCartoon = qs(
  "#new-character-form > div:nth-child(4) > input:nth-child(2)"
);

const editName = qs("#edit-character-form .field input[name=name]");
const editId = qs(
  "#edit-character-form  > div:nth-child(1) > input:nth-child(2)"
);
const editOccupation = qs(
  "#edit-character-form  > div:nth-child(3) > input:nth-child(2)"
);
const editWeapon = qs(
  "#edit-character-form  > div:nth-child(4) > input:nth-child(2)"
);
const editCartoon = qs(
  "#edit-character-form  > div:nth-child(5) > input:nth-child(2)"
);

// console.log(createCartoon);

const createSubmitButton = qs("#new-character-form #send-data");
const editSubmitButton = qs("#edit-character-form #send-data");

document.getElementById("fetch-all").addEventListener("click", getCharacters);

document.getElementById("fetch-one").addEventListener("click", getOneCharacter);

document
  .getElementById("delete-one")
  .addEventListener("click", deleteCharacter);

document
  .getElementById("edit-character-form")
  .addEventListener("submit", updateCharacter);

document
  .getElementById("new-character-form")
  .addEventListener("submit", createCharacter);

async function getCharacters(e) {
  characterContainer.innerHTML = "";
  e.preventDefault();
  const { data } = await axios.get(baseUrl);
  data.forEach((character) => {
    createTemplateAndAppend(character);
  });
}

async function getOneCharacter(e) {
  characterContainer.innerHTML = "";
  e.preventDefault();
  const character = {
    name: nameInput.value,
  };
  if (character.name === "") {
    errorMessage.textContent = "Please provide some values !";
    return;
  }
  const { data } = await axios.get(`${baseUrl}/${character.name}`);

  createTemplateAndAppend(data[0]);
}

async function createCharacter(e) {
  e.preventDefault();
  try {
    const character = {
      name: createName.value,
      occupation: createOccupation.value,
      weapon: createWeapon.value,
      cartoon: createCartoon.checked,
    };
    // console.log(character);
    const res = await axios.post(baseUrl, character);
    if (res.status === 201) {
      createSubmitButton.classList.remove("wrong");
      createSubmitButton.classList.add("active");
    } else {
      createSubmitButton.classList.remove("active");
      createSubmitButton.classList.add("wrong");
    }
  } catch (error) {
    createSubmitButton.classList.remove("active");
    createSubmitButton.classList.add("wrong");
  }
}

async function updateCharacter(e) {
  e.preventDefault();
  try {
    const character = {
      id: editId.value,
      name: editName.value,
      occupation: editOccupation.value,
      weapon: editWeapon.value,
      cartoon: editCartoon.checked,
    };
    // console.log(character);
    const res = await axios.patch(`${baseUrl}/${character.id}`, character);
    if (res.status === 200) {
      editSubmitButton.classList.remove("wrong");
      editSubmitButton.classList.add("active");
    } else {
      editSubmitButton.classList.remove("active");
      editSubmitButton.classList.add("wrong");
    }
  } catch (error) {
    editSubmitButton.classList.remove("active");
    editSubmitButton.classList.add("wrong");
  }
}

function createTemplateAndAppend(character) {
  const clone = characterTemplate.content.cloneNode(true);
  qs(".character-id", clone).textContent = character._id;
  qs(".name", clone).textContent = character.name;
  qs(".occupation", clone).textContent = character.occupation;
  qs(".cartoon", clone).textContent = character.cartoon;
  qs(".weapon", clone).textContent = character.weapon;
  characterContainer.append(clone);
}

async function deleteCharacter(e) {
  e.preventDefault();
  try {
    const character = { id: idInput.value };

    const res = await axios.delete(`${baseUrl}/${character.id}`);

    if (res.status === 204) {
      qs("#delete-one").classList.remove("wrong");
      qs("#delete-one").classList.add("active");
    } else {
      qs("#delete-one").classList.remove("active");
      qs("#delete-one").classList.add("wrong");
    }
  } catch (error) {
    qs("#delete-one").classList.remove("active");
    qs("#delete-one").classList.add("wrong");
  }
}
function qs(selector, element = document) {
  return element.querySelector(selector);
}
function qsa(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}
