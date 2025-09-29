import { ArticleModel } from "../models/article.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    const articulo = await ArticleModel.findByPk(req.params.id);

    if (req.user.role !== "admin" && req.user.id !== articulo.user_id) {
      return res.status(403).json({ message: "No es el autor" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export const authorMiddleware = async (req, res, next) => {
  try {
    const articulo1 = await ArticleModel.findByPk(req.params.id);

    if (req.user.id !== articulo1.user_id) {
      return res.status(403).json({ message: "No es el autor" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
