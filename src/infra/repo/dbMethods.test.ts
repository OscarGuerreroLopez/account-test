import { DbMethods, LoadMethods } from "./dbMethods";
import { TestConnection, User } from ".";

describe("DB methods test", () => {
  beforeAll(async () => {
    await LoadMethods();
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  it("should insert a record into users", async () => {
    const result = await DbMethods("users").insert<User>({
      name: "Oscar",
      email: "oscar@oscar.com",
      password: "Abc123",
      role: "User",
      userId: "1"
    });

    const user = await DbMethods("users").findOne<User>({ name: "Oscar" });

    expect(result).toBeTruthy();
    expect(user.name).toStrictEqual("Oscar");
    expect(user.password).toStrictEqual("Abc123");
    expect(user.email).toStrictEqual("oscar@oscar.com");
  });

  it("Should fail cause table not in DB", async () => {
    try {
      await DbMethods("usersx").findOne<User>({ name: "Oscar" });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toStrictEqual("table usersx not found in db");
      }
    }
  });

  it("should update a record in users", async () => {
    const result = await DbMethods("users").updateOne<User>(
      {
        name: "Oscar",
        email: "oscar@oscar.com",
        password: "Abc123"
      },
      {
        name: "Oscar",
        email: "oscar@oscar.es",
        password: "Abc123"
      }
    );

    const user = await DbMethods("users").findOne<User>({ name: "Oscar" });

    expect(result).toBeTruthy();
    expect(user.name).toStrictEqual("Oscar");
    expect(user.password).toStrictEqual("Abc123");
    expect(user.email).toStrictEqual("oscar@oscar.es");
  });

  it("should insert a record if does not exists", async () => {
    const result = await DbMethods("users").updateOne<User>(
      {
        name: "Maria",
        email: "maria@gmail.com",
        password: "Abc123"
      },
      {
        name: "Maria",
        email: "maria@hotmail.com",
        password: "Abc123"
      }
    );

    const user = await DbMethods("users").findOne<User>({ name: "Maria" });

    expect(result).toBeTruthy();
    expect(user.name).toStrictEqual("Maria");
    expect(user.password).toStrictEqual("Abc123");
    expect(user.email).toStrictEqual("maria@hotmail.com");
  });

  it("should delete all records in users for specific user", async () => {
    await DbMethods("users").insert<User>({
      name: "Oscar",
      email: "oscar555@oscar.com",
      password: "Abc123",
      role: "User",
      userId: "1"
    });

    await DbMethods("users").insert<User>({
      name: "Oscar",
      email: "oscar666@oscar.com",
      password: "Abc123",
      role: "User",
      userId: "1"
    });
    const users = await DbMethods("users").find<User>({ name: "Oscar" });

    const userCount = users.length;

    // to make sure we have records
    expect(userCount).toBeGreaterThanOrEqual(2);

    const deleteResult = await DbMethods("users").deleteAll<User>({
      name: "Oscar"
    });

    expect(deleteResult).toBeTruthy();

    const usersAfterDelete = await DbMethods("users").find<User>({
      name: "Oscar"
    });

    // to make sure we have deleted all records
    expect(usersAfterDelete.length).toStrictEqual(0);
  });
});
