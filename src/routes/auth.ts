import { Router } from "express";
import AuthController from "../api/controllers/AuthController";
import { checkJwt } from "../api/middlewares/checkJwt";
import { checkRole } from "../api/middlewares/checkRole";

const router = Router();

//Info
router.get("/info", [checkJwt, checkRole()], AuthController.getInfo);
//Login route
router.post("/login", AuthController.login);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
