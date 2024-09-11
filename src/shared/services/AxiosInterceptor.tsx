import { ReactNode, useEffect } from "react";
import axios, { InternalAxiosRequestConfig, AxiosResponse} from "axios";
import { parsePersistedData } from "../parse.util";
import { useLocation } from "react-router-dom";
import { handleAccessToken, handleLogout } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/store/store";

const axiosInstance=axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

let isRefreshAttempted=false;

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
    const location=useLocation();
    const dispatch=useAppDispatch();
    useEffect(()=>{
        const getAuth=()=>{
            const auth=localStorage.getItem("persist:auth") || '{}';
            const parsedData=parsePersistedData(JSON.parse(auth));
            return parsedData;
        }
        async function refreshAccessToken() {
            const userInfo = getAuth();
            // try {
              if (userInfo.refreshToken) {
                const resp = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/api/v1/auth/refresh`,
                  {},
                  {
                    headers: {
                      User_Agent: window.navigator.userAgent,
                      Authorization: `Bearer ${userInfo.refreshToken}`
                    }
                  }
                );
                dispatch(handleAccessToken({ accessToken: resp.data.accessToken}));
                return resp.data.accessToken;
              } else {
                throw new Error("Logout");
              }
            // } catch (err) {
            //   throw err;
            // }
          }
    
       const requestInterceptor=axiosInstance.interceptors.request.use(
            (request: InternalAxiosRequestConfig) => {
                request.headers["User-Agent"] = window.navigator.userAgent;
                const auth=getAuth();
                if (auth?.accessToken) {
                  request.headers["Authorization"] = `Bearer ${auth?.accessToken}`; 
                  document.cookie = `accessToken=${auth?.accessToken};`;
                }
                return request;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
        const responseInterceptor=axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            async(err) => {
                try {
                    if(err?.response?.status === 401 && !isRefreshAttempted){
                        isRefreshAttempted=true;
                        const newAccessToken=await refreshAccessToken();
                        err.config.headers["Authorization"] = `Bearer ${newAccessToken}`; 
                        return axiosInstance(err.config);
                    }
                } catch (error) {
                    // console.log('Error', error);
                    isRefreshAttempted = false;
                    dispatch(handleLogout());
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
          };
    
    },[location]);
  return children;
}

export { AxiosInterceptor };
export default axiosInstance;