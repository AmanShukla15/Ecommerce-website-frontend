import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkAuth, forgotPassword, login, loginWithAuth0API, logout, resendOtp, resetPassword, signup, verifyOtp } from './AuthApi'

const initialState = {
    status: "idle",
    errors: null,
    resendOtpStatus: "idle",
    resendOtpSuccessMessage: null,
    resendOtpError: null,
    signupStatus: "idle",
    signupError: null,
    loginStatus: "idle",
    loginError: null,
    loggedInUser: null,
    otpVerificationStatus: "idle",
    otpVerificationError: null,
    forgotPasswordStatus: "idle",
    forgotPasswordSuccessMessage: null,
    forgotPasswordError: null,
    resetPasswordStatus: "idle",
    resetPasswordSuccessMessage: null,
    resetPasswordError: null,
    successMessage: null,
    isAuthChecked: false,
    loginType: null, // "auth0" or "traditional"
}

export const signupAsync = createAsyncThunk('auth/signupAsync', async (cred) => {
    const res = await signup(cred)
    return res
})

export const loginAsync = createAsyncThunk('auth/loginAsync', async (cred) => {
    const res = await login(cred)
    return { user: res, loginType: 'traditional' }; // Specify loginType
})
export const auth0LoginAsync = createAsyncThunk('auth/auth0LoginAsync', async (auth0User, { rejectWithValue }) => {
    try {
        
      // Call the Auth0  API utility function
      const data = await loginWithAuth0API(auth0User.token);
      
      // Return user data and login type
      return { user: data.user, loginType: 'auth0' };
    } catch (error) {
      console.error('Error in auth0LoginAsync:', error.message);
      return rejectWithValue(error.message);
    }
  
});

export const verifyOtpAsync = createAsyncThunk('auth/verifyOtpAsync', async (cred) => {
    const res = await verifyOtp(cred)
    return res
})
export const resendOtpAsync = createAsyncThunk("auth/resendOtpAsync", async (cred) => {
    const res = await resendOtp(cred)
    return res
})
export const forgotPasswordAsync = createAsyncThunk('auth/forgotPasswordAsync', async (cred) => {
    const res = await forgotPassword(cred)
    return res
})

export const resetPasswordAsync = createAsyncThunk('auth/resetPasswordAsync', async (cred) => {
    const res = await resetPassword(cred)
    return res
})

export const checkAuthAsync = createAsyncThunk('auth/checkAuthAsync', async () => {
    const res = await checkAuth()
    return res
})

export const logoutAsync = createAsyncThunk("auth/logoutAsync", async () => {
    const res = await logout()
    return res
})


const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        clearAuthSuccessMessage: (state) => {
            state.successMessage = null
        },
        clearAuthErrors: (state) => {
            state.errors = null
        },
        resetAuthStatus: (state) => {
            state.status = 'idle'
        },
        clearLoginType: (state) => {
            state.loginType = null;
        },
        resetSignupStatus: (state) => {
            state.signupStatus = 'idle'
        },
        clearSignupError: (state) => {
            state.signupError = null
        },
        resetLoginStatus: (state) => {
            state.loginStatus = 'idle'
        },
        clearLoginError: (state) => {
            state.loginError = null
        },
        resetOtpVerificationStatus: (state) => {
            state.otpVerificationStatus = 'idle'
        },
        clearOtpVerificationError: (state) => {
            state.otpVerificationError = null
        },
        resetResendOtpStatus: (state) => {
            state.resendOtpStatus = 'idle'
        },
        clearResendOtpError: (state) => {
            state.resendOtpError = null
        },
        clearResendOtpSuccessMessage: (state) => {
            state.resendOtpSuccessMessage = null
        },
        resetForgotPasswordStatus: (state) => {
            state.forgotPasswordStatus = 'idle'
        },
        clearForgotPasswordSuccessMessage: (state) => {
            state.forgotPasswordSuccessMessage = null
        },
        clearForgotPasswordError: (state) => {
            state.forgotPasswordError = null
        },
        resetResetPasswordStatus: (state) => {
            state.resetPasswordStatus = 'idle'
        },
        clearResetPasswordSuccessMessage: (state) => {
            state.resetPasswordSuccessMessage = null
        },
        clearResetPasswordError: (state) => {
            state.resetPasswordError = null
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(signupAsync.pending, (state) => {
                state.signupStatus = 'pending'
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.signupStatus = 'fullfilled'
                state.loggedInUser = action.payload
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.signupStatus = 'rejected'
                state.signupError = action.error
            })

            .addCase(loginAsync.pending, (state) => {
                state.loginStatus = 'pending'
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loginStatus = 'fullfilled'
                state.loggedInUser = action.payload.user
                state.loginType = action.payload.loginType; // Set loginType
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loginStatus = 'rejected'
                state.loginError = action.error
            })

            .addCase(auth0LoginAsync.pending, (state) => {
                state.loginStatus = 'pending';
            })
            .addCase(auth0LoginAsync.fulfilled, (state, action) => {
                state.loginStatus = 'fulfilled';
                state.loggedInUser = action.payload.user;
                state.loginType = action.payload.loginType; // Set loginType
            })
            .addCase(auth0LoginAsync.rejected, (state, action) => {
                state.loginStatus = 'rejected';
                state.loginError = action.error;
            })

            .addCase(verifyOtpAsync.pending, (state) => {
                state.otpVerificationStatus = 'pending'
            })
            .addCase(verifyOtpAsync.fulfilled, (state, action) => {
                state.otpVerificationStatus = 'fullfilled'
                state.loggedInUser = action.payload
            })
            .addCase(verifyOtpAsync.rejected, (state, action) => {
                state.otpVerificationStatus = 'rejected'
                state.otpVerificationError = action.error
            })

            .addCase(resendOtpAsync.pending, (state) => {
                state.resendOtpStatus = 'pending'
            })
            .addCase(resendOtpAsync.fulfilled, (state, action) => {
                state.resendOtpStatus = 'fullfilled'
                state.resendOtpSuccessMessage = action.payload
            })
            .addCase(resendOtpAsync.rejected, (state, action) => {
                state.resendOtpStatus = 'rejected'
                state.resendOtpError = action.error
            })

            .addCase(forgotPasswordAsync.pending, (state) => {
                state.forgotPasswordStatus = 'pending'
            })
            .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
                state.forgotPasswordStatus = 'fullfilled'
                state.forgotPasswordSuccessMessage = action.payload
            })
            .addCase(forgotPasswordAsync.rejected, (state, action) => {
                state.forgotPasswordStatus = 'rejected'
                state.forgotPasswordError = action.error
            })

            .addCase(resetPasswordAsync.pending, (state) => {
                state.resetPasswordStatus = 'pending'
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.resetPasswordStatus = 'fullfilled'
                state.resetPasswordSuccessMessage = action.payload
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.resetPasswordStatus = 'rejected'
                state.resetPasswordError = action.error
            })

            .addCase(logoutAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.status = 'fullfilled'
                state.loggedInUser = null
                state.loginType = null // Reset loginType
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.errors = action.error
            })

            .addCase(checkAuthAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = 'fullfilled'
                state.loggedInUser = action.payload
                state.isAuthChecked = true
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.errors = action.error
                state.isAuthChecked = true
            })

    }
})


// exporting selectors
export const selectAuthStatus = (state) => state.AuthSlice.status
export const selectAuthErrors = (state) => state.AuthSlice.errors
export const selectLoggedInUser = (state) => state.AuthSlice.loggedInUser
export const selectLoginType = (state) => state.AuthSlice.loginType; // New selector
export const selectAuthSuccessMessage = (state) => state.AuthSlice.successMessage
export const selectIsAuthChecked = (state) => state.AuthSlice.isAuthChecked
export const selectResendOtpStatus = (state) => state.AuthSlice.resendOtpStatus
export const selectResendOtpSuccessMessage = (state) => state.AuthSlice.resendOtpSuccessMessage
export const selectResendOtpError = (state) => state.AuthSlice.resendOtpError
export const selectSignupStatus = (state) => state.AuthSlice.signupStatus
export const selectSignupError = (state) => state.AuthSlice.signupError
export const selectLoginStatus = (state) => state.AuthSlice.loginStatus
export const selectLoginError = (state) => state.AuthSlice.loginError
export const selectOtpVerificationStatus = (state) => state.AuthSlice.otpVerificationStatus
export const selectOtpVerificationError = (state) => state.AuthSlice.otpVerificationError
export const selectForgotPasswordStatus = (state) => state.AuthSlice.forgotPasswordStatus
export const selectForgotPasswordSuccessMessage = (state) => state.AuthSlice.forgotPasswordSuccessMessage
export const selectForgotPasswordError = (state) => state.AuthSlice.forgotPasswordError
export const selectResetPasswordStatus = (state) => state.AuthSlice.resetPasswordStatus
export const selectResetPasswordSuccessMessage = (state) => state.AuthSlice.resetPasswordSuccessMessage
export const selectResetPasswordError = (state) => state.AuthSlice.resetPasswordError

// exporting reducers
export const { clearAuthSuccessMessage, clearAuthErrors, resetAuthStatus, clearLoginType,  clearSignupError, resetSignupStatus, clearLoginError, resetLoginStatus, clearOtpVerificationError, resetOtpVerificationStatus, clearResendOtpError, clearResendOtpSuccessMessage, resetResendOtpStatus, clearForgotPasswordError, clearForgotPasswordSuccessMessage, resetForgotPasswordStatus, clearResetPasswordError, clearResetPasswordSuccessMessage, resetResetPasswordStatus } = authSlice.actions

export default authSlice.reducer

