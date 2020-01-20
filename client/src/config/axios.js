import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3002"
});

export default axios;
