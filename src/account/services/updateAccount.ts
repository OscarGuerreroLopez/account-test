import { MakeAccount, Account } from "../entities";
import { DbMethodsType } from "../../infra/repo";
import { UpdateUserAccount } from "./interfaces";

export const MakeUpdateAccount = (repo: DbMethodsType): UpdateUserAccount => {
  const updateAccount = async (account: Account) => {
    const validAccount = MakeAccount(account);

    const actualAccount = await repo("accounts").findOne<Account>({
      userId: account.userId,
      currency: account.currency
    });

    if (Object.keys(actualAccount).length === 0) {
      throw Error(`Account not found ${account.userId} ${account.currency}`);
    }

    const result = await repo("accounts").updateOne<Account>(actualAccount, {
      balance: validAccount.getBalance()
    });

    return result;
  };

  return updateAccount;
};
