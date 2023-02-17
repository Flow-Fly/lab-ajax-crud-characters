const router = require('express').Router()
const Character = require('../models/Character.model')
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get('/', async (req, res, next) => {
  try {
    const allCharacters = await Character.find()
    res.json(allCharacters)
  } catch (error) {
    next(error)
  }
})

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, occupation, weapon, cartoon } = req.body
    const createdCharacter = await Character.create({
      name,
      occupation,
      weapon,
      cartoon,
    })
    res.json(createdCharacter)
  } catch (error) {
    next(error)
  }
})

/**
 * ? This route should respond with one character
 */
router.get('/:id', async (req, res, next) => {
  try {
    // const { id } = req.params
    // const idButAnotherWay = req.params.id
    const oneCharacter = await Character.findOne(req.params)
    res.json(oneCharacter)
  } catch (error) {
    next(error)
  }
})

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, occupation, cartoon, weapon } = req.body
    const updatedCharacter = await Character.findByIdAndUpdate(
      id,
      { name, occupation, cartoon, weapon },
      { new: true }
    )
    res.status(200).json(updatedCharacter)
  } catch (error) {
    next(error)
  }
})

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete('/:id', async (req, res, next) => {
  // try {
  //   const deleteId = await Character.findByIdAndDelete(req.params.id)
  //   res.json(deleteId)
  // } catch (error) {
  //   next(error)
  // }

  const { id } = req.params
  try {
    await Character.findByIdAndDelete(id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
