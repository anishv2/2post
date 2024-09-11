import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ROUTES } from "../routes/routeslinks";
import { loginSchema } from "../shared/validation/user";
import { handleSnackBar } from "../redux/slices/snackbar";
import userAPI from "../shared/services/api/auth";
import { handleAuth } from "../redux/slices/auth";
import { useAppDispatch } from "../redux/store/store";
import Spinner from "../shared/widgets/Spinner";

type Schema = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({ 
    defaultValues: {
      email: import.meta.env.VITE_DEFAULT_EMAIL,
      password: import.meta.env.VITE_DEFAULT_PWD,
    },
    resolver: zodResolver(loginSchema) });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {

    try {
      setLoading(true);
      const res = await userAPI.login(data);
      if (res.status === 200) {
        dispatch(handleAuth(res.data));
        navigate(`/user/${ROUTES.FEEDS}`);
        dispatch(
          handleSnackBar({
            snackOpen: true,
            snackType: "success",
            snackMessage: res.data.message,
          })
        );
        setLoading(false);
      }
    } catch (error) {
      dispatch(
        handleSnackBar({
          snackOpen: true,
          snackType: "error",
          snackMessage: 'Invalid credentials',
        })
      );
      setLoading(false);
    }
    
    reset();
  };


  return loading ? (
    <Spinner />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            {...register("email")}
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            error={errors.email && Boolean(errors.email?.message)}
            helperText={errors.email && errors.email?.message}
          />

          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={ showPwd ? "text" : "password"}
            id="password"
            {...register("password")}
            error={errors.password && Boolean(errors.password?.message)}
            helperText={errors.password && errors.password?.message}
          />

          <FormControlLabel
            control={<Checkbox value="showPwd" onChange={()=>setShowPwd(!showPwd)} color="primary" />}
            label="Show password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={ROUTES.RECOVER_ACC} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to={ROUTES.REGISTER} variant="body2">
                {"Not a member? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
