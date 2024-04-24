export default {
  get(key) {
    return localStorage.getItem(key);
  },

  set(key, value) {
    localStorage.setItem(key, value);
  },

  delete(key) {
    localStorage.removeItem(key);
  },

  has(key) {
    return this.get(key) !== null;
  },
};
