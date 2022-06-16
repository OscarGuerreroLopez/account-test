import { Router } from "express";

import meta from "./meta";
import user from "./user";
import account from "./account";
import transaction from "./transactions";
import metrics from "./metrics";

const router = Router();

// routes
router.use("/meta", meta);
router.use("/user", user);
router.use("/account", account);
router.use("/transaction", transaction);
router.use("/metrics", metrics);

export default router as Router;
