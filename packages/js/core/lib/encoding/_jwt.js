/**
 * Minimal JWT helpers.
 */
const jwt = {
  /**
   * Parses a JWT token string and returns the payload as an object.
   *
   * Note: This does not verify the signature. Intended for non-sensitive cases.
   *
   * @param {string} token - JWT in the form header.payload.signature
   * @returns {object}
   */
  parse: (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(''),
    );

    return JSON.parse(jsonPayload);
  },
};

export { jwt };
