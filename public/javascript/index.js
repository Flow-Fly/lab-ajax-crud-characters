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
  e.preventDefault();
  const editButton = document.getElementById("send-data-edit")
  editButton.classList.remove("inactive")
  let character = {
    name: nameEdit.value,
    occupation: occupationEdit.value,
    weapon: weaponEdit.value,
    cartoon: !!cartoonEdit.value,
  };
  const id = idEditInput.value;
  const { data } = await axios.patch(`${baseUrl}/${id}`, character);
  editButton.classList.add("active")

  if (!data){
    editButton.classList.add("inactive")
  }
}

async function newCharacter(e) {
  e.preventDefault();
  const character = {
    name: nameCreateInput.value,
    occupation: occupationInput.value,
    weapon: weaponInput.value,
    cartoon: !!cartoonInput.value,
  };
  const { data } = await axios.post(baseUrl, character);
  console.log(data);
}

async function deleteCharacter(e) {
  e.preventDefault();
  const deleteButton = document.getElementById("delete-one");
  const character = {
    id: idInput.value,
  };
  const { data } = await axios.delete(`${baseUrl}/${character.id}`);
  deleteButton.classList.add("active");
  if (!data) {
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
  qs(".character-id", clone).textContent = `Id: ${character._id}`;
  console.log(clone);
  qs(".name", clone).textContent = `Name: ${character.name}`;
  qs(".occupation", clone).textContent = `Occupation: ${character.occupation}`;
  qs(".cartoon", clone).textContent = `Is a cartoon?: ${character.cartoon}`;
  qs(".weapon", clone).textContent = `Weapon: ${character.weapon}`;
  characterContainer.append(clone);
}

function qs(selector, element = document) {
  return element.querySelector(selector);
}
function qsa(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}
