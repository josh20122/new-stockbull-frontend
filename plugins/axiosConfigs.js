import axios from "axios";
import {
  authenticateUser,
  login,
  setAxiosConfigurations,
} from "../.utils/axiosConfigurations";
import { setStockbullBotDetails } from '@utils/utilities'

import { setStockbullProfits } from "../.utils/utilities";
import { getItem } from "~/.utils/localStorage";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", () => {
    login()
  });
});
