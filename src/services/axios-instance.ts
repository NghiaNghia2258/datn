import axios from 'axios';


// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `http://localhost:5220/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') ?? `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTG9naW5JZCI6IjMiLCJVc2VybmFtZSI6InVzZXIyIiwiRnVsbE5hbWUiOiJObyBuYW1lIiwiQ3VzdG9tZXJJZCI6IjMzMzMzMzMzLTMzMzMtMzMzMy0zMzMzLTMzMzMzMzMzMzMzMyIsIlN0b3JlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJFbXBsb3llZUlkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU0VMRUNUX0NVU1RPTUVSIiwiZXhwIjoxNzc5OTczNzAxfQ.IR7xzeMw7lT_Cez0vNz9LYkqzrKqKcKVmEg3u6-czvE`;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const GET = async (path: string, options?: any): Promise<any> => {
  const res = await axiosInstance.get(path, options);
  return res.data;
};

export const POST = async (path: string, data?: any, headers?: any): Promise<any> => {
  try {
    const res = await axiosInstance.post(path, data, headers);
    return res.data;
  } catch (error:any) {
    return {
      isSucceeded: false,
      statusCode: error.response.data.StatusCode,
      message: error.response.data.Message,
    };
  }
};

export const PUT = async (path: string, data?: any): Promise<any> => {
  try {
    const res = await axiosInstance.put(path, data);
    return res.data;
  } catch (error:any) {
    return {
      isSucceeded: false,
      statusCode: error.response.data.StatusCode,
      message: error.response.data.Message,
    };
  }
};

export const DELETE = async (path: string, options?: any): Promise<any> => {
  try {
    const res = await axiosInstance.delete(path, options);
    return res.data;
  } catch (error:any) {
    return {
      isSucceeded: false,
      statusCode: error.response.data.StatusCode,
      message: error.response.data.Message,
    };
  }
};
export default axiosInstance;
