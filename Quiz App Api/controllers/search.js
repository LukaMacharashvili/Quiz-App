import { UserService } from "../services/auth.js";
import { QuizService } from "../services/quiz.js";

async function getUsersBySearch(req, res) {
  try {
    const users = await UserService.getUsersBySearch(req.params.searchBody);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getQuizzesBySearch(req, res) {
  try {
    const quizzes = await QuizService.getQuizzesBySearch(req.params.searchBody);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getUsersBySearch, getQuizzesBySearch };
