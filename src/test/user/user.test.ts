import express from "express";

import Router from "../../http/router";
import request from "supertest";
import { LoadMethods, TestConnection, DbMethods, User } from "../../infra/repo";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", Router);

describe("user routes test", () => {
  beforeAll(async () => {
    await LoadMethods();
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  it("should get meta ok", async () => {
    const response = await request(app).get("/meta");

    expect(response.body).toStrictEqual({
      message: "I am alive",
      dbConnection: true
    });

    expect(response.status).toEqual(200);
  });

  it("should add a user", async () => {
    const payload = {
      name: "Oscar",
      password: "Abc123",
      email: "oscarlopez@gmail.com"
    };
    const response = await request(app)
      .post("/user/register")
      .set("accept", "*/*")
      .set("content-type", "application/json")
      .set("accept-encoding", "gzip, deflate, br")
      .send(payload);

    expect(response.body).toStrictEqual({
      result: true
    });
    expect(response.status).toEqual(200);

    const insertedUser = await DbMethods("users").findOne<User>({
      email: "oscarlopez@gmail.com"
    });

    expect(insertedUser.name).toStrictEqual("Oscar");
    expect(insertedUser.role).toStrictEqual("User");
  });

  it("should add a user and fail", async () => {
    const payload = {
      name: "Oscar",
      password: "Abc123",
      email: "oscarlopez@gmail.com"
    };
    const response = await request(app)
      .post("/user/register")
      .set("accept", "*/*")
      .set("content-type", "application/json")
      .set("accept-encoding", "gzip, deflate, br")
      .send(payload);

    expect(response.body).toStrictEqual({
      message: "Register issue, check logs"
    });
    expect(response.status).toEqual(500);
  });

  it("should add a user and fail", async () => {
    const payload = {
      name: "Oscar",
      password: "Abc123"
    };
    const response = await request(app)
      .post("/user/register")
      .set("accept", "*/*")
      .set("content-type", "application/json")
      .set("accept-encoding", "gzip, deflate, br")
      .send(payload);

    expect(response.body).toStrictEqual({
      message: "Wrong params, check logs"
    });
    expect(response.status).toEqual(400);
  });
});
