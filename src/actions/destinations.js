import fetchGQL from "../helpers/fetchGQL";

const destinationInput = () => "";
// const destinationInput = id => id
//   ? `(destinationInput: { _id:"${id}" })`
//   : '';

export const getDestinations = (listId, token) => ({
  type: "GET_DESTINATIONS",
  payload: fetchGQL(
    `query {
      destinations${destinationInput(listId)} {
        _id
        destination
        duration
        list {
          name
        }
      }
    }`,
    token
  )
});

export const addDestination = (desination, duration, listId, token) => ({
  type: "ADD_DESTINATION",
  payload: fetchGQL(
    `mutation {
      createDestination(destinationInput: {
        destination: "${desination}",
        duration:${duration},
        list: "${listId}",
      }){
        _id
        destination
        duration
      }
    }`,
    token
  )
});

export const removeDestination = (id, token) => ({
  type: "REMOVE_DESTINATION",
  payload: fetchGQL(
    `mutation{
      deleteDestination(destinationId: "${id}")
    }`,
    token
  )
});
