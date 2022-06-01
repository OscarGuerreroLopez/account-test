import { Account } from "../entities";
import { DbMethodsType } from "../../infra/repo";
import { GetUsersAccount } from "./interfaces";

export const MakeFindAccount = (repo: DbMethodsType): GetUsersAccount => {
  const findAllAccounts = async (userId: string) => {
    const result = await repo("accounts").find<Account>({
      userId
    });

    return result;
  };

  const findAccount = async (userId: string, currency: string) => {
    const result = await repo("accounts").findOne<Account>({
      userId,
      currency
    });

    if (Object.keys(result).length === 0) {
      throw Error(`Account not found ${userId} ${currency}`);
    }

    return result;
  };

  return { findAllAccounts, findAccount };
};
