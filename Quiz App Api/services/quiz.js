import Quiz from "../models/quiz.model.js";
import { UserService } from "../services/auth.js";

export class QuizService {
  static async uploadQuiz(
    title,
    owner,
    status,
    expirationDate,
    quizQuestiions,
    forWho,
    coverPicture
  ) {
    try {
      const quiz = new Quiz();
      quiz.title = title;
      quiz.owner = owner;
      quiz.expirationDate = expirationDate;
      quiz.quizQuestiions = quizQuestiions;
      quiz.forWho = forWho;
      quiz.status = status;
      quiz.coverPicture = coverPicture;
      const savedQuiz = await quiz.save();
      return savedQuiz;
    } catch (error) {
      throw error;
    }
  }

  static async getQuizById(id, user) {
    try {
      const quiz = await Quiz.findOne({
        expirationDate: { $gte: Date.now() },
        id: id,
      });
      if (
        quiz.owner == user.id ||
        quiz.forWho.includes(user.email) ||
        quiz.status == "public"
      ) {
        return quiz;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getQuizzesBySearch(searchBody) {
    try {
      const search = searchBody.toLowerCase();
      const quizzes = await Quiz.find({
        title: new RegExp(search, "i"),
        expirationDate: { $gte: Date.now() },
      });
      return quizzes;
    } catch (error) {
      throw error;
    }
  }

  static async uploadResult(quizId, userId, result) {
    try {
      const quiz = await Quiz.findById(quizId);
      if (
        quiz.results.find((val) => {
          return val.userId == userId;
        })
      ) {
        return;
      } else {
        quiz.results.push({
          userId,
          result,
        });
        await quiz.save();
        return quiz;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getResults(quizId, user) {
    try {
      const quiz = await Quiz.findById(quizId);

      if (user.id === quiz.owner) {
        return quiz.results;
      } else {
        return new Error();
      }
    } catch (error) {
      throw error;
    }
  }

  static async getAllForYouQuizzes(userEmail) {
    try {
      const quizzes = await Quiz.find({
        forWho: { email: userEmail },
        expirationDate: { $gte: Date.now() },
      });
      return quizzes;
    } catch (error) {
      throw error;
    }
  }

  static async getAllMyQuizzes(userId) {
    try {
      const quizzes = await Quiz.find({
        owner: userId,
        expirationDate: { $gte: Date.now() },
      });
      return quizzes;
    } catch (error) {
      throw error;
    }
  }

  static async deleteQuiz(id, user) {
    try {
      const quiz = await Quiz.findOneAndDelete({ id: id, owner: user.id });
      return quiz;
    } catch (error) {
      throw error;
    }
  }
}
