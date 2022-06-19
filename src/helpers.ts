import { validate as validateUuid } from "uuid";
import http from "http";

export const getIdParam = (url?: string): string | undefined => {
  // get last piece of url, expecting it to be id param
  return url?.split("/")?.slice(-1)[0];
};

export const isValidId = (id: string | undefined): boolean => {
  return typeof id === "string" && validateUuid(id);
};

export const getOperationFailedMessage = (
  operationName = "Operation",
  operationError = "unknown reason"
): string => {
  return `${operationName} failed: ${operationError}`;
};

export const isOperationFailedError = (errMsg: string): boolean => {
  return typeof errMsg === "string" && errMsg.includes("failed:");
};

export const parseReqBody = (
  req: http.IncomingMessage
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    let reqBody = "";
    req.on("data", (chunk) => {
      reqBody += chunk;
    });
    req.on("end", () => {
      resolve(JSON.parse(reqBody));
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
};

export const handleUserNotFound = (
  res: http.ServerResponse,
  userId?: string
) => {
  res.setHeader("Content-Type", "text/plain");
  res.statusCode = 404;
  res.end(`User ${userId ? `with id: ${userId} ` : ""}is not found`);
};
