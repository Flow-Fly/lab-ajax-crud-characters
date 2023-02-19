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
const createButton = document.getElementById('send-data-create')

//入力フォーム
const editCharacterForm = document.getElementById('edit-character-form')
const newCharacterForm = document.getElementById('new-character-form')
const displayedCharacterSection = document.querySelector(
  '.characters-container'
)
const updateForm = document.getElementById('edit-character-form')
const inputDeleteForm = document.querySelector(
  'input[name="character-id-delete"]'
)
const inputFetchOneForm = document.querySelector('input[name="character-name"]')

//新キャラクター作成の入力フォーム
const nameInput = document.querySelector(
  '#new-character-form input[name="name"]'
)
const occupationInput = document.querySelector(
  '#new-character-form input[name="occupation"]'
)
const weaponInput = document.querySelector(
  '#new-character-form input[name="weapon"]'
)
const cartoonInput = document.querySelector(
  '#new-character-form input[name="cartoon"]'
)
//編集用の入力フォーム
const idInputUpdate = document.querySelector(
  '#edit-character-form input[name="chr-id"]'
)
const nameInputUpdate = document.querySelector(
  '#edit-character-form input[name="name"]'
)
const occupationInputUpdate = document.querySelector(
  '#edit-character-form input[name="occupation"]'
)
const weaponInputUpdate = document.querySelector(
  '#edit-character-form input[name="weapon"]'
)
const cartoonInputUpdate = document.querySelector(
  '#edit-character-form input[name="cartoon"]'
)

fetchAllButton.addEventListener('click', fetchAllCharacters)
fetchOneButton.addEventListener('click', fetchOneCharacter)
deleteOneButton.addEventListener('click', deleteOneCharacter)
editCharacterForm.addEventListener('submit', editCharacter)
newCharacterForm.addEventListener('submit', createCharacter)

//データを取得 - axios.get
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

//データを取得 - axios.get
async function fetchOneCharacter() {
  const key = inputFetchOneForm.value
  displayedCharacterSection.innerHTML = ''
  try {
    const { data: character } = await axios.get(`${myUrl}characters/${key}`)
    createCharacter(character)
  } catch (error) {
    console.error(error)
  }
}

//新規投稿する - axios.post
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
    const { data: character } = await axios.post(
      `${myUrl}characters`,
      characterToCreate
    )
    createCharacter(character)
  } catch (error) {
    console.log(error)
  }
}

//キャラクター作成を作成して画面にアップ
function createCharacter(character) {
  const clone = characterTemplate.content.cloneNode(true)
  clone.querySelector('.character-id > span').textContent = character._id
  clone.querySelector('.name > span').textContent = character.name
  clone.querySelector('.occupation > span').textContent = character.occupation
  clone.querySelector('.weapon > span').textContent = character.weapon
  clone.querySelector('.cartoon > span').textContent = character.cartoon
  displayedCharacterSection.appendChild(clone) //画面上部の表示場所に置く
}

//データを編集する - axios.post
async function editCharacter(event) {
  event.preventDefault()
  try {
    const id = idInputUpdate._id
    const name = nameInputUpdate.name
    const occupation = occupationInputUpdate.occupation
    const weapon = weaponInputUpdate.weapon
    const cartoon = cartoonInputUpdate.cartoon
    const characterToEdit = { name, occupation, weapon, cartoon }
    //データをサーバーへ送る
    const { data } = await axios.post(
      `${myUrl}characters/${id}`,
      characterToEdit
    )
    fetchAllCharacters()
  } catch (error) {
    console.error(error)
  }
}

//データを削除する - axios.delete
async function deleteOneCharacter() {
  try {
    const id = inputDeleteForm.value
    await axios.delete(`${myUrl}characters/${id}`)
    fetchAllCharacters()
  } catch (error) {
    console.error(error)
  }
}
