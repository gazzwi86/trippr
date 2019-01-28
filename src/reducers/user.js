import Cookies from "js-cookie";

const userReducer = (
  state = {
    error: false,
    loading: false,
    userId: false,
    token: false,
    tokenExpires: false
  },
  action
) => {
  switch (action.type) {
    case "LOGOUT":
      Cookies.remove("token");

      return {
        ...state,
        userId: false,
        token: false,
        tokenExpires: false
      };

    case "LOGIN_PENDING":
      return {
        ...state,
        loading: true,
        error: false
      };

    case "LOGIN_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "LOGIN_FULFILLED":
      if (action.payload.error) {
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      }

      const user = action.payload.data.signinUser;

      if (user) {
        const response = {
          ...action.payload.data.signinUser
        };

        Cookies.set("token", JSON.stringify(response), { expires: 1 / 24 });

        return {
          ...state,
          loading: false,
          error: false,
          ...response
        };
      } else {
        return {
          ...state,
          error: action.payload.errors[0].message
        };
      }

    default:
      return state;
  }
};

export default userReducer;
