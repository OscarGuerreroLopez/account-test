import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  UserValidator,
  GetUserValidator,
  UserLoginValidator
} from "./validators";
import {
  AdminAuthMiddleware,
  ValidatorMiddleware,
  UserAuthMiddleware
} from "../middleware";

import { Register, Login, GetUser, GetAllUsers } from "../handlers";

const router = Router();

router.post(
  "/register",
  UserValidator,
  ValidatorMiddleware,
  asyncHandler(Register)
);
router.post(
  "/login",
  UserLoginValidator,
  ValidatorMiddleware,
  asyncHandler(Login)
);

router.get("/all", AdminAuthMiddleware, asyncHandler(GetAllUsers));

router.get(
  "/:email",
  GetUserValidator,
  ValidatorMiddleware,
  UserAuthMiddleware,
  asyncHandler(GetUser)
);

export default router;
