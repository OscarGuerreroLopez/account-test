import { ObjectId } from "mongodb";

export * from "./user";
export * from "./account";
export * from "./transaction";

export interface Model {
  _id?: ObjectId;
}
