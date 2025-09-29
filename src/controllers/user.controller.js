import { hashPassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    const hashedPassword = await hashPassword(password)

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allusers = await UserModel.find({ isActive: true });
    return res.status(200).json(allusers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const getUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = await UserModel.findById(id).select(
      "username role isActive _id profile"
    );
    return res.status(200).json({ userId });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password,
      },
      { new: true }
    );

    return res.status(200).json({
      data: updatedUser,
      ok: true,
      msg: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: { deletedAt: new Date() },
      },
      { new: true }
    );
    return res.status(200).json({
      data: deletedUser,
      ok: true,
      msg: "Se borro el usuario exitosamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};
