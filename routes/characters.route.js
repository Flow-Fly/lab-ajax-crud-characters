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
  try {
    const allCharacters = await Character.find();
    res.status(200).json(allCharacters);
  } catch (err) {
    next(err);
  }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post("/", async (req, res, next) => {
  try {
    const { name, occupation, cartoon, weapon } = req.body;
    if (!name || !occupation || !cartoon || !weapon) {
      res.status(400).json({ message: "Please provide a full character" });
    } else {
      const addCharacter = await Character.create(req.body);
      res
        .status(201)
        .json({ message: "new character created :", addCharacter });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * ? This route should respond with one character
 */
router.get("/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const characterInfo = await Character.find({ name: name });
    res.status(200).json(characterInfo);
  } catch (err) {
    next(err);
  }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/:id", async (req, res, next) => {
  try {
    let { character } = req.body;
    const id = req.params.id;
    if (!isValidObjectId(character)) {
      const updatedCharacter = await Character.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(updatedCharacter);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    res.sendStatus(204).json("Character has been successfully deleted");
    if (!deletedCharacter) {
      res.status(404).json("Character not found");
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
