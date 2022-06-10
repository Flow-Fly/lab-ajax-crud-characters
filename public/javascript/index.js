/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const baseUrl = "http://localhost:5005/api/characters";
const characterTemplate = document.getElementById("template");
const characterContainer = qs(".characters-container");
const nameInput = qs("input[name=character-name]");
const nameCreateInput = qs("input[name=name]");
const idInput = qs("input[name=character-id-delete]");
const occupationInput = qs("input[name=occupation]");
const weaponInput = qs("input[name=weapon]");
const cartoonInput = qs("input[name=cartoon]");
const idEditInput = qs("input[name=chr-id]");
const occupationEdit = qs("input[name=occupation-edit]");
const weaponEdit = qs("input[name=weapon-edit]");
const cartoonEdit = qs("input[name=cartoon-edit]");
const nameEdit = qs("input[name=name-edit]");

document.getElementById("fetch-all").addEventListener("click", getCharacters);

document.getElementById("fetch-one").addEventListener("click", getCharacter);

document
  .getElementById("delete-one")
  .addEventListener("click", deleteCharacter);

document
  .getElementById("edit-character-form")
  .addEventListener("submit", editCharacter);

document
  .getElementById("new-character-form")
  .addEventListener("submit", newCharacter);

async function getCharacters() {
  characterContainer.innerHTML = "";
  const { data } = await axios.get(baseUrl);
  data.forEach((character) => {
    // console.log(character._id);
    createTemplateAndAppend(character);
  });
}

async function editCharacter(e) {
  try {
    e.preventDefault();
    const editButton = document.getElementById("send-data-edit");
    editButton.classList.remove("inactive");
    const idEditInput = qs("input[name=chr-id]").value;
    const occupationEdit = qs("input[name=occupation-edit]").value;
    const weaponEdit = qs("input[name=weapon-edit]").value;
    const cartoonEdit = qs("input[name=cartoon-edit]").checked;
    const nameEdit = qs("input[name=name-edit]").value;

    let newCharacter = {};

    if (nameEdit) {
      newCharacter.name = nameEdit;
    }
    if (occupationEdit) {
      newCharacter.occupation = occupationEdit;
    }
    if (weaponEdit) {
      newCharacter.weapon = weaponEdit;
    }
    if (cartoonEdit) {
      newCharacter.cartoon = cartoonEdit;
    }
    console.log(newCharacter);

    const { data } = await axios.patch(
      `${baseUrl}/${idEditInput}`,
      newCharacter
    );
    editButton.classList.add("active");
  } catch (err) {
    editButton.classList.add("inactive");
  }
}

async function newCharacter(e) {
  e.preventDefault();
  const character = {
    name: nameCreateInput.value,
    occupation: occupationInput.value,
    weapon: weaponInput.value,
    cartoon: cartoonInput.checked,
  };
  const { data } = await axios.post(baseUrl, character);
  console.log(data);
}

async function deleteCharacter(e) {
  try {
    e.preventDefault();
    const deleteButton = document.getElementById("delete-one");
    const character = {
      id: idInput.value,
    };
    const { data } = await axios.delete(`${baseUrl}/${character.id}`);
    deleteButton.classList.add("active");
  } catch (err) {
    deleteButton.classList.add("inactive");
  }
}

async function getCharacter(e) {
  e.preventDefault();
  characterContainer.innerHTML = "";
  const character = {
    name: nameInput.value,
  };
  const { data } = await axios.get(`${baseUrl}/${character.name}`);
  createTemplateAndAppend(data[0]);
}

function createTemplateAndAppend(character) {
  const clone = characterTemplate.content.cloneNode(true);
  qs(".character-id span", clone).textContent = character._id;
  console.log(clone);
  qs(".name span", clone).textContent = character.name;
  qs(".occupation span", clone).textContent = character.occupation;
  qs(".cartoon span", clone).textContent = character.cartoon;
  qs(".weapon span", clone).textContent = character.weapon;
  characterContainer.append(clone);
}

function qs(selector, element = document) {
  return element.querySelector(selector);
}
function qsa(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}
