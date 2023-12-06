import axios from "axios";
import { getItem, setItem } from "./localStorage";
import { Container } from "postcss";
import { setStockbullBotDetails, setStockbullProfits, setUserArbitrageWallets } from "./utilities";

export const setAxiosConfigurations = () => {
  const activeStockbullChart = useActiveStockbullMarket();
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
    activeStockbullChart.value.real_name;

  let env = useRuntimeConfig();

  const activeAccount = useActiveAccount();

  axios.defaults.headers.common["activeAccount"] =
    activeAccount.value.type ?? "live";
  const authToken = getItem("token");
  axios.defaults.baseURL = env.public.baseURL;
  axios.defaults.headers.common.Authorization = "Bearer " + authToken;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axiosInterceptor();
};

export const authenticateUser = () => {
  let user = useUser();
  axios
    .get("/user")
    .then((response) => {
      user.value = response.data;
    })
    .catch((err) => { });
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
    // console.error(error);
  }
};

export const axiosInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },

    function (error) {
      if (error.response.status == 401) {
        logout();
        navigateTo('/auth/login')
      }

      return Promise.reject(error);
    }
  );
};

export const logout = () => {
  localStorage.removeItem("token");
  let isAuthenticated = useAuthenticated();
  isAuthenticated.value = false;
  let guestRoutes = ["/", "/articles", '/test'];

  const route = useRoute();
  if (!guestRoutes.includes(route.fullPath)) {
    navigateTo("/auth/login");
  }
  // console.log();
};

export const login = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }

  let isAuthenticated = useAuthenticated();
  isAuthenticated.value = true;

  setAxiosConfigurations();
  authenticateUser();
  setStockbullProfits();
  setStockbullBotDetails()
  setUserArbitrageWallets();
};
