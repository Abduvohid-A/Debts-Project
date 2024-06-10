import { Router } from "express";
import {
  registerController,
  verifyController,
  loginController,
} from "../controllers/users.controller.js";

const router = Router();

router.post("/register", registerController);
router.post("/verify", verifyController);
router.post("/login", loginController);

export default router;
