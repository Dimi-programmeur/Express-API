import { httpCode } from "../static/httpCode.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_ID_CLIENT);

//Generation de l'acces token
const generateAccesToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "5m" },
  );
};

//Generation du  refreshtoken
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
};

const userController = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(httpCode.BAD_REQUEST)
          .json({ message: "Tous les champs sont requis" });
      }
      const emailExist = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExist) {
        return res
          .status(httpCode.BAD_REQUEST)
          .json({ message: "Cet adresse mail exite deja" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          id: uuidv4(),
          name,
          email,
          password: hashPassword,
        },
      });

      return res
        .status(httpCode.CREATED)
        .json({ message: "Utilisateur cree avec succes", newUser });
    } catch (error) {
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
  google: async (req, res) => {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        return res
          .status(httpCode.BAD_REQUEST)
          .json({ message: "error idToken manquant" });
      }

      const isValidToken = await googleClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_ID_CLIENT,
      });

      if (!isValidToken) {
        return res
          .status(httpCode.BAD_REQUEST)
          .json({ message: "idToken invalide" });
      }

      const playload = isValidToken.getPayload();
      console.log(playload);
      const { name, sub: googleId, email } = playload;

      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            id: uuidv4(),
            name,
            email,
            googleId,
          },
        });
      } else if (!user.googleId) {
        user = await prisma.user.update({
          where: { email },
          data: { googleId },
        });
      }

      //Generation des token
      const accesToken = generateAccesToken(user);
      const refreshToken = generateRefreshToken(user);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      return res.status(httpCode.OK).json({
        message: "Connexion avec google reussie",
        token: accesToken,
        refreshToken,
        user: { id: user.id, email: user.email },
      });
    } catch (error) {
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  //login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(httpCode.BAD_REQUEST)
          .json({ message: "Tous les champs sont requis" });
      }
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res
          .status(httpCode.NOT_FOUND)
          .json({ message: "Utilisateur introuvable" });
      }
      const passwordVerif = await bcrypt.compare(password, user.password);
      if (!passwordVerif) {
        return res
          .status(httpCode.BAD_REQUEST)
          .json({ message: "Email ou password incorrecte" });
      }

      //Generation des token
      const accesToken = generateAccesToken(user);
      const refreshToken = generateRefreshToken(user);
      localStorage.setItem("Token", accesToken);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      return res.status(httpCode.OK).json({
        message: "Connexion reussie",
        token: accesToken,
        refreshToken,
        user: { id: user.id, email: user.email },
      });
    } catch (error) {
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: { creatAt: "desc" },
      });

      if (!users) {
        return res
          .status(httpCode.NOT_FOUND)
          .json({ message: "Aucun utilisateur enregistre" });
      }
      return res.status(httpCode.OK).json(users);
    } catch (error) {
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  getUserByID: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return res
          .status(httpCode.NOT_FOUND)
          .json({ message: "Utilisateur introuvable" });
      }
      return res.status(httpCode.OK).json(user);
    } catch (error) {
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res
          .status(httpCode.NOT_FOUND)
          .json({ message: "Utilisateur introuvable" });
      }

      const userUpdate = await prisma.user.update({
        where: { id },
        data: {
          name: name ?? user.name,
          email: email ?? user.email,
          password: password ?? user.password,
        },
      });

      return res
        .status(httpCode.OK)
        .json({ message: "Modification enregistree", userUpdate });
    } catch (error) {
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res
          .status(httpCode.BAD_REQUEST)
          .json({ message: "Veuillez entrer votre refreshToken" });
      }
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });
      if (!user || user.refreshToken !== refreshToken) {
        return res
          .status(httpCode.UNAUTHORIZED)
          .json({ message: "refresh token invalide ou expiré" });
      }
      const newAccesToken = generateAccesToken(user);

      return res.status(httpCode.OK).json({
        message: "Nouveau acces token genere ",
        accesToken: newAccesToken,
      });
    } catch (error) {
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Refresh token expiré" });
    }
  },
};

export default userController;
