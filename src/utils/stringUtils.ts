export function unescapeString(escapedString: string): string | null {
    // Wrap the string in quotes to make it valid JSON.
    try {
      // Try to parse the string as JSON to handle most escape sequences.
      let unescapedString: string = JSON.parse(`"${escapedString}"`);
  
      // JSON.parse does not handle \xHH sequences, so we handle them manually.
      unescapedString = unescapedString.replace(
        /\\x([0-9A-Fa-f]{2})/g,
        (_match: string, p1: string) => String.fromCharCode(parseInt(p1, 16))
      );
  
      return unescapedString;
    } catch (e) {
      console.error('Error unescaping string: ', e);
      return null;
    }
  }
  