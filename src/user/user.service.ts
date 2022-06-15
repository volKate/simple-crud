import { userDb } from "../db/users";
import { User } from "../modules";

class UserService {
  create(userPayload: Partial<User>): User {
    if (User.isValid(userPayload)) {
      const { username, age, hobbies } = userPayload;
      const user = new User(username, age, hobbies);
      userDb.add(user);

      return user;
    } else {
      throw new Error("Create user failed: invalid or empty fields");
    }
  }
}

export const userService = new UserService();
