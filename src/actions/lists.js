import fetchGQL from "../helpers/fetchGQL";

export const getLists = (userId, token) => ({
  type: "GET_LIST",
  payload: fetchGQL(
    `query {
      lists {
        _id
        name
        destinations{
          destination
          duration
        }
      }
    }`,
    token
  )
});

export const addList = (name, userId, token) => ({
  type: "ADD_LIST",
  payload: fetchGQL(
    `mutation {
      createList(listInput: {
        name:"${name}",
        creator: "${userId}",
        destinations: [],
      }){
        _id
        name
      }
    }`,
    token
  )
});

export const removeList = (id, token) => ({
  type: "REMOVE_LIST",
  payload: fetchGQL(
    `mutation{
      deleteList(listId: "${id}")
    }`,
    token
  )
});
