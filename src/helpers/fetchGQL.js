import constants from "../constants";

const fetchGQL = (body, token) => {
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${constants.API_URL}${constants.API_PATH}`, {
    method: "POST",
    body: JSON.stringify({ query: body }),
    headers
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw Error(`${res.status} ${res.statusText}`);
      }

      return res.json();
    })
    .catch(err => ({ error: err.toString() }));
};

export default fetchGQL;
