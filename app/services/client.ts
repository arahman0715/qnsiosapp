import axios from 'axios';
import ApiConfig from '../config/api-config';

const apiClient = axios.create({
  baseURL: ApiConfig.apiBaseUrl,
  responseType: 'json',
  withCredentials: false,
  // logging: true
});
apiClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
export { apiClient };
