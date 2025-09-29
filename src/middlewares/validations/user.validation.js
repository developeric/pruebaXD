import { body } from "express-validator";

export const createUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("El username es requerido")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "El username solo puede contener letras, números y guiones bajos"
    ),

  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
    ),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser user o admin"),

  body("profile.firstName")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("profile.lastName")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracteres"),

  body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("Debe ser una URL válida"),

  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage(
      "La fecha de nacimiento debe tener formato válido (YYYY-MM-DD)"
    ),
];
