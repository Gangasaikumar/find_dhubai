import axios from 'axios';
axios.defaults.withCredentials = true;
import config from '../common/config';

export const Login_API = (email, password) => {
  const options = {
    method: 'POST',
    url: config.base_API + 'login',
    data: JSON.stringify({ eml: email, pwd: password}),
  };
  return new Promise((resolve) => {
    axios
      .request(options)
      .then((res) => {
        console.log("login check :::",res);
        resolve(res.data);
      })
      .catch((err) => {
        resolve(err.message);
      });
  });
};