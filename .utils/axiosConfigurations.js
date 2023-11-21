import axios from "axios";
// import {
//   RegisterStoreActions,
//   RegisterStore,
//   AccountsModalActions,
// } from "./store";
// import { useStoreState } from "pullstate";
import { getItem, setItem } from "./localStorage";
// import { env } from "./env";

export const setAxiosConfigurations = () => {
  setItem("activeChart", "november");
  setItem("activeChartName", "STockBull index (1f)");

  if (!getItem("accountType")) {
    setItem("accountType", "demo");
  }

  if (!getItem("activeChart")) {
    setItem("activeChart", "november");
    setItem("activeChartName", "STockBull index (1f)");
  }

  if (getItem("activeChart") == "null") {
    setItem("activeChart", "november");
    setItem("activeChartName", "STockBull index (1f)");
  }

  if (!getItem("activeChartName") || !getItem("activeChartName") == "null") {
    setItem("activeChartName", "STockBull index (1f)");
  }

  axios.defaults.headers.common["activeChart"] =
    getItem("activeChart") ?? "november";

  axios.defaults.headers.common["activeAccount"] =
    getItem("accountType") ?? "demo";
  const authToken = getItem("token");
  axios.defaults.baseURL = "https://stockbullsecure.com/api";
  axios.defaults.headers.common.Authorization = "Bearer " + authToken;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  // axiosInterceptor();
};

export const bearerToken = () => {
  return getItem("token");
};

export const accountType = () => {
  return getItem("accountType");
};

export const updateAccountType = () => {
  try {
    axios.defaults.headers.common["activeAccount"] = getItem("accountType");
  } catch (error) {
    console.error(error);
  }
};

export const axiosInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response.status == 401) {
        // AccountsModalActions.logout();
        // return "Unauthorized";
      }
      return Promise.reject(error);
    }
  );
};
