import localStore from "./localstore.util";

export const getToken = () => localStore.get_data("token");

export const setToken = (token) => localStore.store_data("token", token);

export const logout = () => {
  localStore.remove_all();
  return true;
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};
