import { User } from "./user.module";

class UsersDb {
  readonly users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}

export const userDb = new UsersDb();
