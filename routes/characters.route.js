const router = require('express').Router()
const mongoose = require('mongoose')
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
		const allCharacters = await Character.find();
		res.status(200).json(allCharacters);
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post('/', async (req, res, next) => {
	/**Your code goes here */
	try {
		const newlyCreatedCharacter = { ...req.body }
		const createdCharacter = await Character.create(newlyCreatedCharacter)
		res.status(201).json(createdCharacter)
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should respond with one character
 */
router.get('/:characterId', async (req, res, next) => {
	/**Your code goes here */
	try {
		const oneCharacter = await Character.findById(req.params.characterId);
		res.status.json(oneCharacter);
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch('/:characterId', async (req, res, next) => {
	/**Your code goes here */
	const { characterId } = req.params
	const characterToUpdate = { ...req.body }

	// or 
	// const  { name, occupation, cartoon, weapon} = req.body
	// const characterToUpdate = {}
	// if (name) {
	// characterToUpdate.name = name
	// }
	// if (occupation) {
	// characterToUpdate.occupation = occupation
	// }
	// if (weapon) {
	// characterToUpdate.weapon = weapon
	// }
	// if (typeof cartoon === 'boolean') {
	// characterToUpdate.cartoon = cartoon
	// }
	// and then : try {
	//  const updatedCharacter = await Character.findByIdAndUpdate(characterId, characterToUpdate, {
	//  id,
	// characterToUpdate, 
	//  {new : true }
	// })
	// }
	// 	

	try {
		const updatedCharacter = await Character.findByIdAndUpdate(characterId, characterToUpdate, { new: true })
		res.json({ message: `Successfully updated character: ${characterId}` })
	} catch (error) {
		next(error)
	}
})

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 *//
	router.delete('/:characterId', async (req, res, next) => {
		/**Your code goes here */
		try {
			await Character.findByIdAndDelete(req.params.characterId)
			res.json({ message: `The character with the id: ${req.params.characterId} was deleted.` })
		} catch (error) {
			next(error)
		}
	})

module.exports = router
