import { User } from "../entities";
import { DbMethodsType } from "../../infra/repo";
import { Logger } from "../../utils";
import { FindUsers, RemovePassword } from "./interfaces";

export const MakeFindUser = (
  repo: DbMethodsType,
  removePassword: RemovePassword
): FindUsers => {
  const findUserByEmail = async (email: string) => {
    try {
      const result = removePassword(
        await repo("users").findOne<User>({ email })
      ) as Partial<User>;

      return result;
    } catch (error) {
      Logger.warn(`User with email ${email} not found`);
      throw new Error("Not able to find user");
    }
  };

  const findUserByUserId = async (userId: string) => {
    try {
      const result = removePassword(
        await repo("users").findOne<User>({ userId })
      ) as Partial<User>;

      return result;
    } catch (error) {
      Logger.warn(`User with userId ${userId} not found`);
      throw new Error("Not able to find user");
    }
  };

  const findAllUsers = async () => {
    try {
      const result = removePassword(
        await repo("users").find<User>({})
      ) as Partial<User>[];

      return result;
    } catch (error) {
      Logger.warn(`User not found`);
      throw new Error("Not able to find user");
    }
  };

  return { findUserByEmail, findAllUsers, findUserByUserId };
};
