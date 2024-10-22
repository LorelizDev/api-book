import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import { handleHttpError } from "../utils/handleError.js";
import { encrypt, compare } from "../utils/handlePassword.js";

dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordHashed = await encrypt(password);

    const newUser = {
      name,
      email,
      password: passwordHashed,
    };
    
    const existingUserByEmail = await userModel.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const existingUserByName = await userModel.findOne({ where: { name } });
    if (existingUserByName) {
      return res.status(409).json({ message: "Name already in use" });
    };

    await userModel.create(newUser);

    res.status(201).json({ message: "✅ User created successfully" });;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error creating user" });
  }
};

export const loginController = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const loginPassword = req.body.password;

    const user = await userModel.findOne({ where: { email: userEmail } });
    if (!user) {
      handleHttpError(res, "❌ USER_NOT_EXISTS", 404);
      return;
    }

    const passwordHashed = user.password;
    const checkPassword = await compare(loginPassword, passwordHashed);

    if (!checkPassword) {
      handleHttpError(res, "❌ PASSWORD_INVALID", 401);
      return;
    }

    const sessionData = {
      user: user,
    };

    res.send({ sessionData });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "❌ ERROR_LOGIN_USER");
  }
};