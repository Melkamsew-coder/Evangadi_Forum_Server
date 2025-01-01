const dbConection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function ask(req, res) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the required informations" });
  }

  try {
    const user_id = req.user.id; // Ensure this matches your `authMiddleware`

    await dbConection.query(
      "INSERT INTO questions (user_id, title, description) VALUES (?, ?, ?)",
      [user_id, title, description]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully" });
  } catch (error) {
    console.error("Error in ask function:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}


async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConection.query(
      "SELECT q.id AS questionid, q.title, q.description, u.username, q.created_at FROM questions q JOIN users u ON q.user_id = u.id ORDER BY q.id DESC"
    );

    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No questions found." });
    }

    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.error("Error in getAllQuestions:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

async function getSingleQuestion(req, res) {
  const questionId = req.params.questionid;

  try {
    const [[question]] = await dbConection.query(
      "SELECT * FROM questions WHERE id = ?",
      [questionId]
    );

    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Question not found" });
    }

    return res.status(StatusCodes.OK).json({ question });
  } catch (error) {
    console.error("Error in getSingleQuestion:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}


module.exports = { ask, getAllQuestions, getSingleQuestion };
