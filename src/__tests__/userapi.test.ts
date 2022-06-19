import request from "supertest";
import { URLS, server } from "../index";

const requestApp = request(server);

describe("User routes", () => {
  let id = "";
  const userPayload = { username: "User name", age: 17, hobbies: [] };

  it("Should request all users and get an empty array", async () => {
    const res = await requestApp.get(URLS.user);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it("Should return newly created user", async () => {
    const res = await requestApp.post(URLS.user).send(userPayload);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username");
    expect(res.body.username).toEqual(userPayload.username);
    expect(res.body).toHaveProperty("age");
    expect(res.body.age).toEqual(userPayload.age);
    expect(res.body).toHaveProperty("hobbies");
    expect(res.body.hobbies).toEqual(userPayload.hobbies);

    id = res.body.id;
  });

  it("Should return user by it's id", async () => {
    const res = await requestApp.get(`${URLS.user}/${id}`);

    expect(res.body).toEqual({
      id,
      ...userPayload,
    });
  });

  it("Should update the user and return it with the same id", async () => {
    const updatedPayload = {
      ...userPayload,
      hobbies: ["sports"],
    };
    const res = await requestApp.put(`${URLS.user}/${id}`).send(updatedPayload);

    expect(res.body).toEqual({
      id,
      ...updatedPayload,
    });
  });

  it("Should delete the user with the correct status code [no content]", async () => {
    const res = await requestApp.delete(`${URLS.user}/${id}`);

    expect(res.statusCode).toEqual(204);
  });

  it("Should return ann error when trying to get non-existing user", async () => {
    const res = await requestApp.get(`${URLS.user}/${id}`).expect(404);

    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual(`User with id: ${id} is not found`);
  });

  afterAll(() => {
    server.close();
  });
});
