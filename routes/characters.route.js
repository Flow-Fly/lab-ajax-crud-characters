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
  const charFound = await Character.find();
  res.status(200).json(charFound);
});

router.get("/:characterInfo", async (req, res, next) => {
  /**Your code goes here */
  if (isValidObjectId(Character)) {
    const charById = await Character.findById(req.params.id);
    res.status(200).json(charById);
  } else {
    const charByName = await Character.findOne({
      name: req.params.name,
    });
    res.status(200).json(charByName);
  }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post("/", async (req, res, next) => {
  /**Your code goes here */
  try {
    const createdChar = await Character.create(req.body);
    res.status(200).json(createdChar);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * ? This route should respond with one character
 */
router.get("/:name", async (req, res, next) => {
  console.log("im in GET /:name");

  /**Your code goes here */
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/:id", (req, res, next) => {
  /**Your code goes here */
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete("/:id", (req, res, next) => {
  /**Your code goes here */
});

module.exports = router;
