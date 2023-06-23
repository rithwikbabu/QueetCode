export function unescapeString(escapedString: any) {
  // Use JSON.parse to handle most escape sequences.
  // We wrap the string in quotes to make it valid JSON.
  let unescapedString = JSON.parse(`"${escapedString}"`);

  // JSON.parse does not handle \xHH sequences, so we handle them manually.
  unescapedString = unescapedString.replace(
    /\\x([0-9A-Fa-f]{2})/g,
    function (_: any, p1: string) {
      return String.fromCharCode(parseInt(p1, 16));
    }
  );

  return unescapedString;
}
