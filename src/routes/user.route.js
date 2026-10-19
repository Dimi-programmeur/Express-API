import userController from "../controllers/user.controller.js";
import { Router } from "express";

const userRoutes = Router();

const patternUser = {
<<<<<<< HEAD
    SIGNUP: '/signup',
    LOGIN: '/login',
    GOOGLE: '/google-login',
    GET_USER: '/users',
    GET_USER_BY_ID: '/users/:id',
    UPDATE_USER: '/user/update/:id',
    DELETE_USER: '/user/delete/:id',
    LOGOUT: '/logout',
    REFRESH : '/refresh'
}
=======
  SIGNUP: "/signup",
  LOGIN: "/login",
  GET_USER: "/users",
  GET_USER_BY_ID: "/users/:id",
  UPDATE_USER: "/user/update/:id",
  DELETE_USER: "/user/delete/:id",
  LOGOUT: "/logout",
  REFRESH: "/refresh",
  GOOGLE: "/google",
};
>>>>>>> 855fd6d (feat: ajout de la route /google pour connexion avec compte google...)

userRoutes.get(patternUser.GET_USER, userController.getUsers);
userRoutes.get(patternUser.GET_USER_BY_ID, userController.getUserByID);

<<<<<<< HEAD
userRoutes.get(patternUser.GET_USER, userController.getUsers)
userRoutes.get(patternUser.GET_USER_BY_ID, userController.getUserByID)


userRoutes.post(patternUser.SIGNUP, userController.signup)
userRoutes.post(patternUser.LOGIN, userController.login)
userRoutes.post(patternUser.GOOGLE, userController.google)



userRoutes.post(patternUser.REFRESH, userController.refreshToken)


userRoutes.put(patternUser.UPDATE_USER, userController.updateUser)


export default userRoutes
=======
userRoutes.post(patternUser.SIGNUP, userController.signup);
userRoutes.post(patternUser.LOGIN, userController.login);
userRoutes.post(patternUser.REFRESH, userController.refreshToken);
userRoutes.post(patternUser.GOOGLE, userController.google);
>>>>>>> 855fd6d (feat: ajout de la route /google pour connexion avec compte google...)

userRoutes.put(patternUser.UPDATE_USER, userController.updateUser);

export default userRoutes;
