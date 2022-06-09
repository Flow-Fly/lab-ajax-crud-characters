/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.getElementById("template");
const characterContainer = qs(".characters-container");
const baseUrl = "http://127.0.0.1:5005/api/characters";

document
  .getElementById("fetch-all")
  .addEventListener("click", async function (event) {
    characterContainer.innerHTML = null;
    const { data } = await axios.get(baseUrl);
    console.log(data);
    data.forEach((character) => {
      createTemplateAndAppend(character);
    });
  });

document
  .getElementById("fetch-one")
  .addEventListener("click", async function (event) {
    characterContainer.innerHTML = null;
    const name = qs("#character-name").value;
    const { data } = await axios.get(`${baseUrl}/${name}`);
    console.log(data);
    data.forEach((character) => {
      createTemplateAndAppend(character);
    });
  });

document
  .getElementById("delete-one")
  .addEventListener("click", async function (event) {
    try {
      const id = qs("#character-id-delete").value;
      const { data } = await axios.delete(`${baseUrl}/${id}`);
      // console.log(data);
      qs("#delete-one").classList.add("successful-button");
    } catch (error) {
      qs("#delete-one").classList.add("failed-button");
    }
  });

document
  .getElementById("edit-character-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      const id = qs("#update-id").value;
      const updatedName = qs("#update-name").value;
      const updatedOccupation = qs("#update-occupation").value;
      const updatedWeapon = qs("#update-weapon").value;
      const updatedCartoon = qs("#update-cartoon").checked;

      const updatedCharacter = {};

      if (updatedName) {
        updatedCharacter.name = updatedName;
      }

      if (updatedOccupation) {
        updatedCharacter.occupation = updatedOccupation;
      }

      if (updatedWeapon) {
        updatedCharacter.weapon = updatedWeapon;
      }

      if (updatedCartoon) {
        updatedCharacter.cartoon = updatedCartoon;
      }

      const updateCharacter = await axios.patch(
        `${baseUrl}/${id}`,
        updatedCharacter
      );

      console.log(updateCharacter.data);

      qs("#send-update-data").classList.remove("failed-button");
      qs("#send-update-data").classList.add("successful-button");
    } catch (error) {
      qs("#send-update-data").classList.remove("successful-button");
      qs("#send-update-data").classList.add("failed-button");
    }
  });

document
  .getElementById("new-character-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      const newCharacter = {
        name: qs("#create-name").value,
        occupation: qs("#create-occupation").value,
        weapon: qs("#create-weapon").value,
        cartoon: qs("#create-cartoon").checked,
      };

      const createdCharacter = await axios.post(baseUrl, newCharacter);

      console.log(createdCharacter.data);
      qs("#send-data").classList.remove("failed-button");
      qs("#send-data").classList.add("successful-button");
    } catch (error) {
      qs("#send-data").classList.remove("successful-button");
      qs("#send-data").classList.add("failed-button");
    }
  });

//Utility functions
function qs(selector, element = document) {
  return element.querySelector(selector);
}
function qsa(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}

function createTemplateAndAppend(char) {
  const clone = characterTemplate.content.cloneNode(true);
  qs(".character-id", clone).textContent = char._id;
  qs(".name", clone).textContent = char.name;
  qs(".occupation", clone).textContent = char.occupation;
  qs(".cartoon", clone).textContent = char.cartoon;
  qs(".weapon", clone).textContent = char.weapon;
  // qs(".cartoon", clone).addEventListener("click", editCat)
  // qs(".delete", clone).addEventListener("click", deleteCat)
  characterContainer.append(clone);
}
