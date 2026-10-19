import { Router } from "express";
import authMiddleWare from "../middleware/auth.middleware.js";
import commentController from "../controllers/comment.controller.js";

const commentRoute = Router()

const patternComments = {
    postComment: '/',
    getComment: '/:articleId/comments'
}

commentRoute.post(patternComments.postComment, authMiddleWare, commentController.createComment)
commentRoute.get(patternComments.getComment, authMiddleWare, commentController.getCommentByArticle)


export default commentRoute