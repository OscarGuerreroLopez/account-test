import { DbMethods } from "../../infra/repo";
import { MakeAddUser } from "./addUser";
import { MakeFindUser } from "./findUser";
import { BuildPassword, MakeToken } from "../../utils";
import { MakeLoginUser } from "./loginUser";

const buildPassword = BuildPassword(10);
const removePassword = buildPassword.removePassword;
const makePassword = buildPassword.makePassword;
const comparePassword = buildPassword.comparePassword;

export const AddUser = MakeAddUser(DbMethods, makePassword);

export const FindUserByEMail = MakeFindUser(
  DbMethods,
  removePassword
).findUserByEmail;

export const FindUserByUserId = MakeFindUser(
  DbMethods,
  removePassword
).findUserByUserId;

export const FindAllUsers = MakeFindUser(
  DbMethods,
  removePassword
).findAllUsers;

export const LoginUser = MakeLoginUser({
  repo: DbMethods,
  comparePassword,
  MakeToken
});

export * from "./interfaces";
