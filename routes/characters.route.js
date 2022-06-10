const router = require("express").Router();
const Character = require("../models/Character.model");
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get("/", async (req, res, next) => {
  /**Your code goes here */
  try {
    const allCharacters = await Character.find();
    res.status(200).json(allCharacters);
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

    let message = "Error in those fields: ";
    const tmpLength = message.length;
    if (!name || typeof name !== "string") {
      message += "name, ";
    }
    if (!occupation || typeof occupation !== "string") {
      message += "occupation, ";
    }
    if (typeof cartoon !== "boolean") { 
      message += "cartoon, ";
    }
    if (!weapon || typeof weapon !== "string") {
      message += "weapon, ";
    }
    if (message.length > tmpLength) {
      res.status(400).json(message);
      return;
    }

    const createdCharacter = await Character.create({
      name,
      occupation,
      cartoon,
      weapon,
    });
    res.status(201).json(createdCharacter);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should respond with one character
 */
router.get("/:name", async (req, res, next) => {
  /**Your code goes here */
  try {
    const name = req.params.name;
    const character = await Character.find({ name });
    res.status(200).json(character);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/:id", async (req, res, next) => {
  /**Your code goes here */
  try {
    const id = req.params.id;
    const myUdpate = req.body;
    const updatedCharacter = await Character.findByIdAndUpdate(id, myUdpate, {
      new: true,
    });
    console.log(updatedCharacter);
    if (!updatedCharacter) {
      res.status(404).json({ message: "Character not found" });
      return;
    }
    res.status(200).json(updatedCharacter);
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
    const id = req.params.id;
    const deletedCharacter = await Character.findByIdAndDelete(id);
    if (!deletedCharacter) {
      res.status(404).send("Character not found");
      return;
    }
    res.status(200).send("Character has been successfully deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
