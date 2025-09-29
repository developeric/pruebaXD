import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleId,
  updateArticle,
} from "../controllers/article.controller.js";
import {
  createArticleValidation,
  updateArticleValidation,
  articleIdValidation,
} from "../middlewares/validations/article.validation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/owner.js";

export const articleRoutes = Router();

articleRoutes.post(
  "/articles",
  authMiddleware,
  createArticleValidation,
  createArticle
);
articleRoutes.get("/articles", authMiddleware, getAllArticles);
articleRoutes.get(
  "/articles/:id",
  authMiddleware,
  articleIdValidation,
  getArticleId
);
articleRoutes.put(
  "/articles/:id",
  authMiddleware,
  updateArticleValidation,
  updateArticle
);
articleRoutes.delete(
  "/articles/:id",
  ownerOrAdminMiddleware,
  articleIdValidation,
  deleteArticle
);
