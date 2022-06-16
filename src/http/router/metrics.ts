import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Metrics } from "../handlers";

const router = Router();

router.get("/", asyncHandler(Metrics));

export default router;
