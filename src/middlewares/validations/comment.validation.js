import { body, param } from "express-validator";

export const createCommentValidation = [
  body("content")
    .notEmpty()
    .withMessage("El contenido del comentario es requerido")
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres")
    .trim(),

  body("article")
    .notEmpty()
    .withMessage("El artículo es requerido")
    .isMongoId()
    .withMessage("ID de artículo no válido")
    .custom(async (articleId) => {
      const article = await ArticleModel.findById(articleId);
      if (!article) {
        throw new Error("El artículo no existe");
      }
      return true;
    }),

  body("parentComment")
    .optional()
    .isMongoId()
    .withMessage("ID de comentario padre no válido"),
];

export const updateCommentValidation = [
  param("id").isMongoId().withMessage("ID de comentario no válido"),

  body("content")
    .notEmpty()
    .withMessage("El contenido del comentario es requerido")
    .isLength({ min: 5, max: 500 })
    .withMessage("El comentario debe tener entre 5 y 500 caracteres")
    .trim(),
];
