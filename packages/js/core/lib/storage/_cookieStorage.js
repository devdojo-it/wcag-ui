export class CookieStorage {
  // Imposta un cookie
  static setItem(key, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  // Ottiene il valore di un cookie
  static getItem(key) {
    return (
      document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${encodeURIComponent(key)}=`))
        ?.split('=')[1] || null
    );
  }

  // Rimuove un cookie
  static removeItem(key) {
    document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  // Pulisce tutti i cookie
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
  writable: false
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
