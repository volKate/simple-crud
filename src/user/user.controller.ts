import http from "http";
import { getIdParam } from "../helpers";
import { userService } from "./user.service";

export const userController: http.RequestListener = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        if (req.url?.endsWith("/users")) {
          const users = userService.findAll();
          res.end(JSON.stringify(users));
        } else {
          const id = getIdParam(req.url);
          const user = userService.findById(id);
          if (!user) {
            res.statusCode = 404;
            res.end(`User with id: ${id} is not found`);
            return;
          } else {
            res.end(JSON.stringify(user));
          }
        }
        res.end();
        break;
      case "PUT":
      case "POST":
        let reqBody = "";
        req.on("data", (chunk) => {
          reqBody += chunk;
        });
        req.on("end", () => {
          const userPayload = JSON.parse(reqBody);
          // update
          if (req.method === "PUT") {
            const id = getIdParam(req.url);
            const user = userService.findById(id);
            if (!user) {
              res.statusCode = 404;
              res.end(`User with id: ${id} is not found`);
              return;
            }
            const updatedUser = userService.update({
              id,
              ...userPayload,
            });

            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(updatedUser));
          }
          // create
          if (req.method === "POST") {
            const user = userService.create(userPayload);
            res.writeHead(201, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(user));
          }
        });
        break;
      case "DELETE":
        const id = getIdParam(req.url);
        const user = userService.findById(id);
        if (!user) {
          res.statusCode = 404;
          res.end(`User with id: ${id} is not found`);
          return;
        } else {
          userService.removeById(id);
          res.statusCode = 204;
          res.end();
        }
        break;
    }
  } catch (err) {
    res.statusCode = 400;
    res.end((err as Error).message);
  }
};
