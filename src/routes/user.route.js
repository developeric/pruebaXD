import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserId,
  updateUser,
} from "../controllers/user.controller.js";
import { createUserValidation } from "../middlewares/validations/user.validation.js";
import { adminMiddleware } from "../middlewares/admin.js";

export const userRouter = Router();

userRouter.post("/users", createUserValidation, createUser);
userRouter.get("/users", adminMiddleware, getAllUsers);
userRouter.get("/users/:id", adminMiddleware, getUserId);
userRouter.put("/users/:id", adminMiddleware, updateUser);
userRouter.delete("/users/:id", adminMiddleware, deleteUser);
