import axios from "axios";

const ApiClientLocal = () => {
  const instance = axios.create();

  instance.interceptors.request.use(async (request) => {
    request.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL;
    request.validateStatus = (status) => status >= 200 && status < 300;

    return request;
  });

  return instance;
};

export default ApiClientLocal();
