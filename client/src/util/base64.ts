function encode64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode(parseInt(p1, 16)),
    ),
  );
}

// Decoding base64 ⇢ UTF-8

function decode64(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`,
      )
      .join(""),
  );
}

export { decode64, encode64 };
