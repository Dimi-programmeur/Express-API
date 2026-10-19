import { Router } from "express";
import articlesController from "../controllers/articles.controller.js";
import authMiddleWare from "../middleware/auth.middleware.js";
import verifRole from "../middleware/verifRole.middleware.js";


const articleRoute = Router()

const patternArticle = {
    getArticles : '/articles',
    postArticles : '/articles',
}

articleRoute.get(patternArticle.getArticles, authMiddleWare, articlesController.getArticles)
articleRoute.post(patternArticle.postArticles, authMiddleWare, verifRole, articlesController.postArticle)

export default articleRoute
