import * as winston from "winston";
import { Maketransaction } from "./transaction";
import { DbMethods } from "../../infra/repo";
import { LoadMethods, TestConnection } from "../../infra/repo";
import { AddUsers, AddTestAccount } from "../../infra/repo";
import { MakeFindAccount } from "./getAccount";
import { MakeUpdateAccount } from "./updateAccount";
import { UpdateUserAccount } from "./interfaces";
import { Transaction, Account } from "../entities";

// Avoid writing to logs during testing
jest.mock("../../utils/logger.ts", () => {
  enum Severity {
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
  }
  const Logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ]
  });

  return { Logger, Severity };
});

const UpdateUserAccountMock: UpdateUserAccount = async (account) => {
  expect(account.accountId).toStrictEqual("xZdaIO");
  expect(account.userId).toStrictEqual("AGHxYB");
  return account;
};

const UpdateUserAccountFailMock: UpdateUserAccount = async () => {
  throw "not working";
};

const cleanTransactions = async () => {
  await DbMethods("transactions").deleteAll<Transaction>({
    userId: "AGHxYB",
    accountId: "xZdaIO",
    currency: "USD"
  });
};

const resetAccount = async () => {
  await DbMethods("accounts").updateOne<Account>(
    {
      userId: "AGHxYB",
      currency: "USD"
    },
    { balance: 0 }
  );
};

describe("AddUserTransaction", () => {
  beforeAll(async () => {
    await TestConnection.createConnection();
    await LoadMethods();
    await AddUsers();
    await AddTestAccount();
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  beforeEach(async () => {
    await cleanTransactions();
    await resetAccount();
  });

  it("Should return a transaction", async () => {
    const FindAccount = MakeFindAccount(DbMethods).findAccount;
    const UpdateUserAccount = MakeUpdateAccount(DbMethods);

    const AddUserTransaction = Maketransaction(
      DbMethods,
      FindAccount,
      UpdateUserAccount
    );

    const result = await AddUserTransaction("USD", "AGHxYB", 10.44);

    expect(result).toStrictEqual(
      "Transaction completed, new balance = 10.44 USD"
    );
  });

  it("should update account when called with the right values", async () => {
    const FindAccount = MakeFindAccount(DbMethods).findAccount;
    const AddUserTransaction = Maketransaction(
      DbMethods,
      FindAccount,
      UpdateUserAccountMock
    );

    const result = await AddUserTransaction("USD", "AGHxYB", 10.44);

    expect(result).toStrictEqual(
      "Transaction completed, new balance = 10.44 USD"
    );
  });

  it("should leave the transaction on init if account update fails", async () => {
    const FindAccount = MakeFindAccount(DbMethods).findAccount;
    const AddUserTransaction = Maketransaction(
      DbMethods,
      FindAccount,
      UpdateUserAccountFailMock
    );

    try {
      await AddUserTransaction("USD", "AGHxYB", 10.44);

      expect(true).toBeTruthy();
    } catch (error) {
      const transactions = await DbMethods("transactions").find<Transaction>({
        userId: "AGHxYB",
        accountId: "xZdaIO",
        currency: "USD"
      });

      const result = transactions[0];

      expect(result.amount).toStrictEqual(10.44);
      expect(result.prevBalance).toStrictEqual(0);
      expect(result.newBalance).toStrictEqual(10.44);
      expect(result.status).toStrictEqual("init");

      expect(error).toStrictEqual("not working");
    }
  });
});
