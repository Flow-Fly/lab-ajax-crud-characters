const { response } = require("express")

/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterTemplate = document.getElementById('template')

const fetchAllButton = document.getElementById('fetch-all')

const fetchOneButton = document.querySelector('.fetch-one')

const createButton = document.getElementById('create-button')
const nameInput = document.getElementById('name')
const occupationInput = document.getElementById('occupation')
const weaponInput = document.getElementById('weapon')
const cartoonInput = document.getElementById('cartoon')

const updateButton = document.getElementById('update-button')

const nameInputUpdate = document.getElementById('name-update')
const occupationInputUpdate = document.getElementById('occupation-update')
const weaponInputUpdate = document.getElementById('weapon-update')
const cartoonInputUpdate = document.getElementById('cartoon-update')

const updateForm = document.getElementById('update-form')

const characterApi = axios.create({
  baseURL: 'http://localhost:5005/api/characters/'
})

const myUrl = 'http://localhost:5005/api/'

fetchAllButton.addEventListener('click', fetchAllCharacters)

document.getElementById('fetch-all').addEventListener('click', function (event) {

});

createButton.addEventListener('click', addCharacterToDatabase)

updateButton.addEventListener('click', updateCharacterInDatabase)

async function updateCharacterInDatabase(event) {
  event.preventDefault()
  const name = nameInputUpdate.value
  const occupation = occupationInputUpdate.value
  const weapon = weaponInputUpdate.value
  const cartoon = cartoonInputUpdate.value
  const characterToUpdate = {
    name,
    occupation,
    weapon,
    cartoon,
  }

  try {
    const response = await characterApi.patch(
      `${updateForm.dataset.id}`,
      characterToUpdate
    )
    console.log(response)
    await fetchAllCharacters()
  } catch (error) {
    console.log(error)
  }
}




document.getElementById('fetch-one').addEventListener('click', function (event) {

});

document.getElementById('delete-one').addEventListener('click', function (event) {

});

document.getElementById('edit-character-form').addEventListener('submit', function (event) {

});

document.getElementById('new-character-form').addEventListener('submit', function (event) {

});

