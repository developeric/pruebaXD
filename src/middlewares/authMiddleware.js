import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
      // 1. Obtener el token de las cookies
      const token = req.cookies.token;

    // 2. Si no hay token, error
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No estás autenticado",
      });
    }

    // 3. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Agregar usuario al request
    req.user = decoded;

    // 5. Continuar
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token inválido o expirado",
    });
  }
};
