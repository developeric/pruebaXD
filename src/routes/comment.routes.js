import { Router } from "express";
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
  getCommentId,
  getComentLoged,
  getCommentArticle,
} from "../controllers/comment.controller.js";
import {
  createCommentValidation,
  updateCommentValidation,
} from "../middlewares/validations/comment.validation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/owner.js";

export const commentRoutes = Router();

commentRoutes.post(
  "/comments",
  authMiddleware,
  createCommentValidation,
  createComment
);
commentRoutes.get("/comments", getAllComments);
commentRoutes.get("/comments/:id", getCommentId);
commentRoutes.put(
  "/comments/:id",
  ownerOrAdminMiddleware,
  updateCommentValidation,
  updateComment
);
commentRoutes.delete("/comments/:id", ownerOrAdminMiddleware, deleteComment);
commentRoutes.get("/comments/article/:articleId", getCommentArticle);
commentRoutes.get("/comments/my", getComentLoged);
