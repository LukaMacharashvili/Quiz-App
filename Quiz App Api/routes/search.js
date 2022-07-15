import express from "express";
import { getUsersBySearch, getQuizzesBySearch } from "../controllers/search.js";

const searchRouter = express.Router();

searchRouter.get("/user/:searchBody", getUsersBySearch);

searchRouter.get("/quiz/:searchBody", getQuizzesBySearch);

export default searchRouter;
