import { Box, FormHelperText, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation } from '../../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab';
import { selectLoggedInUser, loginAsync, selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus, auth0LoginAsync } from '../AuthSlice'
import { toast } from 'react-toastify'
import { MotionConfig, motion } from 'framer-motion'
import { useAuth0 } from "@auth0/auth0-react";
import GoogleIcon from '@mui/icons-material/Google';


export const Login = () => {
  const dispatch = useDispatch()
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const status = useSelector(selectLoginStatus)
  const error = useSelector(selectLoginError)
  const loggedInUser = useSelector(selectLoggedInUser)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const theme = useTheme()
  const is900 = useMediaQuery(theme.breakpoints.down(900))
  const is480 = useMediaQuery(theme.breakpoints.down(480))

  // handles user redirection
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/")
    }
    else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp")
    }
  }, [loggedInUser, navigate])

  // handles login error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (status === "fulfilled" && loggedInUser?.isVerified) {
      toast.success("Login successful");
      reset();
    }

    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status, error, loggedInUser, reset, dispatch]);

  const handleLogin = (data) => {
    dispatch(loginAsync(data));
  };
  // Auth0 login handler
  const handleAuth0Login = async () => {
    try {
      // Redirects to Auth0 login and retrieves the token after successful login
      await loginWithRedirect();

      const auth0User = await getAccessTokenSilently(); // Fetch token from Auth0 client

      // Dispatch the thunk with the user token
      dispatch(auth0LoginAsync({ token: auth0User }));
    } catch (err) {
      console.error("Auth0 login failed: ", err.message);
      toast.error("Auth0 login failed");
    }
  };
  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{ overflowY: "hidden" }}>

      {
        !is900 &&

        <Stack bgcolor={'black'} flex={1} justifyContent={'center'} >
          <Lottie animationData={ecommerceOutlookAnimation} />
        </Stack>
      }

      <Stack flex={1} justifyContent={'center'} alignItems={'center'}>

        <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>

          <Stack rowGap={'.4rem'}>
            <Typography variant='h2' sx={{ wordBreak: "break-word" }} fontWeight={600}>E-Commerce</Typography>
            <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'>- Instant Shopping</Typography>
          </Stack>

        </Stack>

        <Stack mt={4} spacing={2} width={is480 ? "95vw" : '28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleLogin)}>

          <motion.div whileHover={{ y: -5 }}>
            <TextField fullWidth {...register("email", { required: "Email is required", pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, message: "Enter a valid email" } })} placeholder='Email' />
            {errors.email && <FormHelperText sx={{ mt: 1 }} error>{errors.email.message}</FormHelperText>}
          </motion.div>


          <motion.div whileHover={{ y: -5 }}>
            <TextField type='password' fullWidth {...register("password", { required: "Password is required" })} placeholder='Password' />
            {errors.password && <FormHelperText sx={{ mt: 1 }} error>{errors.password.message}</FormHelperText>}
          </motion.div>

          <motion.div >
            <LoadingButton
              fullWidth
              sx={{ height: '2.5rem', marginBottom: '1rem' }}  // Add marginBottom for spacing
              loading={status === 'pending'}
              type='submit'
              variant='contained'
              onClick={handleLogin}  // Add onClick handler here
            >
              Login
            </LoadingButton>

            <LoadingButton
              onClick={handleAuth0Login}
              startIcon={<GoogleIcon />}
              variant="outlined"
              fullWidth
            >
              Login with Google
            </LoadingButton>
          </motion.div>

          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'} >

            <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 1.050 }}>
              <motion.div>
                <Typography mr={'1.5rem'} sx={{ textDecoration: "none", color: "text.primary" }} to={'/forgot-password'} component={Link}>Forgot password</Typography>
              </motion.div>

              <motion.div>
                <Typography sx={{ textDecoration: "none", color: "text.primary" }} to={'/signup'} component={Link}>Don't have an account? <span style={{ color: theme.palette.primary.dark }}>Register</span></Typography>
              </motion.div>
            </MotionConfig>

          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
