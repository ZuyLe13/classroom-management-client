import { API_URL } from "@/constants/api";
import axios from "axios";

export const verifyToken = async (token: string) => {
  try {
    let message = '';
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.exp * 1000 < Date.now()) {
      message = 'Token has expired';
      return message;
    }
    await axios.get(`${API_URL}/verifySetupToken?token=${token}`)
      .then(() => {
        message = '';
      }).catch(error => {
        console.error('Error verifying token:', error);
      });
  } catch (error) {
    console.error('Error verifying student:', error);
    return null;
  }
}

export const loginWithEmail = async (email: string) => {
  try {
    await axios.post(`${API_URL}/auth/loginEmail`, { email });
    localStorage.setItem('email', email);
  } catch (error) {
    console.error('Error logging in with email:', error);
    throw new Error('Login failed');
  }
}

export const setUpAccount = async (data: object) => {
  try {
    await axios.post(`${API_URL}/setupAccount`, data);
  } catch (error) {
    console.log('Error setting up account:', error);
    throw new Error('Account setup failed');
  }
}

export const signIn = async (data: object) => {
  try {
    const user = await axios.post(`${API_URL}/signin`, data);
    return user.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error('Sign in failed');
  }
}

export const createAccessCode = async (phone: string) => {
  try {
    await axios.post(`${API_URL}/auth/createAccessCode`, { phone });
    localStorage.setItem('phone', phone);
  } catch (error) {
    console.error('Error creating access code:', error);
    throw new Error('Create access code failed');
  }
}

export const validateAccessCodeEmail = async (email: string, accessCode: string) => {
  try {
    await axios.post(`${API_URL}/auth/validateAccessCode`, { email, accessCode });
  } catch (error) {
    console.error('Error validating access code:', error);
    throw new Error('Validate access code failed');
  }
}

export const validateAccessCodePhone = async (phone: string, accessCode: string) => {
  try {
    await axios.post(`${API_URL}/auth/validateAccessCode`, { phone, accessCode });
  } catch (error) {
    console.error('Error validating access code:', error);
    throw new Error('Validate access code failed');
  }
}
