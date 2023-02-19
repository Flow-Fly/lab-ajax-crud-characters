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

//キャラクターをデータベースにアップする
async function addCharacterToDatabase(event) {
  //ページのリロードをキャンセルする
  event.preventDefault()
  //入力された情報
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
    //オブジェクトにURLの情報と入力された投稿情報を代入する
    const { data: character } = await axios.post(
      `${myUrl}characters`,
      characterToCreate
    )
    //オブジェクトのデータを元に新しいキャラクターを作成する
    createCharacter(character)
  } catch (error) {
    console.log(error)
  }
}

//新規キャラクター作成
function createCharacter(character) {
  //テンプレートを複製する
  const clone = characterTemplate.content.cloneNode(true)
  //クローンの入力フォームに上記で作成したキャラクター情報を挿入する
  clone.querySelector('.character-id > span').textContent = character._id
  clone.querySelector('.name > span').textContent = character.name
  clone.querySelector('.occupation > span').textContent = character.occupation
  clone.querySelector('.weapon > span').textContent = character.weapon
  clone.querySelector('.cartoon > span').textContent = character.cartoon
  //画面上部の表示場所に置く
  displayedCharacterSection.appendChild(clone)
}

//アップデートする
function fillTheUpdateForm(character) {
  //編集画面の入力フォームに入力する
  nameInputUpdate.value = character.name
  occupationInputUpdate.value = character.occupation
  weaponInputUpdate.value = character.weapon
  cartoonInputUpdate.value = character.cartoon
  // updateForm.dataset.id = character._id
}

//データを取得 - axios.get
async function fetchAllCharacters() {
  //画面からキャラクターを消す
  displayedCharacterSection.innerHTML = ''
  try {
    //HTTP通信(API通信)でサーバーから全データを取得してdataオブジェクトに代入
    const { data } = await axios.get(`${myUrl}characters`)
    //dataの情報を取り出してキャラクターを作成する
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
    //HTTP通信(API通信)でサーバーから１つのデータを取得してdataオブジェクトに代入
    const { data: character } = await axios.get(`${myUrl}characters/${key}`)
    createCharacter(character)
  } catch (error) {
    console.error(error)
  }
}

//新規にデータを登録 - axios.post
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
    console.log(data)
    fetchAllCharacters()
  } catch (error) {
    console.error(error)
  }
}

async function deleteOneCharacter() {
  try {
    const id = inputDeleteForm.value
    await axios.delete(`${myUrl}characters/${id}`)
    fetchAllCharacters()
  } catch (error) {
    console.error(error)
  }
}
