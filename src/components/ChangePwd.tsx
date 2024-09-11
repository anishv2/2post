import { SubmitHandler, useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { useAppDispatch} from '../redux/store/store';
import userAPI from '../shared/services/api/user';
import { handleSnackBar } from '../redux/slices/snackbar'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { changePwdSchema } from '@/shared/validation/user';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routeslinks';


export const theme = createTheme({
    typography: {
        button: {
          textTransform: 'none'
        }
    },
});


type Schema=z.infer<typeof changePwdSchema>;


export default function ChangePwd({ email }: { email: string }) {
  const { register, handleSubmit, reset, formState:{ errors} }=useForm<Schema>({
    resolver: zodResolver(changePwdSchema)
  });
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  
  const onSubmit: SubmitHandler<Schema>= async(data:Schema) => {
    try {
      const res= await userAPI.resetPwd({ password: data.password, email });
      if(res.status===200){
        dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message }));
        navigate(ROUTES.LOGIN); 
      }
      else {
        dispatch(handleSnackBar({ snackOpen: true, snackType: "warning", snackMessage: res.data.message }));
      } 
    } catch (error:any) {
      dispatch(handleSnackBar({ snackOpen: true, snackType: "error", snackMessage: error.message }));
    }
    reset();
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <Box component="form" sx={{mt:3}} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="New Password"
                  {...register('password')}
                  type="password"
                  id="password"
                  autoComplete="off"
                  error={errors.password && Boolean(errors.password?.message)}
                  helperText={typeof errors.password?.message === 'string' ? errors.password.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="Repeat Password"
                  {...register('repeatPassword')}
                  type="password"
                  id="repeatPassword"
                  autoComplete="off"
                  error={errors.repeatPassword && Boolean(errors.repeatPassword?.message)}
                  helperText={typeof errors.repeatPassword?.message === 'string' ? errors.repeatPassword.message : ''} 
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p:1}}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

