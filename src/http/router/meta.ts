import { Router } from "express";
import asyncHandler from "express-async-handler";

import { Meta } from "../handlers";

const router = Router();

router.get("/", asyncHandler(Meta));

export default router;
