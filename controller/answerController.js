const dbConection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function getAnswers(req, res) {
  const questionId = req.params.questionid;

  try {
    const [answers] = await dbConection.query(
      "SELECT a.id AS answerid, a.content AS answer, u.username, a.created_at FROM answers a JOIN users u ON a.user_id = u.id WHERE a.question_id = ?",
      [questionId]
    );

    if (answers.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No answers found." });
    }

    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error("Error in getAnswers:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

async function postAnswer(req, res) {
  const { answer, questionId } = req.body;

  if (!answer || !questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information." });
  }

  try {
    const user_id = req.user.id;

    await dbConection.query(
      "INSERT INTO answers (user_id, question_id, content) VALUES (?, ?, ?)",
      [user_id, questionId, answer]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully." });
  } catch (error) {
    console.error("Error in postAnswer:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

module.exports = { getAnswers, postAnswer };

console.log("Exported functions:", { getAnswers, postAnswer });
console.log("Imported functions:", { getAnswers, postAnswer });

