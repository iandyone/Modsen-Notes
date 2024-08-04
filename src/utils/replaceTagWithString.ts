export const replaceTagWithString = (originalString: string, outdatedTag: string) => {
  const regex = new RegExp(`${outdatedTag}(?=\\s|$)`, 'g');

  return originalString.replace(regex, outdatedTag.slice(1));
};
