import { validate as validateUuid } from "uuid";
import { userDb } from "./user.db";
import { User } from "./user.module";

class UserService {
  create(userPayload: Partial<User>): User {
    if (User.isValid(userPayload)) {
      const { username, age, hobbies } = userPayload;
      const user = new User(username, age, hobbies);
      userDb.addUser(user);

      return user;
    } else {
      throw new Error("Create user failed: invalid or empty fields");
    }
  }

  findById(id?: string): User | undefined {
    if (typeof id !== "string" || !validateUuid(id)) {
      throw new Error("Update user failed: invalid user id");
    }

    const user = userDb.getUserById(id);
    return user;
  }

  update(userPayload: Partial<User>): User {
    if (!User.isValid(userPayload)) {
      throw new Error("Update user failed: invalid or empty fields");
    }

    const { id } = userPayload;

    let user = this.findById(id);
    user = {
      ...user,
      ...userPayload,
    };

    return user;
  }
}

export const userService = new UserService();
