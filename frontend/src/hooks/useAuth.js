import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to manage authentication state and actions
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isLoggedIn, role, loading, error } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return {
    user,
    token,
    isLoggedIn,
    role,
    loading,
    error,
    logout,
    isAdmin: role === 'admin',
    isSupplier: role === 'supplier',
    isShop: role === 'shop',
  };
};

export default useAuth;
