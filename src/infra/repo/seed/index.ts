import { BuildPassword, Logger } from "../../../utils";
import { DbMethods } from "../dbMethods";
import { User, Account } from "../models";

export const AddAdminUser = async (): Promise<void> => {
  try {
    const buildPassword = BuildPassword(10);
    const makePassword = buildPassword.makePassword;
    const hashPassword = await makePassword("Abc123");

    const user = {
      name: "Admin",
      email: "admin@oscar.com",
      password: hashPassword,
      role: "Admin",
      userId: "8130k9"
    };

    const userFound = await DbMethods("users").findOne({ userId: user.userId });

    if (Object.keys(userFound).length === 0) {
      await DbMethods("users").insert<User>(user);
      Logger.info("Added admin initial load");
    } else {
      Logger.info("admin already in DB");
    }
  } catch (error) {
    throw new Error("Not able to add admin user");
  }
};

export const AddUsers = async (): Promise<void> => {
  try {
    const buildPassword = BuildPassword(10);
    const makePassword = buildPassword.makePassword;
    const hashPassword = await makePassword("Abc123");
    let user = {
      name: "User",
      email: "user1@oscar.com",
      password: hashPassword,
      role: "User",
      userId: "AGHxYB"
    };

    let userFound = await DbMethods("users").findOne({ userId: user.userId });

    if (Object.keys(userFound).length === 0) {
      await DbMethods("users").insert<User>(user);
      Logger.info("Added user1 initial load");
    } else {
      Logger.info("user1 already in DB");
    }

    user = {
      name: "User",
      email: "user2@oscar.com",
      password: hashPassword,
      role: "User",
      userId: "gbH_us"
    };

    userFound = await DbMethods("users").findOne({ userId: user.userId });

    if (Object.keys(userFound).length === 0) {
      await DbMethods("users").insert<User>(user);
      Logger.info("Added user2 initial load");
    } else {
      Logger.info("user2 already in DB");
    }
  } catch (error) {
    throw new Error("Not able to add admin user");
  }
};

export const AddTestAccount = async (): Promise<void> => {
  try {
    const account = {
      accountId: "xZdaIO",
      userId: "AGHxYB",
      currency: "USD",
      balance: 0
    };

    const foundAccount = await DbMethods("accounts").findOne({
      accountId: "xZdaIO",
      userId: "AGHxYB",
      currency: "USD"
    });

    if (Object.keys(foundAccount).length === 0) {
      await DbMethods("accounts").insert<Account>(account);
      Logger.info("Added account initial load");
    } else {
      Logger.info("account already in DB");
    }
  } catch (error) {
    throw new Error("Not able to add user test account");
  }
};
