import { User } from "./user.module";

class UsersDb {
  readonly users: User[] = [];

  add(user: User) {
    this.users.push(user);
  }
}

export const userDb = new UsersDb();
