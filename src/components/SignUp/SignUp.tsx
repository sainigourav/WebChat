import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../Footer/Footer';
import { validateConfirmPassword, validateRequired } from '../../utils/validation.helper';
import { useSignUpMutation } from '../../core/rtkApi/SignupApi';
import { useHistory } from 'react-router-dom';
import RoutesConstants from '../../constants/RouteConstants';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../core/rtkApi/AuthApi';

const theme = createTheme();

const SignUp = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const [signUp, signUpResult] = useSignUpMutation({fixedCacheKey:"signUpResult"});

    const [nameError, setNameError] = useState(false);
    const [nameErrorText, setNameErrorText] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorText, setPasswordErrorText] = useState("")
    const [cpassError, setCpassError] = useState(false);
    const [cpassErrorText, setCpassErrorText] = useState("")
    // const [proPicError, setProPicError] = useState(false)
    // const [proPicErrorText, setProPicErrorText] = useState("")

    const handleSubmit = (event:any) => {
        event.preventDefault();
        const test = new FormData(event.currentTarget);
        const name =  test.get('name');
        const email = test.get('email');
        const password = test.get('password');
        const confirm_password = test.get('confirm password');
        const profilePic =  test.get('profile_picture');
        setNameError(validateRequired(name));
        setNameErrorText(validateRequired(name) ? "Name required" : "");
        setEmailError(validateRequired(email));
        setEmailErrorText(validateRequired(email) ? "Email required" : "");
        setPasswordError(validateRequired(password));
        setPasswordErrorText(validateRequired(password) ? "Password required" : "");
        setCpassError(validateRequired(confirm_password));
        setCpassErrorText(validateRequired(confirm_password) ? "Confirm Password required" : "");
        if(validateConfirmPassword(confirm_password,password)){
          setCpassError(validateConfirmPassword(confirm_password,password));
          setCpassErrorText("Password mismatch");
        }
        // setproPicError(validateRequired(proPic));
        // setproPicErrorText(validateRequired(proPic) ? "Profile Picture required" : "");
        // validateRequired(name);
        if(!validateRequired(name) && !validateRequired(email) && !validateRequired(password) && !validateRequired(confirm_password) && !validateConfirmPassword(confirm_password,password)){
          const data:any = new FormData();
          data.append( "name", name);
          data.append( "email" ,email);
          data.append( "password", password);
          data.append( "profilePic" ,profilePic);
          signUp(data);
        }
      };

      useEffect(() => {
        if(signUpResult.isSuccess && signUpResult.data){
          dispatch(loginSuccess(signUpResult.data));
          history.push(RoutesConstants.Home);
        }
      }, [signUpResult.isSuccess])

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', overflow: 'auto' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }} encType="multipart/form-data" >
              <TextField
                error={nameError}
                helperText={nameError ? nameErrorText : null}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                error={emailError}
                helperText={emailError ? emailErrorText : null}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                error={passwordError}
                helperText={passwordError ? passwordErrorText : null}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                error={cpassError}
                helperText={cpassError ? cpassErrorText : null}
                margin="normal"
                required
                fullWidth
                name="confirm password"
                label="Confirm Password"
                type="password"
                id="confirm password"
                autoComplete="current-password"
              />
              <TextField
                name="profile_picture"
                type="file"
                fullWidth
                inputProps={{accept:"image/*"}}
              />
              {/* <Button
              variant="contained"
              component="label"
              fullWidth
            >
              Profile Picture
              <input
                type="file"
                accept="image/*"
                // hidden
              />
            </Button> */}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
              <Footer sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default SignUp