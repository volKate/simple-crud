import http from "http";
import { METHODS, METHODS_WITH_ID_PARAM } from "../constants";
import {
  getIdParam,
  handleUserNotFound,
  isOperationFailedError,
  parseReqBody,
} from "../helpers";
import { userService } from "./user.service";

export const userController: http.RequestListener = async (req, res) => {
  const reqMethod = req.method as unknown as METHODS;
  let userId;
  if (METHODS_WITH_ID_PARAM.includes(reqMethod)) {
    userId = getIdParam(req.url);
  }

  res.setHeader("Content-Type", "application/json");

  try {
    switch (req.method) {
      case "GET":
        if (req.url?.endsWith("/users")) {
          const users = userService.findAll();
          res.statusCode = 200;
          res.end(JSON.stringify(users));
        } else {
          const user = userService.findById(userId);
          if (!user) {
            handleUserNotFound(res, userId);
            return;
          }
          res.statusCode = 200;
          res.end(JSON.stringify(user));
        }
        break;
      case "PUT":
        const userUpdatePayload = await parseReqBody(req);
        const updatedUser = userService.update({
          id: userId,
          ...userUpdatePayload,
        });

        if (!updatedUser) {
          handleUserNotFound(res, userId);
          return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(updatedUser));
        break;
      case "POST":
        const userCreatePayload = await parseReqBody(req);
        const newUser = userService.create(userCreatePayload);
        res.statusCode = 201;
        res.end(JSON.stringify(newUser));
        break;
      case "DELETE":
        const deletedUser = userService.removeById(userId);
        if (!deletedUser) {
          handleUserNotFound(res, userId);
          return;
        } else {
          res.statusCode = 204;
          res.end();
        }
        break;
    }
  } catch (err) {
    if (err instanceof Error && isOperationFailedError(err.message)) {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 400;
      res.end((err as Error).message);
      return;
    }
    throw err;
  }
};
