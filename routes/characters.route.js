const router = require('express').Router()
const Character = require('../models/Character.model')

router.get('/', async (req, res, next) => {
  try {
    const allCharacters = await Character.find()
    res.json(allCharacters)
  } catch (error) {
    next(error)
  }
})

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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const oneCharacter = await Character.findById(id)
    res.json(oneCharacter)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id
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

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    await Character.findByIdAndDelete(id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
