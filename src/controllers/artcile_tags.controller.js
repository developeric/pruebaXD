import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";

export const extraTag = async (req, res) => {
  const { artcileId, tagId } = req.params;
  try {
    const articulo = await ArticleModel.findById(artcileId);
    const tag = await TagModel.findById(tagId);

    const tagAgreggate = await ArticleModel.findByIdAndUpdate(artcileId, {
      $addToSet: { tags: tagId },
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteTagFromArticle = async (req, res) => {
  const { artcileId, tagId } = req.params;
  try {
    const articulo = await ArticleModel.findById(artcileId);
    const tag = await TagModel.findById(tagId);

    const deleteTag = await ArticleModel.findByIdAndUpdate(artcileId, {
      $pull: { tags: tagId },
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
