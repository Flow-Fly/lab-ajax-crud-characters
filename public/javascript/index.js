/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.getElementById('template'),
  charsContainer = qs(`.characters-container`),
  operationsEl = qs(`.operations`);

const apiHandler = axios.create({
  baseURL: `http://localhost:5005/api/characters`
});
apiHandler.getAllChars = async function() {
  try {
    const { data } = await this.get();

    charsContainer.innerHTML = null;
    data.forEach(char => {
      appendChar(char, charsContainer);
    });
  } catch (error) {
    console.error(error);
  }
}

document.getElementById('fetch-all').addEventListener('click', function (event) {
  apiHandler.getAllChars();
});

document.getElementById('fetch-one').addEventListener('click', async function (event) {
  try {
    const fetchOneInput = qs(`.operation > [name='character-name']`, operationsEl),
      fetchName = fetchOneInput.value;

    fetchOneInput.value = null;
    if (!fetchName.length) {
      return;
    }

    const { data } = await apiHandler.get(`/${fetchName}`);
    charsContainer.innerHTML = null;

    if (data.length) {
      appendChar(data[0], charsContainer);
      return;
    }

    const nothingReturnedMsg = document.createElement(`p`);
    nothingReturnedMsg.textContent = `No such character by the name: ${fetchName}!`;
    charsContainer.appendChild(nothingReturnedMsg);
  } catch (error) {
    console.error(error);
  }
});

document.getElementById('delete-one').addEventListener('click', async function (event) {
  try {
    const deleteOneInput = qs(`.operation > [name='character-id-delete']`, operationsEl),
      deleteId = deleteOneInput.value;

    if (!deleteId.length) {
      return;
    }

    const response = await apiHandler.delete(`/${deleteId}`);
    changeBtnColor(qs(`#delete-one`), `green`);
    deleteOneInput.value = null;
    apiHandler.getAllChars();
  } catch (error) {
    changeBtnColor(qs(`#delete-one`), `red`);
    console.error(error);
  }
});

document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
  try {
    event.preventDefault();

    const editCharFormEl = qs(`#edit-character-form`),
      charId = qs(`[name='chr-id']`, editCharFormEl),
      charName = qs(`[name='name']`, editCharFormEl),
      charOccupation = qs(`[name='occupation']`, editCharFormEl),
      charWeapon = qs(`[name='weapon']`, editCharFormEl),
      charIsCartoon = qs(`[name='cartoon']`, editCharFormEl),
      character = {
        name: charName.value,
        occupation: charOccupation.value,
        weapon: charWeapon.value,
        cartoon: charIsCartoon.checked
      };

    for (let key in character) {
      if (typeof character[key] === `string` && !character[key].length) {
        delete character[key];
      }
    }

    if (!Object.keys(character).length) {
      return;
    }

    const { data } = await apiHandler.patch(`/${charId.value}`, character);

    changeBtnColor(qs(`#send-data`, qs(`#edit-character-form`)), `green`);

    apiHandler.getAllChars();
    [charId,
      charName,
      charOccupation,
      charWeapon].forEach(el => { el.value = null });
    charIsCartoon.checked = false;
  } catch (error) {
    changeBtnColor(qs(`#send-data`, qs(`#edit-character-form`)), `red`);
    console.log(error);
  }
});

document.getElementById('new-character-form').addEventListener('submit', async function (event) {
  try {
    event.preventDefault();

    const newCharFormEl = qs(`#new-character-form`),
      charName = qs(`[name='name']`, newCharFormEl),
      charOccupation = qs(`[name='occupation']`, newCharFormEl),
      charWeapon = qs(`[name='weapon']`, newCharFormEl),
      charIsCartoon = qs(`[name='cartoon']`, newCharFormEl);

    const { data } = await apiHandler.post(``, {
      name: charName.value,
      occupation: charOccupation.value,
      weapon: charWeapon.value,
      cartoon: charIsCartoon.checked
    });

    changeBtnColor(qs(`#send-data`, qs(`#new-character-form`)), `green`);

    appendChar(data, charsContainer);
    [charName,
      charOccupation,
      charWeapon].forEach(el => { el.value = null });
    charIsCartoon.checked = false;
  } catch (error) {
    changeBtnColor(qs(`#send-data`, qs(`#new-character-form`)), `red`);
    console.log(error);
  }
});

function changeBtnColor(btnEl, color) {
  btnEl.style.backgroundColor = color;
  setTimeout(() => {
    btnEl.style.backgroundColor = null;
  }, 300)
}

function appendChar(char, container) {
  const clone = characterTemplate.content.cloneNode(true);

  qs(`.character-id span`, clone).textContent += `${char._id}`;
  qs(`.name span`, clone).textContent += `${char.name}`;
  qs(`.occupation span`, clone).textContent += `${char.occupation}`;
  qs(`.cartoon span`, clone).textContent += `${char.cartoon}`;
  qs(`.weapon span`, clone).textContent += `${char.weapon}`;

  container.appendChild(clone);
}

function qs(selector, element = document) {
  return element.querySelector(selector);
}

function qsa(selector, element = document) {
  return element.querySelectorAll(selector);
}