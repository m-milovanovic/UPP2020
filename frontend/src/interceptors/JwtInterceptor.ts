import Axios from 'axios'
import LocalStorageService from '../services/LocalStorageService'

const setupInterceptor = () =>
  Axios.interceptors.request.use(function (config) {
    // Do something before request is sent, like we're inserting a timeout for only requests with a particular baseURL
    if (!config.baseURL?.includes("registerReader") && !config.baseURL?.includes("authentication")) {
      config.headers.Authorization = `bearer ${LocalStorageService.getJwt()}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default { setupInterceptor }