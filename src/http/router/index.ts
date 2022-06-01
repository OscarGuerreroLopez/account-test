import { Router } from "express";

import meta from "./meta";
import user from "./user";
import account from "./account";
import transaction from "./transactions";

const router = Router();

// routes
router.use("/meta", meta);
router.use("/user", user);
router.use("/account", account);
router.use("/transaction", transaction);

export default router as Router;
