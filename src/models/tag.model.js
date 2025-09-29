import { Schema, model } from "mongoose";
import { ArticleModel } from "./article.model.js";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      minlength: 2,
      trim: true,
      maxlength: 30,
    },
    
    description: { type: String, require: false, maxlength: 200 },
  },

  { timestamps: true }
);

TagSchema.pre("findOneAndDelete", async function (next) {
  const filter = this.getQuery();

  const tag = await this.model.findOne(filter);
  if (tag) {
    await ArticleModel.updateMany(
      { tags: tag._id },
      { $pull: { tags: tag._id } }
    );
  }

  next();
});

TagSchema.virtual("articles", {
  ref: "Article", // Modelo al que referenciamos
  localField: "_id", // Campo local: el _id de la tag
  foreignField: "tags", // Campo en Article: el array 'tags'
  justOne: false, // Para obtener múltiples artículos (array)
});

TagSchema.set("toObject", { virtuals: true });
TagSchema.set("toJSON", { virtuals: true });

export const TagModel = model("Tag", TagSchema);
