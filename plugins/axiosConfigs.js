import axios from "axios";
import {
  authenticateUser,
  setAxiosConfigurations,
} from "../.utils/axiosConfigurations";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", () => {
    setAxiosConfigurations();
    authenticateUser();
  });
});
