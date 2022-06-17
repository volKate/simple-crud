export const getIdParam = (url?: string): string | undefined => {
  // get last piece of url, expecting it to be id param
  return url?.split("/")?.slice(-1)[0];
};
