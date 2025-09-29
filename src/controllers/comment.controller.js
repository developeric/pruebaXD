import { CommentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  const { content, author, article } = req.body;
  try {
    const newComment = await CommentModel.create({
      content,
      author,
      article,
    });
    return res.status(200).json({
      data: newComment,
      ok: true,
      msg: "Se creo un comentario exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const allComments = await CommentModel.find().populate(
      "author",
      "username email"
    );
    return res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getCommentId = async (req, res) => {
  const { id } = req.params;
  try {
    const commentId = await CommentModel.findById(id).select(
      "content author article"
    );
    return res.status(200).json({ commentId });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      {
        content,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(id);
    return res.status(200).json({
      data: deletedComment,
      ok: true,
      msg: "Comentario eliminado exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getCommentArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const commentArticle = await CommentModel.find({
      article: articleId,
    }).populate("author", "-password");
    return res.status(200).json({
      data: commentArticle,
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getComentLoged = async (req, res) => {
  const { id } = req.user;
  try {
    const userComments = await CommentModel.find({ author: id });
    return res.status(200).json({
      data: userComments,
      ok: true,
      msg: "operacion exitosa",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
