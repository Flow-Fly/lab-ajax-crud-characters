/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.getElementById("template");
const baseUrl = "http://localhost:5005/api/characters";

const characterContainer = qs(".characters-container");

const nameInput = qs("input[name=character-name]");

const idInput = qs("input[name=character-id-delete");

document.getElementById("fetch-all").addEventListener("click", getCharacters);

document.getElementById("fetch-one").addEventListener("click", getOneCharacter);

document
  .getElementById("delete-one")
  .addEventListener("click", deleteCharacter);

document
  .getElementById("edit-character-form")
  .addEventListener("submit", function (event) {});

document
  .getElementById("new-character-form")
  .addEventListener("submit", function (event) {});

async function getCharacters(e) {
  characterContainer.innerHTML = "";
  e.preventDefault();
  const { data } = await axios.get(baseUrl);
  data.forEach((character) => {
    createTemplateAndAppend(character);
  });
}

async function getOneCharacter(e) {
  e.preventDefault();
  const character = {
    name: nameInput.value,
  };
  if (character.name === "") {
    errorMessage.textContent = "Please provide some values !";
    return;
  }
  const { data } = await axios.get(`${baseUrl}/${character.name}`);
  console.log(data);

  createTemplateAndAppend(data[0]);
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
    console.log(res.status);

    if (res.status === 204) {
      qs("#delete-one").classList.remove("wrong");
      qs("#delete-one").classList.add("active");
      console.log(`deleted`);
    } else {
      qs("#delete-one").classList.remove("active");
      qs("#delete-one").classList.add("wrong");
      console.log(`wrong`);
    }
  } catch (error) {
    qs("#delete-one").classList.add("wrong");
  }
}
function qs(selector, element = document) {
  return element.querySelector(selector);
}
function qsa(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}
