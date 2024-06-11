import { Router } from "express";
import UsersRoute from "./users.routes.js";
import DebtRoute from "./debts.routes.js";
import AdminRoute from "./admin.routes.js";
import { checkTokenUser, checkTokenAdmin } from "../middlewares/check.token.js";

const router = Router();

router.use("/users", UsersRoute);
router.use("/debts", checkTokenUser, DebtRoute);
router.use("/admin", checkTokenAdmin, AdminRoute);

export default router;
