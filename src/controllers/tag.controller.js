import { get } from "mongoose";
import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  const { name, description, article } = req.body;
  try {
    const createTag = await TagModel.create({
      name,
      description,
      article,
    });
    return res.status(200).json({
      data: createTag,
      ok: true,
      msg: "Se creo una tag exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Error interno del serividor",
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const getAll = await TagModel.find();
    return res.status(200).json({
      data: getAll,
      ok: true,
      msg: "Se trajo todas las tags exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del serividor",
    });
  }
};

export const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const getTag = await TagModel.findById(id).populate("article");
    return res.status(200).json({
      data: getTag,
      ok: true,
      msg: "Se trajo una tag por id correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedTag = await TagModel.findByIdAndUpdate(
      id,
      { name, description },
      {
        new: true,
      }
    );
    return res.status(200).json({
      data: updatedTag,
      ok: false,
      msg: "Se actualizo correctamente una Tag",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTag = await TagModel.findByIdAndDelete(id);
    return res.status(200).json({
      data: deletedTag,
      ok: false,
      msg: "Se relimino exitosamente una Tag",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
