import axios from 'axios';
axios.defaults.withCredentials = true;
import config from '../common/config';

export const ALLProducts_API = () => {
  const options = {
    method: 'GET',
    url: config.base_API + '/api/getAllProducts',
  };
  return new Promise((resolve) => {
    axios
      .request(options)
      .then((res) => {
        console.log("all products data::",res.data.data);
        resolve(res.data.data);
      })
      .catch((err) => {
        resolve(err.message);
      });
  });
};