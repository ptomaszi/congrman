import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiWrapper {
  private axiosInstance: AxiosInstance;

  get api(): AxiosInstance {
    return this.axiosInstance;
  }

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl
    });

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = localStorage.getItem("api_token");
      if (token && token !== "") {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
}

let apiWrapper: ApiWrapper;
export let api: AxiosInstance;

export const initApi = (baseAddress: string) => {
  apiWrapper = new ApiWrapper(baseAddress);
  api = apiWrapper.api;
};