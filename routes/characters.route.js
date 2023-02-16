const router = require("express").Router();
const Character = require("../models/Character.model");
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get("/characters", async (req, res, next) => {
  /**Your code goes here */
  try {
    const allcharacters = await Character.find();
    res.status(200).json(allcharacters);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post("/characters", async (req, res, next) => {
  /**Your code goes here */
  try {
    const characterToCreate = { ...req.body };
    const createdCharacter = await Character.create(characterToCreate);
    res.status(201).json(createdCharacter);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should respond with one character
 */
router.get("/characters/:CharID", async (req, res, next) => {
  /**Your code goes here */
	const { CharID } = req.params;
	try {
	await Character.findByID(CharID);
    res.json({ message: `This charcacter is  : ${CharID}` });
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/characters/:CharID", async (req, res, next) => {
  /**Your code goes here */
  const { CharID } = req.params;
  const { CharToUpdate } = { ...req.body };
  try {
    await Character.findByIDAndAUpdate(CharID, CharToUpdate);
    res.json({ message: `Successfully updated character : ${CharID}` });
  } catch (error) {
    next(error);
  }
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete("/characters/:CharID", async (req, res, next) => {
  /**Your code goes here */
  try {
    await Ducks.findByIdAndDelete(req.params.CharID);
    res.json({ message: `Duck with id: ${req.params.CharID} was deleted` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
