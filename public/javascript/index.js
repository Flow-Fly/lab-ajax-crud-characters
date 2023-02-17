/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 */
const characterApi = axios.create({
  baseURL: 'http://localhost:5005/api/characters/',
})
const myUrl = 'http://localhost:5005/api/'
const characterTemplate = document.getElementById('template')
const fetchAllButton = document.getElementById('fetch-all')
const fetchOneButton = document.getElementById('fetch-one')
const deleteOneButton = document.getElementById('delete-one')
const editCharacterForm = document.getElementById('edit-character-form')
const newCharacterForm = document.getElementById('new-character-form')
const displayedCharacterSection = document.querySelector('.character-info')
const nameInput = document.getElementById('name')
const occupationInput = document.getElementById('occupation')
const weaponInput = document.getElementById('weapon')
const cartoonInput = document.getElementById('cartoon')
const nameInputUpdate = document.getElementById('name-update')
const occupationInputUpdate = document.getElementById('occupation-update')
const weaponInputUpdate = document.getElementById('weapon-update')
const cartoonInputUpdate = document.getElementById('cartoon-update')
const updateForm = document.getElementById('edit-character-form')

const inputDelete = document.querySelector('[name=character-id-delete]')
const createButton = document.getElementById('send-data-create')
fetchAllButton.addEventListener('click', fetchAllCharacters)
fetchOneButton.addEventListener('click', fetchOneCharacter)
deleteOneButton.addEventListener(
  'submit',
  deleteOneCharacter(inputDelete.value)
)
// editCharacterForm.addEventListener('submit', editCharacter)
newCharacterForm.addEventListener('submit', createCharacter)

async function addCharacterToDatabase(event) {
  event.preventDefault()
  const name = nameInput.value
  const occupation = occupationInput.value
  const weapon = weaponInput.value
  const cartoon = cartoonInput.value
  const characterToCreate = {
    name,
    occupation,
    weapon,
    cartoon,
  }
  try {
    const response = await characterApi.post('/', characterToCreate)
    console.log(response)
    createCharacter(response.data)
  } catch (error) {
    console.log(error)
  }
}

function createCharacter(element) {
  const clone = characterTemplate.content.cloneNode(true)
  clone.querySelector('.character-id span').textContent = element._id
  clone.querySelector('.name span').textContent = element.name
  clone.querySelector('.occupation span').textContent = element.occupation
  clone.querySelector('.weapon span').textContent = element.weapon
  clone.querySelector('.cartoon span').textContent = element.cartoon
  displayedCharacterSection.append(clone)
}

function fillTheUpdateForm(character) {
  nameInputUpdate.value = character.name
  occupationInputUpdate.value = character.occupation
  weaponInputUpdate.value = character.weapon
  cartoonInputUpdate.value = character.cartoon
  updateForm.dataset.id = character._id
}

async function fetchAllCharacters() {
  displayedCharacterSection.innerHTML = ''
  try {
    const { data } = await axios.get(`${myUrl}characters`)
    for (const character of data) {
      createCharacter(character)
    }
  } catch (error) {
    console.error(error)
  }
}

async function fetchOneCharacter(name) {
  displayedCharacterSection.innerHTML = ''
  try {
    const message = await axios.get(`${myUrl}characters/${name}`)
    //console.log(message)
    createCharacter(message.data)
  } catch (error) {
    console.error(error)
  }
}

async function deleteOneCharacter(id) {
  try {
    const message = await axios.delete(`${myUrl}characters/${id}`)
    await fetchAllCharacters()
  } catch (error) {
    console.error(error)
  }
}
