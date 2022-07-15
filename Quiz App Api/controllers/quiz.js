import { QuizService } from "../services/quiz.js";
import dotenv from "dotenv";
import { sendNewQuizEmail } from "../services/sendEmail.js";
import { UserService } from "../services/auth.js";
dotenv.config();

async function uploadQuiz(req, res) {
  try {
    const { id, email } = req.user;
    const {
      title,
      expirationDate,
      quizQuestiions,
      status,
      forWho,
      coverPicture,
    } = req.body;
    const quiz = await QuizService.uploadQuiz(
      title,
      id,
      status,
      expirationDate,
      quizQuestiions,
      forWho,
      coverPicture
    );
    const emails = [];
    forWho.forEach((mail) => {
      emails.push(mail.email);
    });
    sendNewQuizEmail(emails, quiz.id);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllForYouQuizzes(req, res) {
  try {
    const quizzes = await QuizService.getAllForYouQuizzes(req.user.email);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllMyQuizzes(req, res) {
  try {
    const quizzes = await QuizService.getAllMyQuizzes(req.params.id);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteQuiz(req, res) {
  try {
    const quiz = await QuizService.deleteQuiz(req.params.id, req.user);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getQuizById(req, res) {
  try {
    const quiz = await QuizService.getQuizById(req.params.id, req.user);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function uploadResult(req, res) {
  try {
    const quizId = req.params.id;
    const { result } = req.body;
    const { id } = req.user;
    const quiz = await QuizService.uploadResult(quizId, id, result);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getResults(req, res) {
  try {
    const quizId = req.params.id;
    const results = await QuizService.getResults(quizId, req.user);
    const resultsToReturn = [];
    let foundUser;
    for (let i = 0; i < results.length; i++) {
      foundUser = await UserService.getUserById(results[i].userId);
      resultsToReturn.push({
        username: foundUser.username,
        image: foundUser.image,
      });
      resultsToReturn[i].userId = results[i].userId;
      resultsToReturn[i].result = results[i].result;
    }

    res.status(200).json(resultsToReturn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  uploadQuiz,
  getAllForYouQuizzes,
  getAllMyQuizzes,
  deleteQuiz,
  getQuizById,
  uploadResult,
  getResults,
};
