import { useState } from 'react';
import apiClient from '../lib/api-client';
import { useAuthStore } from '../store/authStore';
import { User } from '../types/user';

export const useAuth = () => {
  const { user, token, setCredentials, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.status === 'success') {
        const { _id, name, email: userEmail, role, token } = response.data.data;
        setCredentials({ _id, name, email: userEmail, role }, token);
        return true;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/register', userData);
      if (response.data.status === 'success') {
        const { _id, name, email, role, token } = response.data.data;
        setCredentials({ _id, name, email, role }, token);
        return true;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    error,
    login,
    register,
    logout,
  };
};
