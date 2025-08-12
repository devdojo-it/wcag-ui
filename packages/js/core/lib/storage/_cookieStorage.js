/** biome-ignore-all lint/suspicious/noDocumentCookie: <this is temporary waiting for full Baseline support about the Cookie Store API> */
/** biome-ignore-all lint/complexity/noStaticOnlyClass: <this is temporary waiting for full Baseline support about the Cookie Store API> */
/**
 * Minimal cookie-based storage with a `localStorage`-like API.
 *
 * Notes:
 * - Uses document.cookie under the hood (string size limits apply).
 * - Values are not encrypted; avoid storing sensitive data.
 * - Time-to-live controlled via `days` argument on setItem.
 */
export class CookieStorage {
  /** Sets a cookie with optional expiration in days. */
  static setItem(key, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  /** Gets a cookie value or null if not present. */
  static getItem(key) {
    return (
      document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${encodeURIComponent(key)}=`))
        ?.split('=')[1] || null
    );
  }

  /** Removes a cookie by setting an expired date. */
  static removeItem(key) {
    document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  /** Clears all cookies for the current path/domain. */
  static clear() {
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  }
}

Object.defineProperty(self, 'cookieStorage', {
  value: CookieStorage,
  configurable: false,
  enumerable: false,
  writable: false,
});

// // Uso della classe CookieStorage
// const storage = new CookieStorage();

// // Imposta un cookie
// storage.setItem('user', 'John Doe');

// // Ottiene un cookie
// console.log(storage.getItem('user')); // Output: John Doe

// // Rimuove un cookie
// storage.removeItem('user');

// // Pulisce tutti i cookie
// storage.clear();
