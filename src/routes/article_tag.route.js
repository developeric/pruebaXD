import { Router } from "express";
import {
  extraTag,
  deleteTagFromArticle,
} from "../controllers/artcile_tags.controller.js";

export const article_tagRoute = Router();

article_tagRoute.post("/articles/:articleId/tags/:tagId", extraTag);
article_tagRoute.delete(
  "/articles/:articleId/tags/:tagId",
  deleteTagFromArticle
);
