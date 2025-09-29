import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "El username es requerido"],
      unique: true,
      trim: true,
      minlength: [3, "El username debe tener al menos 3 caracteres"],
      maxlength: [20, "El username no puede exceder los 20 caracteres"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "El username solo puede contener letras, números y guiones bajos",
      ],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingresa un email válido",
      ],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    //*------------[ Perfil embebido ]---------------------Relacion 1:1---------------------------------------
    profile: [
      {
        firstName: {
          type: String,
          trim: true,
          minlength: [2, "El nombre debe tener al menos 2 caracteres"],
          maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
        },
        lastName: {
          type: String,
          trim: true,
          minlength: [2, "El apellido debe tener al menos 2 caracteres"],
          maxlength: [50, "El apellido no puede exceder los 50 caracteres"],
        },
        biography: {
          type: String,
          maxlength: [500, "La biografía no puede exceder los 500 caracteres"],
          default: "",
        },
        avatarUrl: {
          type: String,
          default: "",
          match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            "Debe ser una URL válida",
          ],
        },
        birthDate: {
          type: Date,
          default: null,
        },
      },
    ],
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    deletedAt: {
      type: Date,
      require: false,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: { $eq: null } });
  next();
});

export const UserModel = model("User", UserSchema);
