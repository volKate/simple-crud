import dotenv from "dotenv";
import http from "http";
import { userController } from "./controllers";

dotenv.config();

const URLS = {
  user: "/api/user",
};

const requestListener: http.RequestListener = (req, res) => {
  if (req.url?.startsWith(URLS.user)) {
    userController(req, res);
    return;
  }

  // if there is no controller for requested url end with an error
  res.statusCode = 404;
  res.end("Requested resource is not found");
};

const server = http.createServer(requestListener);

const port = process.env.PORT || 8004;

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
