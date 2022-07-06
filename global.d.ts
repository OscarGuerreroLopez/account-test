export {};

declare global {
  interface EnvObject {
    PORT: number;
    NODE_ENV: string;
    SECRET: string;
    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_URL: string;
    REDIS_PORT: number;
    REDIS_HOST: string;
    ES_INDEX: string;
    ES_NODE: string;
    LOG_LEVEL: string;
    APM_URL: string;
    APM_ENABLE: boolean;
  }

  type IObjectLiteral = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };

  type Database = {
    collection: (collection: string) => IObjectLiteral;
  };

  interface TokenPayload {
    id: string;
    role: string;
    userAgent: string;
    clientIp: string;
  }

  type RequestUser = {
    name: string;
    email: string;
    role: string;
    userId: string;
  };
}
