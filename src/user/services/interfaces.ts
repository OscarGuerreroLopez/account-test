import { User } from "../entities";
import { DbMethodsType } from "../../infra/repo";
import { ComparePassword, MakeToken } from "../../utils";

export type AddUser = (user: User) => Promise<boolean>;

export type FindUserByEmail = (email: string) => Promise<Partial<User>>;
export type FindUserByUserid = (id: string) => Promise<Partial<User>>;
export type FindAllUsers = () => Promise<Partial<User>[]>;
export interface FindUsers {
  findUserByEmail: FindUserByEmail;
  findUserByUserId: FindUserByUserid;
  findAllUsers: FindAllUsers;
}

export type RemovePassword = <T>(
  items: T | T[]
) => IObjectLiteral[] | IObjectLiteral;

export type MakePassword = (plainPassword: string) => Promise<string>;

export interface MakeLoginUserParams {
  repo: DbMethodsType;
  comparePassword: ComparePassword;
  makeToken: MakeToken;
}

export interface LoginUserParams {
  email: string;
  password: string;
  userAgent: string;
  clientIp: string;
}
export type LoginUser = (params: LoginUserParams) => Promise<string>;
