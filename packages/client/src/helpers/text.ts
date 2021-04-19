export const toCamelCase = (str: string) => {
  const firstChar = str[0].toUpperCase();
  const body = str.substring(1).toLowerCase();

  return firstChar + body;
};
