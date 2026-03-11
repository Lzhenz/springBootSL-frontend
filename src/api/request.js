import axios  from "axios";

const request = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 500
});

/**
 * 前端跨域解法
  const request = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 500
    });

 */

export default request;