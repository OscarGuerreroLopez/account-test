import { Transaction, MakeTransaction } from "../entities";
import { DbMethodsType } from "../../infra/repo";
import {
  FindUserAccount,
  MakeUserTransaction,
  UpdateUserAccount
} from "./interfaces";

export const Maketransaction = (
  repo: DbMethodsType,
  findAccount: FindUserAccount,
  updateAccount: UpdateUserAccount
): MakeUserTransaction => {
  const addTransation = async (
    currency: string,
    userId: string,
    amount: number
  ) => {
    const account = await findAccount(userId, currency);

    const transaction = MakeTransaction({
      accountId: account.accountId,
      userId,
      currency,
      amount,
      prevBalance: account.balance
    });

    const { finalAmount, finalBalanceToString } = transaction.getNewBalance();

    const transactionId = transaction.getTransactionId();
    const accountId = transaction.getAccountId();
    const prevBalance = transaction.getPrevBalance();
    const newBalance = finalAmount;
    const status = transaction.getStatus();

    // set transaction to init in case the update account fails
    await repo("transactions").insert<Transaction>({
      transactionId,
      accountId,
      userId,
      currency,
      amount,
      prevBalance,
      newBalance: finalAmount,
      status
    });

    await updateAccount({
      accountId: account.accountId,
      userId,
      currency,
      balance: newBalance
    });

    // set transaction to done if account is updated
    await repo("transactions").insert<Transaction>({
      transactionId,
      accountId,
      userId,
      currency,
      amount,
      prevBalance,
      newBalance,
      status: "done"
    });

    return `Transaction completed, new balance = ${finalBalanceToString}`;
  };

  return addTransation;
};
