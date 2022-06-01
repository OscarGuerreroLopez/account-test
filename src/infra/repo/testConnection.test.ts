import { Collection, Db } from "mongodb";
import { TestConnection } from "./testConnection";

describe("testing DB Connection", () => {
  let db: Db;
  let personsCollection: Collection<{ name: string }>;

  beforeAll(async () => {
    db = await TestConnection.getConnection();
    personsCollection = db.collection("persons");
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  it("Should connect to mongoDb correctly", async () => {
    const result = await personsCollection.insertOne({ name: "Oscar" });

    expect(result.acknowledged).toBeTruthy();
  });

  it("should insert and retrieve a person", async () => {
    await personsCollection.insertOne({ name: "Mike" });
    const result = await personsCollection.findOne({ name: "Mike" });

    expect(result?.name).toStrictEqual("Mike");
  });
});
