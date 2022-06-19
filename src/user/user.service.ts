import { OPERATIONS, OPERATION_ERRORS } from "../constants";
import { getOperationFailedMessage, isValidId } from "../helpers";
import { userDb } from "./user.db";
import { User } from "./user.module";

class UserService {
  static validateId(id?: string, operationName = "Operation") {
    if (!isValidId(id)) {
      throw new Error(
        getOperationFailedMessage(operationName, OPERATION_ERRORS.id)
      );
    }
  }

  create(userPayload: Partial<User>): User {
    if (!User.isValid(userPayload)) {
      throw new Error(
        getOperationFailedMessage(OPERATIONS.create, OPERATION_ERRORS.fields)
      );
    }

    const { username, age, hobbies } = userPayload;
    const user = new User(username, age, hobbies);
    userDb.addUser(user);

    return user;
  }

  findAll(): User[] {
    return userDb.users;
  }

  findById(id?: string): User | undefined {
    UserService.validateId(id, OPERATIONS.get);
    const user = userDb.getUserById(id!);
    return user;
  }

  removeById(id?: string): User | undefined {
    UserService.validateId(id, OPERATIONS.delete);
    const deletedUser = userDb.removeUserById(id!);
    return deletedUser;
  }

  update(userPayload: Partial<User>): User | undefined {
    if (!User.isValid(userPayload)) {
      throw new Error(
        getOperationFailedMessage(OPERATIONS.update, OPERATION_ERRORS.fields)
      );
    }

    const { id } = userPayload;
    UserService.validateId(id, OPERATIONS.update);
    let user = this.findById(id);

    if (!user) return;

    const updatedUser = {
      ...user,
      ...userPayload,
    };
    userDb.updateUser(id, updatedUser);

    return updatedUser;
  }
}

export const userService = new UserService();
