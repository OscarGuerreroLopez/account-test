import {
  Transaction,
  TransactionEntity,
  MakeTransaction,
  MakeId
} from "./interfaces";

import { TransactionType } from "../../utils";

export const BuildMakeTransaction = (
  NanoUUID: MakeId,
  transactionUtil: TransactionType
): MakeTransaction => {
  const makeTransaction = (transaction: Partial<Transaction>) => {
    if (
      !transaction.userId ||
      !transaction.currency ||
      !transaction.accountId
    ) {
      throw new Error("missing params to create transaction");
    }
    const getNewBalance = () => {
      if (!transaction.amount) {
        throw new Error("amount missing");
      }

      if (!transaction.currency) {
        throw new Error("Missing prev balance or currency ");
      }

      const result = transactionUtil(
        transaction.prevBalance || 0,
        transaction.amount,
        transaction.currency
      );

      return result;
    };

    if (!transaction.transactionId) {
      transaction.transactionId = NanoUUID();
    }

    if (!transaction.status) {
      transaction.status = "init";
    }

    return Object.freeze({
      getId: () => transaction._id || "",
      getTransactionId: () => transaction.transactionId,
      getAccountId: () => transaction.accountId,
      getUserId: () => transaction.userId,
      getCurrency: () => transaction.currency,
      getAmount: () => transaction.amount,
      getPrevBalance: () => transaction.prevBalance,
      getNewBalance,
      getStatus: () => transaction.status
    }) as TransactionEntity;
  };

  return makeTransaction;
};
