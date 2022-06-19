import dotenv from "dotenv";
import http from "http";
import { userController } from "./user/user.controller";

dotenv.config();

export const URLS = {
  user: "/api/users",
};

const requestListener: http.RequestListener = async (req, res) => {
  try {
    if (req.url?.startsWith(URLS.user)) {
      await userController(req, res);
    } else {
      // if there is no controller for requested url end with an error
      res.statusCode = 404;
      res.end("Requested resource is not found");
    }
  } catch {
    res.statusCode = 500;
    res.end("Internal server error");
  }
};

export const server = http.createServer(requestListener);

const port = process.env.PORT || 8004;

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
