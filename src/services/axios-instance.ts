import axios from 'axios';


// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `https://localhost:7061/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken') ?? `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTG9naW5JZCI6IjciLCJVc2VybmFtZSI6InN0b3JlMSIsIkZ1bGxOYW1lIjoiTm8gbmFtZSIsIkN1c3RvbWVySWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJTdG9yZUlkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiRW1wbG95ZWVJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDUkVBVEVfQ1VTVE9NRVIiLCJERUxFVEVfQ1VTVE9NRVIiLCJVUERBVEVfQ1VTVE9NRVIiLCJTRUxFQ1RfQ1VTVE9NRVIiXSwiZXhwIjoxNzc5NTQ2NTc1fQ.GnnlJpP_DL7Al4j1GZjuLWLFc6k0OpF6AMlGNbyYku0`;

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
