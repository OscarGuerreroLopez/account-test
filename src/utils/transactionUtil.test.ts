import { TransactionUtil } from "./transactionUtil";

describe("TransactionUtil", () => {
  it("should return a good amount of transactions", () => {
    const result = TransactionUtil(40, 20, "EUR");

    const parseAmount = result.finalBalance.toString();
    expect(parseAmount).toStrictEqual("60.00");
    expect(result.finalBalanceToString).toStrictEqual("60.00 EUR");
  });

  it("should return an error cause there is no sufficient funds", () => {
    expect.assertions(2);
    try {
      TransactionUtil(20, -40, "USD");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toStrictEqual("Insuficient balance");
      }
    }
  });

  it("should return an error if currency is not found", () => {
    expect.assertions(2);
    try {
      TransactionUtil(20, -40, "XXX");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toStrictEqual("Invalid currency");
      }
    }
  });

  it("should return handle decimals correctly", () => {
    const result = TransactionUtil(20.1, 40.12, "USD");
    const parseAmount = result.finalBalance.toString();

    expect(result.finalBalanceToString).toStrictEqual("60.22 USD");
    expect(parseAmount).toStrictEqual("60.22");
  });
});
