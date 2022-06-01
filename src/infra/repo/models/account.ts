import { Collection } from "mongodb";
import { Database } from "../index";
import { Model } from ".";
import { Logger } from "../../../utils";

export interface Account extends Model {
  accountId: string;
  userId: string;
  currency: string;
  balance: number;
}

export const AccountRepo = (() => {
  let instance: Collection<Account>;

  const makeAccountIntance = async () => {
    const db = await Database.getConnection();
    instance = db.collection<Account>("accounts");
    instance.createIndex(
      { userId: 1, accountId: 1 },
      { unique: true, background: true }
    );
  };

  return {
    accountInstance: async () => {
      if (!instance) {
        await makeAccountIntance();
      }
      Logger.info("returning account instance model");
      return instance;
    }
  };
})();
