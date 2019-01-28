import fetchGQL from "../helpers/fetchGQL";

export const login = (email, password) => ({
  type: "LOGIN",
  payload: fetchGQL(
    `query {
      signinUser(authInput: {email: "${email}", password: "${password}"}) {
        userId
        token
        tokenExpires
      }
    }`
  )
});

export const logout = () => ({
  type: "LOGOUT",
  payload: null
});
