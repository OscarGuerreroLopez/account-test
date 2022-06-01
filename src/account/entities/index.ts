import { BuildMakeAccount } from "./account";
import { BuildMakeTransaction } from "./transaction";
import { NanoUUID, TransactionUtil } from "../../utils";

export const MakeAccount = BuildMakeAccount(NanoUUID);
export const MakeTransaction = BuildMakeTransaction(NanoUUID, TransactionUtil);

export * from "./interfaces";
