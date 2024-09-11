
export const ROUTES={
    /* pubic routes */ 
    HOME:'/',
    LOGIN:'/login',
    REGISTER:'/register',
    ABOUT:'/about',
    RECOVER_ACC: '/recover',
    RESET_PWD: '/resetpassword',
    /* protected routes */
    USER:'/user',
    FEEDS:'posts',
    LOGOUT:'logout',
    CREATE_POST:'post/create',
    ACCOUNT:'account',
    PROFILE:'profile',
    CHANGE_PWD:'change-password',
    SEARCH: '/user/search',
    POST:'posts/:id',
    EDIT_POST:'/user/post/:id/edit',
    ALL_POSTS:'posts'
}