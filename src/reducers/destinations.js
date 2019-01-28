const lists = (
  state = {
    error: false,
    loading: false,
    destinations: []
  },
  action
) => {
  switch (action.type) {
    case "GET_DESTINATIONS_PENDING":
    case "ADD_DESTINATION_PENDING":
    case "REMOVE_DESTINATION_PENDING":
      return {
        ...state,
        error: false,
        loading: true
      };

    case "GET_DESTINATIONS_REJECTED":
    case "ADD_DESTINATION_REJECTED":
    case "REMOVE_DESTINATION_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "ADD_DESTINATION_FULFILLED":
      state.destinations.push(action.payload.data.createDestination);

      return {
        loading: false,
        error: false,
        destinations: state.destinations
      };

    case "GET_DESTINATIONS_FULFILLED":
      return {
        loading: false,
        error: action.payload.error ? action.payload.error : false,
        destinations: action.payload.error
          ? []
          : action.payload.data.destinations
      };

    case "REMOVE_DESTINATION_FULFILLED":
      const destinations = state.destinations;
      const index = destinations.findIndex(
        item => item._id === action.payload.data.deleteList
      );
      destinations.splice(index, 1);

      return {
        loading: false,
        error: action.payload.error ? action.payload.error : false,
        destinations: action.payload.error ? state.destinations : destinations
      };

    default:
      return state;
  }
};

export default lists;
