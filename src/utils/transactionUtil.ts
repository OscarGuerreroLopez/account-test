import { Money } from "ts-money";

export type TransactionType = (
  initialBalance: number,
  currentTransaction: number,
  currency: string
) => {
  finalBalance: string;
  finalBalanceToString: string;
  finalAmount: number;
};

export const TransactionUtil: TransactionType = (
  initialBalance: number,
  currentTransaction: number,
  currency: string
) => {
  const balance = Money.fromDecimal(initialBalance, currency);
  const transaction = Money.fromDecimal(Math.abs(currentTransaction), currency);
  let result: Money;

  if (currentTransaction >= 0) {
    result = balance.add(transaction);
  } else {
    result = balance.subtract(transaction);
  }

  if (result.getAmount() < 0) {
    throw new Error("Insuficient balance");
  }

  return {
    finalBalance: result.toDecimal().toFixed(2),
    finalBalanceToString: `${result.toDecimal().toFixed(2)} ${
      result.getCurrencyInfo().code
    }`,
    finalAmount: result.toDecimal()
  };
};
