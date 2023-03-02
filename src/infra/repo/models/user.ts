import { Collection } from "mongodb";
import { Database } from "../index";
import { User } from ".";
import { Logger } from "../../../utils";

export const UserRepo = (() => {
  let instance: Collection<User>;

  const makeUserIntance = async () => {
    const db = await Database.getConnection();
    instance = db.collection<User>("users");
    await instance.createIndex(
      { email: 1 },
      { unique: true, background: true }
    );
  };

  return {
    userInstance: async () => {
      if (!instance) {
        await makeUserIntance();
      }

      Logger.info("returning users instance model");

      return instance;
    }
  };
})();
