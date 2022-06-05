import { DbMethods } from "../../infra/repo";
import { MakeAddUser } from "./addUser";
import { MakeFindUser } from "./findUser";
import { BuildMakeVerifyJwt, BuildPassword } from "../../utils";
import { MakeLoginUser } from "./loginUser";

const buildJwt = BuildMakeVerifyJwt.getInstance();

const buildPassword = BuildPassword(10);
const removePassword = buildPassword.removePassword;
const makePassword = buildPassword.makePassword;
const comparePassword = buildPassword.comparePassword;
const makeToken = buildJwt.makeToken;

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
  makeToken
});

export * from "./interfaces";
