import { body, param } from "express-validator";

export const createTagValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la tag es requerido")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/)
    .withMessage(
      "El nombre solo puede contener letras, números, espacios y guiones"
    )
    .trim()
    .custom(async (name) => {
      const existingTag = await TagModel.findOne({
        name: new RegExp(`^${name}$`, "i"),
      });
      if (existingTag) {
        throw new Error("Ya existe una tag con ese nombre");
      }
      return true;
    }),

  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede exceder los 200 caracteres")
    .trim(),
];

export const updateTagValidation = [
  param("id").isMongoId().withMessage("ID de tag no válido"),

  body("name")
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]+$/)
    .withMessage(
      "El nombre solo puede contener letras, números, espacios y guiones"
    )
    .trim()
    .custom(async (name, { req }) => {
      const existingTag = await TagModel.findOne({
        name: new RegExp(`^${name}$`, "i"),
        _id: { $ne: req.params.id },
      });
      if (existingTag) {
        throw new Error("Ya existe una tag con ese nombre");
      }
      return true;
    }),

  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede exceder los 200 caracteres")
    .trim(),
];

export const tagIdValidation = [
  param("id").isMongoId().withMessage("ID de tag no válido"),
];
