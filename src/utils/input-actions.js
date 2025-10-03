export const normalizeUrl = (url) => {
  if (!url) return "";
  // if doesn't start with http or https → prepend https://
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};
