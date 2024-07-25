import request from "supertest";
import app from "../server";

describe("Events", () => {
  it("should get all events", async () => {
    const response = await request(app).get("/events/all");
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy;
  });
});
