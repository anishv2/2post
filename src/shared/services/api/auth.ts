import { AxiosResponse } from 'axios';
import axiosInstance from '../AxiosInterceptor';
import { IUserCreate, IUserLogin } from '../../../modules/user/interfaces';


const URL='/api/v1/auth'

const authAPI={
    async register(user: IUserCreate): Promise<AxiosResponse>{
        return await axiosInstance.post(`${URL}/new`, user);
    },
    async login(user: IUserLogin): Promise<AxiosResponse>{
        return await axiosInstance.post(`${URL}/`, user);        
    }
};

export default authAPI;