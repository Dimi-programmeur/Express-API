import userController from "../controllers/user.controller.js";
import { Router } from "express";

const userRoutes = Router();

const patternUser = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  GOOGLE: "/google-login",
  GET_USER: "/users",
  GET_USER_BY_ID: "/users/:id",
  UPDATE_USER: "/user/update/:id",
  DELETE_USER: "/user/delete/:id",
  LOGOUT: "/logout",
  REFRESH: "/refresh",
};

userRoutes.get(patternUser.GET_USER, userController.getUsers);
userRoutes.get(patternUser.GET_USER_BY_ID, userController.getUserByID);
userRoutes.get(patternUser.GET_USER, userController.getUsers);
userRoutes.get(patternUser.GET_USER_BY_ID, userController.getUserByID);

userRoutes.post(patternUser.SIGNUP, userController.signup);
userRoutes.post(patternUser.LOGIN, userController.login);
userRoutes.post(patternUser.GOOGLE, userController.google);

userRoutes.post(patternUser.REFRESH, userController.refreshToken);

userRoutes.put(patternUser.UPDATE_USER, userController.updateUser);
userRoutes.put(patternUser.UPDATE_USER, userController.updateUser);

export default userRoutes;
