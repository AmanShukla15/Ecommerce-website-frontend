import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync, selectLoggedInUser, selectLoginType } from '../AuthSlice'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

export const Logout = () => {
    const dispatch=useDispatch()
    const loggedInUser=useSelector(selectLoggedInUser)
    const loginType = useSelector(selectLoginType); // e.g., "auth0" or "traditional"
    const navigate=useNavigate()
    const { logout: auth0Logout } = useAuth0();

    useEffect(() => {
      // if (loginType === 'auth0') {
      //     // Logout for Auth0
      //     auth0Logout({
      //         returnTo: window.location.origin, // Redirect after logout
      //     });
      // } else if (loginType === 'traditional') {
          // Logout for traditional login
          dispatch(logoutAsync());
      // }
  }, [loginType, dispatch, auth0Logout]);

    useEffect(()=>{
        if(!loggedInUser){
            navigate("/login")
        }
    },[loggedInUser, navigate])

  return (
    <></>
  )
}
