// const express = require("express");
// const router = express.Router();

// // Answer controller
// const { getAnswers, postAnswer } = require("../controller/answerController");

// // Routes
// router.get("/:questionid", getAnswers);
// router.post("/", postAnswer);

// module.exports = router;
const express = require("express");
const router = express.Router();

// Answer controller
const { getAnswers, postAnswer } = require("../controller/answerController");

// Routes
router.get("/:questionid", getAnswers);
router.post("/", postAnswer);

module.exports = router;
