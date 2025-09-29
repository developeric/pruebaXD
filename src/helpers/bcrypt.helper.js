import bcrypt from "bcryptjs";

//HASHEO LA CONTRASEÑA
export const hashPassword = async (password) => {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
};

//COMPARO LA CONTRASEÑA
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
