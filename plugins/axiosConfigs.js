import axios from "axios";
import {
  authenticateUser,
  setAxiosConfigurations,
} from "../.utils/axiosConfigurations";

import { setStockbullProfits } from "../.utils/utilities";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", () => {
    setAxiosConfigurations();
    authenticateUser();
    setStockbullProfits();
  });
});
