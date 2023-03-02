import { Collection } from "mongodb";
import { Database } from "../index";
import { Account } from ".";
import { Logger } from "../../../utils";

export const AccountRepo = (() => {
  let instance: Collection<Account>;

  const makeAccountIntance = async () => {
    const db = await Database.getConnection();
    instance = db.collection<Account>("accounts");
    await instance.createIndex(
      { userId: 1, currency: 1 },
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
