import { Account } from "../entities";

export type AddAccount = (account: Partial<Account>) => Promise<Account>;
export type FindUserAllAccounts = (userId: string) => Promise<Account[]>;

export type UpdateUserAccount = (account: Account) => Promise<Account>;

export type FindUserAccount = (
  userId: string,
  currency: string
) => Promise<Account>;
export interface GetUsersAccount {
  findAllAccounts: FindUserAllAccounts;
  findAccount: FindUserAccount;
}

export type MakeUserTransaction = (
  currency: string,
  userId: string,
  amount: number
) => Promise<string>;
