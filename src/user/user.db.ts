import { User } from "./user.module";

class UsersDb {
  users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  removeUserById(id: string): User | undefined {
    const userToDelete = this.getUserById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return userToDelete;
  }

  updateUser(id: string, user: User) {
    const userIdx = this.users.findIndex((user) => user.id === id);
    if (userIdx !== -1) {
      this.users[userIdx] = user;
    }
  }
}

export const userDb = new UsersDb();
