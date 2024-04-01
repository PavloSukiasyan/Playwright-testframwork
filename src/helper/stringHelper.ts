export function urlToSafeString(url: string | URL) {
  const urlObj = new URL(url);
  let str = urlObj.hostname + urlObj.pathname + urlObj.hash;
  str = str.replace(/\./g, '-'); // replace '.' with '-'
  str = str.replace(/\//g, '-'); // remove '/'
  str = str.replace(/#/g, '-'); // replace '#' with '-'
  return str;
}

export default urlToSafeString;
