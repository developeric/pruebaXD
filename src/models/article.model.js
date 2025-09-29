import { Schema, model } from "mongoose";
import { CommentModel } from "./comment.model.js";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [200, "El título no puede exceder los 200 caracteres"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "El contenido es requerido"],
      minlength: [50, "El contenido debe tener al menos 50 caracteres"],
    },
    excerpt: {
      type: String,
      maxlength: [500, "El extracto no puede exceder los 500 caracteres"],
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["published", "archived"],
        message: "El estado debe ser 'published' o 'archived'",
      },
      default: "published",
    },
    //&  author al mismo nivel (relación 1:N)
    //& --------------------------------[ User ---> Article ]-------------------------------------------------------------
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El autor es requerido"],
    },
    //&  tags como array (relación N:M)
    //&-------------------------[ Article <--> Tag ] ------------------------------------------------
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ArticleSchema.pre("findOneAndDelete", async function (next) {
  const filter = this.getQuery();

  const article = await this.model.findOne(filter);
  if (article) await CommentModel.deleteMany({ article: article._id });

  next();
});

export const ArticleModel = model("Article", ArticleSchema);

//* Define un hook/middleware que se ejecutará ANTES de la operación 'findOneAndDelete'
// ====> Parte 1  ArticleSchema.pre("findOneAndDelete", async function (next) {

//! this.getQuery() obtiene el objeto de consulta/filtro que se usó en findOneAndDelete()
//! Ejemplo: Si llamas ArticleModel.findOneAndDelete({ _id: "123" })
//! entonces filter será { _id: "123" }
// ==========> Parte 2 const filter = this.getQuery();

//& Busca el artículo que se va a eliminar usando el mismo filtro
//& this.model se refiere al modelo ArticleModel (el dueño del schema)
//& Esto encuentra el documento específico antes de que sea eliminado
// =============> Parte 3  const article = await this.model.findOne(filter);

//TODO Si se encontró el artículo (article no es null o undefined)
// =======>  if (article) {

//~ Elimina TODOS los comentarios que tengan el campo 'article' igual al _id del artículo
//~ CommentModel.deleteMany() elimina múltiples documentos que coincidan con el filtro
//~ { article: article._id } busca comentarios donde el campo 'article' coincide con el ID del artículo
// await CommentModel.deleteMany({ article: article._id });

//^ Llama a next() para continuar con la operación principal (eliminar el artículo)
//^ next() es crucial para que Mongoose sepa que el middleware terminó
// =====>  next();
