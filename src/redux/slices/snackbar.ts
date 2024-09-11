import { createSlice,  } from "@reduxjs/toolkit";
import { ISnackBar } from "../../shared/interfaces/miscalleneous";

const initialState: ISnackBar = {
    message: "", 
    type:"info", // due to throws an error during setting the null value in capitilize.js thats here we assigning an empty string 
    open:false
}

const snackBar = createSlice({
    name: 'snackBar',
    initialState,
    reducers: {
        handleSnackBar(state,action) {
            state.message=action.payload.snackMessage;
            state.type=action.payload.snackType;
            state.open=action.payload.snackOpen;
            return state;
        }
    }
})


export const { handleSnackBar } = snackBar.actions;
export default snackBar.reducer;
