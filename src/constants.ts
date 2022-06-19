export enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const METHODS_WITH_ID_PARAM = [METHODS.GET, METHODS.DELETE, METHODS.PUT];

export const OPERATION_ERRORS = {
  fields: "invalid or empty fields",
  id: "invalid user id",
};

export const OPERATIONS = {
  create: "Create",
  update: "Update",
  get: "Get",
  delete: "Delete",
};
