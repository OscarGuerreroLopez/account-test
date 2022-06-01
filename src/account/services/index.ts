import { DbMethods } from "../../infra/repo";
import { MakeAddAccount } from "./addAccount";
import { MakeFindAccount } from "./getAccount";
import { MakeUpdateAccount } from "./updateAccount";
import { Maketransaction } from "./transaction";

export const AddAccount = MakeAddAccount(DbMethods);
export const FindAllAccounts = MakeFindAccount(DbMethods).findAllAccounts;
export const FindAccount = MakeFindAccount(DbMethods).findAccount;
export const UpdateUserAccount = MakeUpdateAccount(DbMethods);
export const AddUserTransaction = Maketransaction(
  DbMethods,
  FindAccount,
  UpdateUserAccount
);

export * from "./interfaces";
