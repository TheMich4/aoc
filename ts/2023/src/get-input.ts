export const getInput = async (path: string) => {
  const inputFile = Bun.file(path);
  return await inputFile.text();
};
