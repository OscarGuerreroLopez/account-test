import { Collection } from "mongodb";
import { Database } from "../index";
import { Transaction } from "../";
import { Logger } from "../../../utils";

export const TransactionRepo = (() => {
  let instance: Collection<Transaction>;

  const makeTransactionIntance = async () => {
    const db = await Database.getConnection();
    instance = db.collection<Transaction>("transactions");
    await instance.createIndex(
      { userId: 1, accountId: 1, transactionId: 1 },
      { unique: false, background: true }
    );
  };

  return {
    transactionInstance: async () => {
      if (!instance) {
        await makeTransactionIntance();
      }
      Logger.info("returning transaction instance model");
      return instance;
    }
  };
})();
