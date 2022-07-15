import express from "express";
import {
  uploadQuiz,
  getAllForYouQuizzes,
  getAllMyQuizzes,
  deleteQuiz,
  getQuizById,
  uploadResult,
  getResults,
} from "../controllers/quiz.js";

const quizRouter = express.Router();

quizRouter.post("/", uploadQuiz);

quizRouter.get("/foryou", getAllForYouQuizzes);

quizRouter.get("/my/:id", getAllMyQuizzes);

quizRouter.delete("/:id", deleteQuiz);

quizRouter.get("/get/:id", getQuizById);

quizRouter.post("/uploadresult/:id", uploadResult);

quizRouter.get("/getresults/:id", getResults);

export default quizRouter;
