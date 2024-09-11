import axiosInstance from "../AxiosInterceptor";

const URL='/api/v1/comment';

const commentAPI={
    async create(data: any){
        return axiosInstance({
            url: `${URL}/`,
            method: 'POST',
            data
        })
    },
    async delete(commentId: string){
        return axiosInstance({
            url: `${URL}/${commentId}`,
            method: 'DELETE'
        })
    },
    async get(){
        
    }
};

export default commentAPI;