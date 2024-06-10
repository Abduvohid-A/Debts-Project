import { Router } from "express";
import UsersRoute from "./users.routes.js";
// import DebtRoute from "./debts.routes.js";
// import AdminRoute from "./admin.routes.js";

const router = Router();

router.use("/users", UsersRoute);
// router.use("/debts", DebtRoute);
// router.use("/admin", AdminRoute);

export default router;