export * from "./testConnection";
export * from "./models";
export * from "./dbMethods";
export * from "./seed";

import { EnvVars } from "../../utils";
import { LiveConnection } from "./liveConnection";
import { TestConnection } from "./testConnection";

export const Database =
  EnvVars.NODE_ENV === "prod" ? LiveConnection : TestConnection;
