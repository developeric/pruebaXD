import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "El contenido es requerido"],
      minlength: 5,
      maxlength: 500,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    article: { type: Schema.Types.ObjectId, ref: "Article" },
  },
  { timestamps: true }
);
export const CommentModel = model("Comment", CommentSchema);
