import { DbMethods } from "../../infra/repo";
import { MakeAddAccount } from "./addAccount";
import { MakeFindAccount } from "./getAccount";
import { MakeUpdateAccount } from "./updateAccount";
import { Maketransaction } from "./transaction";

export const AddAccountService = MakeAddAccount(DbMethods);

export const {
  findAllAccounts: FindAllAccountsService,
  findAccount: FindAccountService
} = MakeFindAccount(DbMethods);

export const UpdateUserAccountService = MakeUpdateAccount(DbMethods);

export const AddUserTransactionService = Maketransaction(
  DbMethods,
  FindAccountService,
  UpdateUserAccountService
);

export * from "./interfaces";
