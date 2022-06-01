export interface Account {
  _id?: string;
  accountId: string;
  userId: string;
  currency: string;
  balance: number;
}

export type MakeId = () => string;

export interface AccountEntity {
  getId: () => string;
  getAccountId: () => string;
  getUserId: () => string;
  getCurrency: () => string;
  getBalance: () => number;
}

export interface Transaction {
  _id?: string;
  transactionId: string;
  accountId: string;
  userId: string;
  currency: string;
  amount: number;
  prevBalance: number;
  newBalance: number;
  status: string;
}
export interface TransactionEntity {
  getId: () => string;
  getTransactionId: () => string;
  getAccountId: () => string;
  getUserId: () => string;
  getCurrency: () => string;
  getAmount: () => number;
  getPrevBalance: () => number;
  getNewBalance: () => {
    finalBalance: string;
    finalBalanceToString: string;
    finalAmount: number;
  };
  getStatus: () => string;
}

export type MakeAccount = (
  aacount: Partial<Account>
) => Readonly<AccountEntity>;

export type MakeTransaction = (
  transaction: Partial<Transaction>
) => Readonly<TransactionEntity>;
