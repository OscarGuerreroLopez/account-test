import { body, param } from "express-validator";

export const UserValidator = [
  body("name").exists().withMessage("missing name"),
  body("password")
    .exists()
    .isLength({ min: 4, max: 6 })
    .matches(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    .withMessage("missing or not valid password"),
  body("email")
    .exists()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .withMessage("missing or invalid email")
];

export const UserLoginValidator = [
  body("password")
    .exists()
    .isLength({ min: 4, max: 6 })
    .matches(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    .withMessage("missing or not valid password"),
  body("email")
    .exists()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .withMessage("missing or invalid email")
];

export const GetUserValidator = [
  param("email")
    .exists()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    .withMessage("missing or invalid email")
];

export const AddAccountValidator = [
  body("currency").exists().withMessage("Missing currency")
];

export const AddUserTransationValidator = [
  body("currency").exists().withMessage("Missing currency"),
  body("amount").exists().isNumeric().withMessage("Missing amount")
];
