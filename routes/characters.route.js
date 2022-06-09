const router = require('express').Router()
const Character = require('../models/Character.model')
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get('/', async (req, res, next) => {
  /**Your code goes here */
  try {
    const allChars = await Character.find();
    res.status(200).json(allChars);
  } catch (error) {
    next(error);
  }
})

/**
 * ? This route should create one character and respond with 
 * ? the created character
 */
router.post('/', async (req, res, next) => {
  /**Your code goes here */
  try {
    const createdChar = await Character.create(req.body);
    res.status(201).json(createdChar);
  } catch (error) {
    next(error);
  }
})

/**
 * ? This route should respond with one character
 */
router.get('/:name', async (req, res, next) => {
  /**Your code goes here */
  try {
    const char = await Character.find({ name: new RegExp(req.params.name, `i`) });
    res.status(200).json(char);
  } catch (error) {
    next(error);
  }
})

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch('/:id', async (req, res, next) => {
  /**Your code goes here */
  try {
    const updatedChar = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedChar);
  } catch (error) {
    req.charId = req.params.id;
    next(error);
  }
})

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete('/:id', async (req, res, next) => {
  /**Your code goes here */
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    req.charId = req.params.id;
    next(error);
  }
})


module.exports = router