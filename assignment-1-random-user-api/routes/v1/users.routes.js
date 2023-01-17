const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const {
  getAllUsers,
  postUser,
  getRandomUser,
} = require("../../controllers/users.controllers");

const router = require("express").Router();
router.use([morgan("dev"), cors(), express.json()]);

router.get("/all", getAllUsers);
router.get("/random", getRandomUser);
router.post("/save", postUser);

module.exports = router;
