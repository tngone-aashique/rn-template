import {axiosBase} from '../services';
import {AUTH_ENDPOINTS} from '../services/constants';
import {useAuthStore} from '../store/authStore';
import {BASE_USER} from '../utils/constanst';

const useRefreshToken = () => {
  const {auth, setRefreshToken, setAuth} = useAuthStore(state => ({
    auth: state.auth,
    setRefreshToken: state.setRefreshToken,
    setAuth: state.setAuth,
  }));

  const refresh = async (): Promise<string | null> => {
    const REFRESH_URL = AUTH_ENDPOINTS.REFRESH_TOKEN;
    try {
      const response = await axiosBase.post<{
        success: boolean;
        isReAuthRequired: boolean;
        token: string;
      }>(REFRESH_URL, {
        authToken: auth.accessToken,
      });

      if (!response.data.success || response.data.isReAuthRequired) {
        throw new Error('Log out');
      }

      const newRefreshToken = response.data.token;
      setRefreshToken(newRefreshToken);
      return newRefreshToken;
    } catch (error) {
      setAuth(BASE_USER);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
