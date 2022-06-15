import http from "http";
import { userService } from "./user.service";

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
        try {
          const user = userService.create(userPayload);
          res.writeHead(201, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(user));
        } catch (err) {
          res.statusCode = 400;
          res.end((err as Error).message);
        }
      });
      break;
  }
};
