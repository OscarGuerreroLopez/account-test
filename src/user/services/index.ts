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

export const {
  findUserByEmail: FindUserByEMail,
  findUserByUserId: FindUserByUserId,
  findAllUsers: FindAllUsers
} = MakeFindUser(DbMethods, removePassword);

export const LoginUser = MakeLoginUser({
  repo: DbMethods,
  comparePassword,
  MakeToken
});

export * from "./interfaces";
