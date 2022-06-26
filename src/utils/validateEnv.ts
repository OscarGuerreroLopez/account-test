import { cleanEnv, str, num, bool } from "envalid";

export enum NodeEnvEnum {
  DEVELOPMENT = "development",
  TEST = "test",
  PROD = "prod"
}

const getEnvVars = (): EnvObject => {
  const EnvVars = cleanEnv(process.env, {
    NODE_ENV: str({ choices: Object.values(NodeEnvEnum) }),
    PORT: num(),
    SECRET: str(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_URL: str(),
    REDIS_PORT: num({ default: 6379 }),
    REDIS_HOST: str({ default: "localhost" }),
    ES_INDEX: str(),
    ES_NODE: str(),
    LOG_LEVEL: str(),
    APM_URL: str(),
    APM_ENABLE: bool({ default: false })
  });

  return EnvVars as EnvObject;
};

export const EnvVars = getEnvVars();
