const localStoreUtil = {
  store_data: (key, data) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    }
    return false;
  },

  get_data: (key) => {
    if (typeof localStorage !== "undefined") {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    }
    return null; 
  },

  remove_data: (key) => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  },

  remove_all: () => {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
      return true;
    }
    return false; 
  },
};

export default localStoreUtil;
