import { MakeAccount, Account } from "../entities";
import { DbMethodsType } from "../../infra/repo";
import { AddAccount } from "./interfaces";

export const MakeAddAccount = (repo: DbMethodsType): AddAccount => {
  const addAccount = async (account: Partial<Account>) => {
    const validAccount = MakeAccount(account);

    const accountExists = await repo("accounts").findOne<Account>({
      currency: validAccount.getCurrency(),
      userId: validAccount.getUserId()
    });

    if (Object.keys(accountExists).length > 0) {
      throw Error(
        `User ${validAccount.getUserId()} already has an account in ${validAccount.getCurrency()}`
      );
    }

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
