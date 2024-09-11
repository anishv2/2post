import { configureStore, combineReducers } from '@reduxjs/toolkit';
import snackBar from '../slices/snackbar';
import authSlice from '../slices/auth';
import postSlice from '../slices/post';
import { useSelector,useDispatch,TypedUseSelectorHook } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistPartial } from "redux-persist/es/persistReducer";



const authReducer = persistReducer({
    key: 'auth',
    storage,
}, authSlice);
const postReducer = persistReducer({
    key: 'post',
    storage
}, postSlice);


const rootReducer = combineReducers({ 
    auth: authReducer,
    snackbar: snackBar,
    posts: postReducer
});

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => // source: https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
        getDefaultMiddleware({
          serializableCheck: false,
    }),

});

store.subscribe(()=>{
    // console.log("State Update .... ", store.getState());
}); 


export const persistor = persistStore(store); 
export default store;
export type RootState = ReturnType<typeof store.getState> & {
    _persist: PersistPartial & { rehydrated: boolean };
  };
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;