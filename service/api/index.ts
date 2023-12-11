import axios from "axios";
import { type DomainType, getDomain } from "./utils";

const createApi = (type: DomainType) => {
  const _api = axios.create({
    baseURL: `${getDomain(type)}`,
    withCredentials: true,
  });

  return _api;
};

const api = createApi("server");

export * from "./utils";

export default api;
