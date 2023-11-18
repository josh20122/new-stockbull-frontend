
import { setAxiosConfigurations } from '../.utils/axiosConfigurations';

export default defineNuxtPlugin(nuxtApp => {
    
onNuxtReady(() => {
  setAxiosConfigurations();
  })
    // setAxiosConfigurations()
    // Doing something with nuxtApp
  })