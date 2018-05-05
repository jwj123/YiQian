import axios from 'axios';
import store from 'store';
import bus from '@/scripts/bus';
import router from '@/router';

const Interceptors = {};

Interceptors.install = () => {
  axios.defaults.validateStatus = status => (status >= 200);
  axios.interceptors.request.use((config) => {
    const key = store.get('key');
    const status = store.get('status');
    if (key) {
      config.headers['x-token'] = key;
    }
    return config;
  }, error => Promise.reject(error));

  axios.interceptors.response.use((response) => {
    const status = response.status;
    const data = response.data;
    if (status >= 400 && status < 500) {
      bus.$emit('alert', data);
      store.remove('key');
      if (status === 401 || status === 403) {
        router.push({ path: '/login' });
      }
    }
    if (status >= 500) console.error(data);
    return response;
  }, error => Promise.reject(error));
};

export default Interceptors;
