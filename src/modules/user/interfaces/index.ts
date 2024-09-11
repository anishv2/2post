
export interface IUserCreate {
    firstName: string;
    lastName: string;
    gender: string;    
    email: string;
    password: string;
    repeatPassword: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IPost {
    _id: string;
    _v: number;
    title: string;
    content: string;
    image: string;
    tags: string[];
    likes: number;
    isLiked: boolean;
    comments: any[];
    user: any;
    createdAt: string;
    updatedAt: string;

}