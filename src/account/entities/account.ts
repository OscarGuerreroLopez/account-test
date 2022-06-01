import { Account, AccountEntity, MakeAccount, MakeId } from "./interfaces";

export const BuildMakeAccount = (NanoUUID: MakeId): MakeAccount => {
  const makeAccount = (account: Partial<Account>) => {
    if (!account.userId || !account.currency) {
      throw new Error("missing params to create account");
    }

    if (!account.accountId) {
      account.accountId = NanoUUID();
    }

    if (!account.balance) {
      account.balance = 0;
    }

    return Object.freeze({
      getId: () => account._id || "",
      getAccountId: () => account.accountId,
      getUserId: () => account.userId,
      getCurrency: () => account.currency,
      getBalance: () => account.balance
    }) as AccountEntity;
  };

  return makeAccount;
};
