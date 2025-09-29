import { ArticleModel } from "../models/article.model.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, status, author } = req.body;
    const newArticle = await ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      author,
    });
    res.status(201).json(newArticle);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const allarticles = await ArticleModel.find()
      .populate("author")
      .populate("tags");
    return res.status(200).json(allarticles);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const getArticleId = async (req, res) => {
  const { id } = req.params;
  try {
    const articleId = await ArticleModel.findById(id).select(
      "title content excerpt status"
    );
    return res.status(200).json({ articleId });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, status } = req.body;
  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        status,
      },
      { new: true }
    );

    return res.status(200).json({
      data: updatedArticle,
      ok: true,
      msg: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(id);
    return res.status(200).json({
      data: deletedArticle,
      ok: true,
      msg: "Se borro el usuario exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};
