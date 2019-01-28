import { createContext } from "react";

export default createContext({
  token: null,
  userId: null,
  tokenExpires: null,
  login: () => {},
  logout: () => {}
});
