// import { v4 } from "uuid";
// import { AuthService } from "../../services/auth.service";
// import { UserLogin, UserRegister } from "../../interfaces/auth";

// type User = {
//   register: UserRegister;
//   login: UserLogin;
// };

// const user: User = {
//   register: {
//     id: v4(),
//     name: "Emmanuel Kimaru",
//     email: "kimaru1@gmail.com",
//     password: "kimarupwd",
//     country: "Kenya",
//     phoneNumber: "123456789",
//   },
//   login: {
//     email: "kimaru1@gmail.com",
//     password: "kimarupwd",
//   },
// };
// const authService: AuthService = new AuthService();

// describe("Auth Service", () => {
//   it("should register", async () => {
//     const response = await authService.register(user.register);
//     expect(response.success).toBeTruthy;
//     expect(response.data).not.toBeNull;
//   });
// });
