import axios, { AxiosResponse } from 'axios';
import axiosInstance from '../AxiosInterceptor';


const URL='/api/v1/user'

const userAPI={
    async posts(){
        return await axiosInstance.get(`${URL}/posts`);
    },
    async search(query: string): Promise<AxiosResponse<any, any>>{
        return await axiosInstance.post(`${URL}/search`, { query });        
    },
    async follow(id: string){
        return await axiosInstance.post(`${URL}/follow`, { id });
    },
    async unfollow(id: string){
        return await axiosInstance.post(`${URL}/unfollow`, { id });
    },
    async recoverAccount(email: string){
        return await axios.post(`${import.meta.env.VITE_BASE_URL}${URL}/recover-account`, { email });
    },
    async sendOTP(data: any){
        return await axios.post(`${import.meta.env.VITE_BASE_URL}${URL}/otp`, data);
    },
    async resetPwd(data: any){
        return await axios.post(`${import.meta.env.VITE_BASE_URL}${URL}/change-pwd`, data);
    }
};

export default userAPI;