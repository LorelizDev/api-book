// npm install bcryptjs

import bcrypt from 'bcryptjs';

export const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 10); // itera 10 veces el algoritmo para encriptar la contraseña
  return hash;
};

export const compare = async (passwordPlain, hashPassword) => { // compara la contraseña ingresada con la contraseña encriptada
  return await bcrypt.compare(passwordPlain, hashPassword);
};