import { body, param } from "express-validator";

export const createArticleValidation = [
  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isLength({ min: 5, max: 100 })
    .withMessage("El título debe tener entre 5 y 100 caracteres")
    .trim(),

  body("content")
    .notEmpty()
    .withMessage("El contenido es requerido")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres")
    .trim(),

  body("image")
    .optional()
    .isURL()
    .withMessage("La imagen debe ser una URL válida"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Las tags deben ser un array")
    .custom(async (tags) => {
      if (tags && tags.length > 0) {
        const existingTags = await TagModel.find({ _id: { $in: tags } });
        if (existingTags.length !== tags.length) {
          throw new Error("Una o más tags no existen");
        }
      }
      return true;
    }),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished debe ser un valor booleano"),
];

export const updateArticleValidation = [
  param("id").isMongoId().withMessage("ID de artículo no válido"),

  body("title")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage("El título debe tener entre 5 y 100 caracteres")
    .trim(),

  body("content")
    .optional()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres")
    .trim(),

  body("image")
    .optional()
    .isURL()
    .withMessage("La imagen debe ser una URL válida"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Las tags deben ser un array")
    .custom(async (tags) => {
      if (tags && tags.length > 0) {
        const existingTags = await TagModel.find({ _id: { $in: tags } });
        if (existingTags.length !== tags.length) {
          throw new Error("Una o más tags no existen");
        }
      }
      return true;
    }),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished debe ser un valor booleano"),
];

export const articleIdValidation = [
  param("id").isMongoId().withMessage("ID de artículo no válido"),
];
