import axios from "axios";

const API = ({ method, url }) => {
  //   const CancelToken = axios.CancelToken;
  //   const source = CancelToken.source();
  return new Promise((resolve, reject) => {
    axios({
      headers: { "Content-Type": "application/json" },
      crossDomain: true,
      method,
      url,
      validateStatus: false,
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else if (response.status === 401) {
          reject(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const APIwithID = ({ method, url }) => {
  //   const CancelToken = axios.CancelToken;
  //   const source = CancelToken.source();
  return new Promise((resolve, reject) => {
    axios({
      // headers: { "Content-Type": "application/json" },
      crossDomain: true,
      method,
      url,
      validateStatus: false,
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        } else if (response.status === 401) {
          reject(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const APIWithData = ({ method, url, data }) => {
  return new Promise((resolve, reject) => {
    axios({
      headers: {
        "Content-Type": "application/json",
      },
      crossDomain: true,
      method,
      url,
      data,
      validateStatus: false,
    })
      .then((response) => {
        // console.log(response.data)
        if (response.status === 200) {
          resolve(response.data);
        } else if (response.status === 401) {
          reject(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    // cancel the request (the message parameter is optional)
  });
};

const api = {
  getAllActivities: (url) => API({ method: "get", url: `${url}` }),
  getDetailAct: (url) => APIwithID({ method: "get", url: `${url}` }),
  patch: (url, data) => APIWithData({ method: "patch", url: `${url}`, data }),
  post: (url, data) => APIWithData({ method: "post", url: `${url}`, data }),
  deletePost: (url) => APIwithID({ method: "delete", url: `${url}` }),
};

export const services = {
  getActivities: () =>
    api.getAllActivities(
      `https://todo.api.devcode.gethired.id/activity-groups?email=yoga%2B1%40skyshi.io`
    ),
  getDetailActivity: (params) =>
    api.getDetailAct(
      `https://todo.api.devcode.gethired.id/activity-groups/${params}`
    ),
  updateDetailAct: (params, data) =>
    api.patch(
      `https://todo.api.devcode.gethired.id/activity-groups/${params}`,
      data
    ),
  updateToDo: (params, data) =>
    api.patch(
      `https://todo.api.devcode.gethired.id/todo-items/${params}`,
      data
    ),
  createAct: (data) =>
    api.post(`https://todo.api.devcode.gethired.id/activity-groups`, data),
    createToDo: (data) =>
    api.post(`https://todo.api.devcode.gethired.id/todo-items`, data),
  deleteAct: (params) =>
    api.deletePost(
      `https://todo.api.devcode.gethired.id/activity-groups/${params}`
    ),
    deleteToDo: (params) =>
    api.deletePost(
      ` https://todo.api.devcode.gethired.id/todo-items/${params}`
    ),

   
};
