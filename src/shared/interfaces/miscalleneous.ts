
export interface ISnackBar {
    message: string;
    type: 'error' | 'info' | 'success' | 'warning'; 
    open:boolean;
}

export interface IAuth {
    isAuthenticated: boolean,
    id:string,
    firstName:string,
    lastName:string,
    email: string,
    gender: string;
    image:string,
    accessToken: string,
    refreshToken: string,
    message: string,
    error: ''
}