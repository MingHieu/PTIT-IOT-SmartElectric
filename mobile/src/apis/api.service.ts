import axios from 'axios';
import {baseUrl} from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN_KEY} from '../constants';
import {Alert} from 'react-native';

const request = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  async function (config) {
    config.headers = config.headers ?? {};
    // Do something before request is sent
    if (config.headers.Authorization) {
      return config;
    }
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default async params => {
  try {
    const res = await request(params);
    return res.data;
  } catch (e) {
    Alert.alert('Lỗi', 'Vui lòng thử lại sau');
  }
};
