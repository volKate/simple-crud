import dotenv from "dotenv";
import http from "http";

dotenv.config();

const server = http.createServer();

const port = process.env.PORT || 8004;

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
