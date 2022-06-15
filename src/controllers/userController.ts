import http from "http";
import { userDb } from "../db/users";
import { User } from "../modules";

export const userController: http.RequestListener = async (req, res) => {
  switch (req.method) {
    case "GET":
      console.log("hi get", req.url);
      res.end();
      break;
    case "POST":
      let reqBody = "";
      req.on("data", (chunk) => {
        reqBody += chunk;
      });
      req.on("end", () => {
        const userPayload = JSON.parse(reqBody);
        if (User.isValid(userPayload)) {
          const { username, age, hobbies } = userPayload;
          const user = new User(username, age, hobbies);
          userDb.add(user);
          res.writeHead(201, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(user));
        } else {
          res.statusCode = 400;
          res.end("Bad request: invalid or empty fields");
        }
      });
      break;
  }
};
