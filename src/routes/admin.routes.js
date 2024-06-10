import { Router } from "express";
import {
    getAllUsersController,
    updateUserController,
    deleteUserController,
} from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", getAllUsersController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;