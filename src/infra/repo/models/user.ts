import { Collection } from "mongodb";
import { Database } from "../index";
import { Model } from ".";
import { Logger } from "../../../utils";

export interface User extends Model {
  name: string;
  email: string;
  password: string;
  role: string;
  userId: string;
}

export const UserRepo = (() => {
  let instance: Collection<User>;

  const makeUserIntance = async () => {
    const db = await Database.getConnection();
    instance = db.collection<User>("users");
    instance.createIndex(
      { userId: 1, email: 1 },
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
