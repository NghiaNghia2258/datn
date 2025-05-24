import axios from 'axios';


// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `https://localhost:7061/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken') ?? `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTG9naW5JZCI6IjgiLCJVc2VybmFtZSI6InN0b3JlVGVzdDEiLCJGdWxsTmFtZSI6Ik5vIG5hbWUiLCJDdXN0b21lcklkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiU3RvcmVJZCI6ImRhNjJiZDQ2LTFlMjQtNDE3MS0wYWJhLTA4ZGQ5ODc1OTY3NiIsIkVtcGxveWVlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQ1JFQVRFX0NVU1RPTUVSIiwiREVMRVRFX0NVU1RPTUVSIiwiVVBEQVRFX0NVU1RPTUVSIiwiU0VMRUNUX0NVU1RPTUVSIl0sImV4cCI6MTc3OTU1MDcwMn0.NehYau2pJjKnUfR0tZBJMIcsvFWR0erBSDHOxUesDK8`;

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
