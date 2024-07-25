import request from "supertest";
import app from "../server";

describe("Auth", () => {
  it("should fail login with invalid data", async () => {
    const response = await request(app).post("/auth/login/user");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: false,
      message: "Invalid data",
      data: null,
    });
  });
  it("should fail login with incorrect details", async () => {
    const response = await request(app)
      .post("/auth/login/user")
      .send({ email: "wrongemail@gmail.com", password: "wrongpassword" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: false,
      message: "Invalid email or password",
      data: null,
    });
  });
  it("should login with details", async () => {
    const response = await request(app)
      .post("/auth/login/organizer")
      .send({ email: "organizer@gmail.com", password: "password" });
    expect(response.status).toBe(200);
    expect(response.body.data).toBeTruthy;
  });
});
