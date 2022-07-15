import mongoose from "mongoose";
import { convertImgToCloudinary } from "../services/convertImageToCloudinary.js";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
    },
    maxPoint: {
      type: Number,
    },
    expirationDate: {
      type: Number,
      required: true,
    },
    coverPicture: {
      type: String,
    },
    quizQuestiions: [
      {
        question: String,
        point: {
          type: Number,
          required: true,
        },
        answers: [
          {
            txt: String,
            correct: Boolean,
          },
        ],
        image: String,
      },
    ],
    forWho: [
      {
        email: String,
        _id: false,
      },
    ],
    status: String,
    results: {
      type: [
        {
          userId: String,
          result: { type: Number },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

quizSchema.pre("save", async function preSaveImgConvert(next) {
  const quiz = this;
  if (!quiz.isModified("coverPicture") || !quiz.coverPicture) return next();
  try {
    const cloudinaryImage = (await convertImgToCloudinary(quiz.coverPicture))
      .url;
    if (cloudinaryImage) {
      quiz.coverPicture = cloudinaryImage;
      return next();
    }
  } catch (error) {
    return next(error);
  }
});

quizSchema.pre("save", async function preSaveQuestionImgConvert(next) {
  const quiz = this;
  try {
    for (let i = 0; i < quiz.quizQuestiions.length; i++) {
      let question = quiz.quizQuestiions[i];
      if (!question.isModified("image") || !question.image) return next();
      let cloudinaryImage = (await convertImgToCloudinary(question.image)).url;
      if (cloudinaryImage) {
        quiz.quizQuestiions[i].image = cloudinaryImage;
      }
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

quizSchema.pre("save", async function preSaveGenMaxPoint(next) {
  const quiz = this;
  try {
    let maxPoint = 0;
    for (let i = 0; i < quiz.quizQuestiions.length; i++) {
      let question = quiz.quizQuestiions[i];
      if (!question.isModified("point")) return next();
      maxPoint += question.point;
    }
    quiz.maxPoint = maxPoint;
    return next();
  } catch (error) {
    return next(error);
  }
});

const Quiz = mongoose.model("quiz", quizSchema);

export default Quiz;
