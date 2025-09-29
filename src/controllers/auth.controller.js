import { comparePassword } from "../helpers/bcrypt.helper.js";
import {
  generateToken,
  verifyToken
} from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    const isAuthenticated = await comparePassword(password, user.password);

    if (!isAuthenticated || !user) {
      throw new Error("Las credenciales son incorrectas");
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return {};
};

export const getProfile = async (req, res) => {
  try {
    // El usuario está en req.user gracias al middleware authMiddleware
    // req.user contiene { id, email, role } del token
    console.log("=======ERROR========",req.user.id);
    const userId = req.user.id;

    // Buscar usuario en la base de datos (excluyendo el password)
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      msg: "Perfil obtenido exitosamente",
    });
  } catch (error) {
    console.log("Error en getProfile:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
