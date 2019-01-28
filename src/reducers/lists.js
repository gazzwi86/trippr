const lists = (
  state = {
    error: false,
    loading: false,
    lists: []
  },
  action
) => {
  switch (action.type) {
    case "GET_LIST_PENDING":
    case "ADD_LIST_PENDING":
    case "REMOVE_LIST_PENDING":
      return {
        ...state,
        error: false,
        loading: true
      };

    case "GET_LIST_REJECTED":
    case "ADD_LIST_REJECTED":
    case "REMOVE_LIST_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "ADD_LIST_FULFILLED":
      state.lists.push(action.payload.data.createList);

      return {
        loading: false,
        error: false,
        lists: state.lists
      };

    case "GET_LIST_FULFILLED":
      return {
        loading: false,
        error: action.payload.error ? action.payload.error : false,
        lists: action.payload.error ? [] : action.payload.data.lists
      };

    case "REMOVE_LIST_FULFILLED":
      const lists = state.lists;
      const index = lists.findIndex(
        item => item._id === action.payload.data.deleteList
      );
      lists.splice(index, 1);

      return {
        loading: false,
        error: action.payload.error ? action.payload.error : false,
        lists: action.payload.error ? state.lists : lists
      };

    default:
      return state;
  }
};

export default lists;
