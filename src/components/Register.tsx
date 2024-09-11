import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal} from '@mui/material/colors';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../routes/routeslinks';
import { useAppDispatch} from '../redux/store/store';
import { registerSchema } from '../shared/validation/user';
import authAPI from '../shared/services/api/auth';
import { handleSnackBar } from '../redux/slices/snackbar';


export const theme = createTheme({
    typography: {
        button: {
          textTransform: 'none'
        }
    },
    palette: {
      primary: {
        main: teal[500],
        contrastText: '#fff'
      },
    }
  });

type Schema=z.infer<typeof registerSchema>;

export default function Register() {
  const {register,handleSubmit,reset,control,formState:{errors}}=useForm<Schema>({resolver:zodResolver(registerSchema)});
  const dispatch=useAppDispatch();
  
  const onSubmit: SubmitHandler<Schema>= async(data:Schema) => {
    try {
      const res= await authAPI.register(data);
      if(res.status===201){
        dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: res.data.message }));
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
    <ThemeProvider theme={theme}>
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
            Register
          </Typography>
          <Box component="form" sx={{mt:3}} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size='small'
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  {...register('firstName')}
                  error={errors.firstName && Boolean(errors.firstName?.message)}
                  helperText={errors.firstName && errors.firstName?.message} 
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register('lastName')}
                  name="lastName"
                  autoComplete="family-name"
                  error={errors.lastName && Boolean(errors.lastName?.message)}
                  helperText={errors.lastName && errors.lastName?.message} 
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="gender"
                  render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    {...field}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  )} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register('email')}
                  name="email"
                  autoComplete="email"
                  error={errors.email && Boolean(errors.email?.message)}
                  helperText={errors.email && errors.email?.message} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="Password"
                  {...register('password')}
                  type="password"
                  id="password"
                  autoComplete="off"
                  error={errors.password && Boolean(errors.password?.message)}
                  helperText={errors.password && errors.password?.message} 
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
                  helperText={errors.repeatPassword && errors.repeatPassword?.message} 
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p:1}}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={NavLink} to={ROUTES.HOME} variant="body2">
                  Already a member? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}