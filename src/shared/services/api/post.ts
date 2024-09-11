import { AxiosResponse } from 'axios';
import axiosInstance from '../AxiosInterceptor';

const URL='/api/v1/post'

const postAPI={
    async create(data: FormData): Promise<AxiosResponse>{
        return await axiosInstance({
            url:`${URL}/`,
            data,
            method:'POST',
            headers: {
                "Content-Type":"application/x-www-form-urlencoded", 
            }
            // headers: {
            //     "Accept":"image/jpeg",
            //     "Content-Type":"multipart/form-data"
            // }
        });
    },
    async update(postId: string, data: any){
        return await axiosInstance({
            url: `${URL}/${postId}`,
            method: 'PUT',
            data
        });
    },
    async fetchById(postId: string){
        return await axiosInstance({
            method:'GET',
            url: `${URL}/${postId}`
        });
    },
    async fetch(page: number){
        return await axiosInstance({
            method:'GET',
            url: `${URL}?page=${page}`
        });
    },
    async delete(postId: string){
        return await axiosInstance({
            method:'DELETE',
            url: `${URL}/${postId}`
        });
    },
    async like(postId: string){
        return await axiosInstance({
            method: 'POST',
            url: `${URL}/like/${postId}`
        });
    },
    async unlike(postId: string){
        return await axiosInstance({
            method: 'DELETE',
            url: `${URL}/like/${postId}`
        })
    }
    
};

export default postAPI;