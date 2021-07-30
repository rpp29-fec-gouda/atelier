const array = (key) => {
  const storage = window.localStorage;
  const value = storage.getItem(key);

  return value ? JSON.parse(value) : undefined;
};

export default array;