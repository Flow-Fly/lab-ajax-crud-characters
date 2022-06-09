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
    const foundCharacters = await Character.find();
    res.status(200).json(foundCharacters);
  } catch (error) {
    res.sendStatus(404);
  }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post("/", async (req, res, next) => {
  /**Your code goes here */
  try {
    if (!req.body.name || typeof req.body.name !== "string") {
      res.status(400).send("Please enter a valid name (should be a string)");
      return;
    }

    if (!req.body.occupation || typeof req.body.occupation !== "string") {
      res
        .status(400)
        .send("Please enter a valid occupation (should be a string).");
      return;
    }

    // if (!req.body.cartoon || typeOf(req.body.cartoon) !== Boolean) {
    //   res
    //     .status(400)
    //     .send("Please enter true or false for the cartoon field (boolean).");
    //   return;
    // }

    if (!req.body.weapon || typeof req.body.weapon !== "string") {
      res.status(400).send("Please enter a valid weapon (should be a string).");
      return;
    }

    const createdCharacter = await Character.create(req.body);

    res.status(201).json({
      message: "Successfuly created a new character ! ",
      character: createdCharacter,
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

/**
 * ? This route should respond with one character
 */
router.get("/:name", async (req, res, next) => {
  /**Your code goes here */
  try {
    const foundCharacter = await Character.find({ name: req.params.name });
    res.status(200).json(foundCharacter);
  } catch (error) {
    res.sendStatus(404);
  }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/:id", async (req, res, next) => {
  /**Your code goes here */
  try {
    // if (req.body.name && typeOf(req.body.name) !== "string") {
    //   res.status(400).send("Please enter a valid name (should be a string)");
    //   return;
    // }

    // if (req.body.occupation && typeOf(req.body.occupation) !== "string") {
    //   res
    //     .status(400)
    //     .send("Please enter a valid occupation (should be a string).");
    //   return;
    // }

    // if (req.body.cartoon && typeOf(req.body.cartoon) !== "boolean") {
    //   res
    //     .status(400)
    //     .send("Please enter true or false for the cartoon field (boolean).");
    //   return;
    // }

    // if (req.body.weapon && typeOf(req.body.weapon) !== "string") {
    //   res.status(400).send("Please enter a valid weapon (should be a string).");
    //   return;
    // }

    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(201).json({
      message: "Successfuly updated a character ! ",
      character: updatedCharacter,
    });
  } catch (error) {
    res.status(404).send("No character found by this id");
  }
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete("/:id", async (req, res, next) => {
  /**Your code goes here */
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send(
        `Character ${deletedCharacter.name} has been successfully deleted.`
      );
  } catch (error) {
    res.status(404).send("No character found by this id");
  }
});

module.exports = router;
