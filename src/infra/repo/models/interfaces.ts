import { ObjectId } from "mongodb";

export interface Model {
  _id?: ObjectId;
}

export interface User extends Model {
  name: string;
  email: string;
  password: string;
  role: string;
  userId: string;
}

export interface Transaction extends Model {
  transactionId: string;
  accountId: string;
  userId: string;
  currency: string;
  amount: number;
  prevBalance: number;
  newBalance: number;
}

export interface Account extends Model {
  accountId: string;
  userId: string;
  currency: string;
  balance: number;
}
