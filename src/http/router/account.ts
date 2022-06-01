import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AddAccountValidator } from "./validators";
import { AddAccount, FindAllAccounts, FindAccount } from "../handlers";
import { ValidatorMiddleware, UserAuthMiddleware } from "../middleware";

const router = Router();

router.post(
  "/register",
  AddAccountValidator,
  ValidatorMiddleware,
  UserAuthMiddleware,
  asyncHandler(AddAccount)
);

router.get("/list", UserAuthMiddleware, asyncHandler(FindAllAccounts));

router.get("/:currency", UserAuthMiddleware, asyncHandler(FindAccount));

export default router;
