import { Alert, Snackbar} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { handleSnackBar } from '../../redux/slices/snackbar';

const Toast = () => {
  const { open, type, message }=useAppSelector(state=>state.snackbar); 
  const dispatch=useAppDispatch();

  const snackBarClose = () => {
    dispatch(handleSnackBar({open:false, type:"", message:""}));
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{vertical:'top', horizontal:'center'}}
        autoHideDuration={5000}
        onClose={snackBarClose}
      >
        <Alert
          onClose={snackBarClose}
          severity={type}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Toast