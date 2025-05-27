import axios from 'axios';


// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `https://localhost:7061/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken') ?? `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTG9naW5JZCI6IjYiLCJVc2VybmFtZSI6InVzZXI1IiwiRnVsbE5hbWUiOiJObyBuYW1lIiwiQ3VzdG9tZXJJZCI6IjY2NjY2NjY2LTY2NjYtNjY2Ni02NjY2LTY2NjY2NjY2NjY2NiIsIlN0b3JlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJFbXBsb3llZUlkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU0VMRUNUX0NVU1RPTUVSIiwiZXhwIjoxNzc5ODM4NjcwfQ.h87AxwTg_BOvfdTmjR649YnXXS1hgIm6YAilenI1wnw`;

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
