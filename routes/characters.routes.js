const router = require("express").Router();
const Character = require("../models/Character.model");
const { isValidObjectId } = require("mongoose");

/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get("/", async (req, res, next) => {
  /**Your code goes here */
  try {
    res.status(200).json(await Character.find());
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post("/", async (req, res, next) => {
  /**Your code goes here */
  try {
    const { name, occupation, cartoon, weapon } = req.body;
    if (!name || !occupation || !cartoon || !weapon) {
      res.status(400).json({ message: `Please fill all the fields` });
      return;
    }
    if (
      typeof name !== "string" ||
      typeof occupation !== "string" ||
      typeof cartoon !== "boolean" ||
      typeof weapon !== "string"
    ) {
      res.status(400).json({ message: `Please enter the correct field type` });
      return;
    }

    const createdCharacter = await Character.create(req.body);
    res.status(200).json(createdCharacter);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should respond with one character
 */
router.get("/:name", async (req, res, next) => {
  /**Your code goes here */
  const character = await Character.find({ name: req.params.name });
  res.status(200).json(character);
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/:id", async (req, res, next) => {
  /**Your code goes here */
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCharacter) {
      res.status(404).json({ message: `No character with the specified id` });
    }
    res.status(200).json({ updatedCharacter });
  } catch (error) {
    next(error);
  }
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete("/:id", async (req, res, next) => {
  /**Your code goes here */
  try {
    const response = await Character.findByIdAndDelete(req.params.id);
    if (!response) {
      res.sendStatus(400);
      return;
    } else {
      res.status(204).json({ message: `Succesfully deleted` });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
