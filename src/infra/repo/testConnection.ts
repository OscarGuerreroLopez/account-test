import { Db, MongoClient, MongoServerError } from "mongodb";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { Logger } from "../../utils";

export const TestConnection = (() => {
  let mongoClient: MongoClient;
  let db: Db;

  const createConnection = async () => {
    try {
      const replSet = await MongoMemoryReplSet.create({
        replSet: { storageEngine: "wiredTiger" },
        binary: { version: "4.4.10" }
      });

      const replicaUri = replSet.getUri();
      Logger.info(`DB will be located at ${replicaUri}`);

      mongoClient = new MongoClient(replicaUri, {
        maxPoolSize: 10,
        minPoolSize: 5
      });
      await mongoClient.connect();
      db = mongoClient.db("memoryDB");
      Logger.info("memoryDB activated");
    } catch (error) {
      if (error instanceof MongoServerError) {
        Logger.error(`Error connecting to the DB server: ${error}`); // special case for some reason
      }
      throw error;
    }
  };

  return {
    getConnection: async () => {
      if (!db) {
        await createConnection();
      }
      return db;
    },
    closeConnection: async () => {
      if (mongoClient) {
        await mongoClient.close();
      }
    },
    checkConnection: async () => {
      if (!db) {
        await createConnection();
      }

      return true;
    }
  };
})();
