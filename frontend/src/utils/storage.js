/**
 * Universal Storage Utilities
 * Handles localStorage and sessionStorage with fallback and safety checks.
 */

export const storage = {
  // --- Local Storage (Persistent) ---
  local: {
    set: (key, value) => {
      try {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    },
    get: (key, defaultValue = null) => {
      try {
        const value = localStorage.getItem(key);
        if (value === null) return defaultValue;
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      } catch (e) {
        return defaultValue;
      }
    },
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear(),
  },

  // --- Session Storage (Temporary) ---
  session: {
    set: (key, value) => {
      try {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
      } catch (e) {
        console.error('Error saving to sessionStorage', e);
      }
    },
    get: (key, defaultValue = null) => {
      try {
        const value = sessionStorage.getItem(key);
        if (value === null) return defaultValue;
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      } catch (e) {
        return defaultValue;
      }
    },
    remove: (key) => sessionStorage.removeItem(key),
  },
};

export default storage;
