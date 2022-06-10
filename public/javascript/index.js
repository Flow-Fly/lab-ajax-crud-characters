/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.getElementById("template");
const characterContainer = qs(".characters-container");

const APIHandler = axios.create({
  baseURL: "http://localhost:5005/api/characters",
});

// We are centralizing all of the logic to communicate with the backend in an object called APIHandler
// This object is an instance of axios with a baseUrl already inside
// And we are enriching it with other methods besides get, post, delete, etc
// like for example getFullList
// const APIHandler = {...axiosInstance}
APIHandler.getFullList = async function () {
  try {
    const { data } = await this.get();
    return data;
  } catch (error) {
    console.error(error);
  }
};

function createCard(char) {
  const card = characterTemplate.content.cloneNode(true);
  qs(".character-id span", card).textContent = char._id;
  qs(".name span", card).textContent = char.name;
  qs(".occupation span", card).textContent = char.occupation;
  qs(".weapon span", card).textContent = char.weapon;
  qs(".cartoon span", card).textContent = char.cartoon;
  return card;
}

document
  .getElementById("fetch-all")
  .addEventListener("click", async function (event) {
    const allCharacters = await APIHandler.getFullList();
    allCharacters.forEach((character) => {
      const card = createCard(character);
      characterContainer.appendChild(card);
    });
  });

document
  .getElementById("fetch-one")
  .addEventListener("click", function (event) {});

document
  .getElementById("delete-one")
  .addEventListener("click", function (event) {});

document
  .getElementById("edit-character-form")
  .addEventListener("submit", function (event) {});

document
  .getElementById("new-character-form")
  .addEventListener("submit", function (event) {});
