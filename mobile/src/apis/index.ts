import {IDashboard} from '../types/IDashboard';
import {IDevice} from '../types/IDevice';
import {IOutlet} from '../types/IOutlet';
import {IResponse} from '../types/IResponse';
import {IUser} from '../types/IUser';
import request from './api.service';

const signup = async (body: {
  username: string;
  password: string;
  name: string;
  phone: string;
}): Promise<IResponse<IUser & {token: string}>> => {
  return request({
    url: 'auth/signup',
    method: 'POST',
    data: body,
  });
};

const login = async (body: {
  username: string;
  password: string;
}): Promise<IResponse<IUser & {token: string}>> => {
  return request({
    url: 'auth/login',
    method: 'POST',
    data: body,
  });
};

const me = async (): Promise<IResponse<IUser>> => {
  return request({
    url: 'auth/me',
    method: 'GET',
  });
};

const setFcmToken = async (body: {fcmToken: string}) => {
  return request({
    url: 'user/fcmToken',
    method: 'POST',
    data: body,
  });
};

const dashboard = async (): Promise<IResponse<IDashboard>> => {
  return request({
    url: 'user/dashboard',
    method: 'GET',
  });
};

const addOutletToUser = async (outletCode: string) => {
  return request({
    url: `outlet/${outletCode}/add`,
    method: 'POST',
  });
};

const setMaxWattage = async (
  outletCode: string,
  body: {maxWattage: number},
) => {
  return request({
    url: `outlet/${outletCode}/setMaxWattage`,
    method: 'POST',
    data: body,
  });
};

const getAllOutlet = async (): Promise<IResponse<IOutlet[]>> => {
  return request({
    url: 'outlet/all',
    method: 'GET',
  });
};

const getOutlet = async (outletCode: string): Promise<IResponse<IOutlet>> => {
  return request({
    url: `outlet/${outletCode}`,
    method: 'GET',
  });
};

const getDevice = async (deviceId: string): Promise<IResponse<IDevice>> => {
  return request({
    url: `device/${deviceId}`,
    method: 'GET',
  });
};

const updateDevice = async (
  deviceId: string,
  body: {
    name: string;
    priority: number;
  },
): Promise<IResponse<IDevice>> => {
  return request({
    url: `device/${deviceId}`,
    method: 'POST',
    data: body,
  });
};

const turnOnDevice = async (deviceId: string, outletCode: string) => {
  return request({
    url: `device/${deviceId}/turnOn`,
    method: 'POST',
    data: {outletCode},
  });
};

const turnOffDevice = async (deviceId: string, outletCode: string) => {
  return request({
    url: `device/${deviceId}/turnOff`,
    method: 'POST',
    data: {outletCode},
  });
};

const setDeviceOffTime = async (
  deviceId: string,
  body: {
    outletCode: string;
    offTime: number;
  },
) => {
  return request({
    url: `device/${deviceId}/setOffTime`,
    method: 'POST',
    data: body,
  });
};

const services = {
  signup,
  login,
  me,
  setFcmToken,
  addOutletToUser,
  setMaxWattage,
  getAllOutlet,
  getOutlet,
  getDevice,
  turnOnDevice,
  turnOffDevice,
  setDeviceOffTime,
  dashboard,
  updateDevice,
};

export default services;
