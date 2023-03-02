import { MakeAccount, Account } from "../entities";
import { DbMethodsType } from "../../infra/repo";
import { AddAccount } from "./interfaces";

export const MakeAddAccount = (repo: DbMethodsType): AddAccount => {
  const addAccount = async (account: Partial<Account>) => {
    const validAccount = MakeAccount(account);

    const result = await repo("accounts").insert<Account>({
      accountId: validAccount.getAccountId(),
      userId: validAccount.getUserId(),
      currency: validAccount.getCurrency(),
      balance: validAccount.getBalance()
    });

    if (!result) {
      throw new Error("Not able to insert user");
    }

    return {
      accountId: validAccount.getAccountId(),
      userId: validAccount.getUserId(),
      currency: validAccount.getCurrency(),
      balance: validAccount.getBalance()
    };
  };

  return addAccount;
};
