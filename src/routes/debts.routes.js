import { Router } from "express";
import {
  createDebtController,
  getAllDebtsController,
  updateDebtController,
  deleteDebtController,
} from "../controllers/debts.controller.js";

const router = Router();

router.post("/", createDebtController);
router.get("/", getAllDebtsController);
router.put("/:id", updateDebtController);
router.delete("/:id", deleteDebtController);

export default router;
