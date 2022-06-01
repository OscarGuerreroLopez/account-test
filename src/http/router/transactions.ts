import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AddUserTransationValidator } from "./validators";
import { ValidatorMiddleware, UserAuthMiddleware } from "../middleware";
import { AddUserTransaction } from "../handlers";

const router = Router();

router.post(
  "/",
  AddUserTransationValidator,
  ValidatorMiddleware,
  UserAuthMiddleware,
  asyncHandler(AddUserTransaction)
);

export default router;
