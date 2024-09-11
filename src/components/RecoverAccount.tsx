import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch} from '../redux/store/store';
import { ChangePwdPage } from '@/routes/LazyComponents';
import userAPI from '../shared/services/api/user';
import { handleSnackBar } from '../redux/slices/snackbar'; 
import { recoverEmailSchema, OTPSchema } from '@/shared/validation/user';
import Spinner from '@/shared/widgets/Spinner';


type Schema = z.infer<typeof recoverEmailSchema>;
type otpSchema =  z.infer<typeof OTPSchema>;

export default function RecoverAccount(){
  const dispatch=useAppDispatch();
  const [accRecoverInfo, setAccRecoverInfo]=useState({} as { reqId: string, expiry: number, email: string });
  const [isLoading, setIsLoading]=useState(false);
  const [isVerified, setIsVerified]=useState(false);
  const { register, handleSubmit, reset, formState:{ errors} }=useForm<Schema & otpSchema>({ resolver: zodResolver(accRecoverInfo.email ? OTPSchema : recoverEmailSchema)});

  
  const submitEmail:SubmitHandler<Schema> = async(data:Schema) => {
    try {
      setIsLoading(true);
      const res= await userAPI.recoverAccount(data.email);
      if(res?.data){
        setAccRecoverInfo({ reqId: res.data.requestId, expiry: res.data.expiresAt, email: data.email });
        setAccRecoverInfo({ ...accRecoverInfo, email: data.email });
      }
      setIsLoading(false);
    } catch (error:any) {
      dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: error.message }));
      setIsLoading(false);
    }
    reset();
  };
  
  const submitOTP:SubmitHandler<otpSchema>=async(data: otpSchema)=>{
    try {
      setIsLoading(true);
      const res= await userAPI.sendOTP({ otp: data.otp, reqId: accRecoverInfo.reqId, expiry: accRecoverInfo.expiry });
      if(res.status===200){
        dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message}));
        setIsVerified(true);
        setIsLoading(false);
      }
    } catch (error:any) {
      dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: error.message }));
      setIsLoading(false);
    }
    reset();
  }

  if(isVerified){
    return <ChangePwdPage email={accRecoverInfo.email} />
  }

  return isLoading ? 
        <Spinner />
        :
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mt={20}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', mx:'auto'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" mb={2}>
            Reset Account
          </Typography>
          <Typography component="h5">
            Please enter your email to send the secret code
          </Typography>
          {accRecoverInfo.email && <Typography component='p' align='center'>Secret code has been sent on <strong>{accRecoverInfo.email}</strong></Typography>}

          <Box 
          component="form" sx={{ mt:3 }} 
          noValidate 
          onSubmit={handleSubmit(accRecoverInfo.email ? submitOTP : submitEmail)}>
            <Grid container spacing={2}>
              {!accRecoverInfo.email ? 
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  label="Email"
                  {...register('email')}
                  type="email"
                  id="email"
                  autoComplete="off"
                  error={errors.email && Boolean(errors.email?.message)}
                  helperText={typeof errors.email?.message === 'string' ? errors.email.message : ''} 
                />
              </Grid>
              :
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="OTP"
                  {...register('otp')}
                  type="number"
                  id="otp"
                  autoComplete="off"
                  error={errors.otp && Boolean(errors.otp?.message)}
                  helperText={typeof errors.otp?.message === 'string' ? errors.otp.message : ''}
                />
              </Grid>}
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p:1 }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
}

