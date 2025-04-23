export const getOffestFromUrl = (url: string) => {
  const params = new URL(url).searchParams;
  const offset = params.get("offset");
  return offset ? parseInt(offset) : 0;
};
