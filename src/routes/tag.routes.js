import { Router } from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";
import {
  createTagValidation,
  updateTagValidation,
  tagIdValidation,
} from "../middlewares/validations/tag.validator.js";
import { adminMiddleware } from "../middlewares/admin.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
export const routesTag = Router();

routesTag.post("/tags", adminMiddleware, createTagValidation, createTag);
routesTag.get("/tags", authMiddleware, getAllTags);
routesTag.get("/tags/:id", authMiddleware, tagIdValidation, getTagById);
routesTag.put("/tags/:id", adminMiddleware, updateTagValidation, updateTag);
routesTag.delete("/tags/:id", adminMiddleware, tagIdValidation, deleteTag);
