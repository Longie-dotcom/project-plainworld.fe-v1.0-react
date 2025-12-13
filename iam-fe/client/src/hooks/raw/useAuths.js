import { authService } from "../../services/authService";

export function useAuths({ setLoading, setError, setInfo }) {
  const gatewayUrl = import.meta.env.VITE_GATEWAY_URL;

  const wrap = async (fn) => {
    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      return await fn();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = ({ email, password, roleCode }) =>
    wrap(async () => authService.login(gatewayUrl, { 
      email, 
      password, 
      roleCode 
    }));

  const logout = () =>
    wrap(async () => authService.logout(gatewayUrl));

  const forgotPassword = ({ email }) =>
    wrap(async () => {
      const res = await authService.forgotPassword(gatewayUrl, { email });
      setInfo(res?.data?.payload);
    });

  const resetPassword = ({ resetToken, confirmPassword, newPassword }) =>
    wrap(async () => {
      const res = await authService.resetPassword(gatewayUrl, { 
        resetToken, 
        confirmPassword, 
        newPassword 
      });
      setInfo(res?.data?.payload);
    });

  const getCurrentUser = () => authService.getCurrentUser();

  return {
    getCurrentUser,
    login,
    logout,
    forgotPassword,
    resetPassword
  };
}
