import axios from 'axios'
import { axiosi } from '../../config/axios'

export const signup = async (cred) => {
    try {
        const res = await axiosi.post("auth/signup", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const login = async (cred) => {
    try {
        const res = await axiosi.post("auth/login", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const loginWithAuth0API = async (token) => {
    try {
        const response = await axiosi.post('/auth/auth0-login', null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Return the response data
    } catch (error) {
        console.error('Error in loginWithAuth0API:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to login with Auth0');
    }
};

export const verifyOtp = async (cred) => {
    try {
        const res = await axiosi.post("auth/verify-otp", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const resendOtp = async (cred) => {
    try {
        const res = await axiosi.post("auth/resend-otp", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const forgotPassword = async (cred) => {
    try {
        const res = await axiosi.post("auth/forgot-password", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const resetPassword = async (cred) => {
    try {
        const res = await axiosi.post("auth/reset-password", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const checkAuth = async (cred) => {
    try {
        const res = await axiosi.get("auth/check-auth")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const logout = async () => {
    try {
        const res = await axiosi.get("auth/logout")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}