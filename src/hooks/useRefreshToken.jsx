import {axiosBase} from '../services';
import AUTH_ENDPOINTS from '../services/Constants';
import {useAuthStore} from '../store/authStore';
import {BASE_USER} from '../utils/constanst';

const useRefreshToken = () => {
  const {auth, setRefreshToken, setAuth} = useAuthStore(state => state);

  const refresh = async () => {
    const REFRESH_URL = AUTH_ENDPOINTS.REFRESH_TOKEN;
    const response = await axiosBase.post(REFRESH_URL, {
      authToken: auth.accessToken,
    });
    let newRefreshToken = null;
    try {
      if (!response.data.success || response.data.isReAuthRequired) {
        throw new Error('Log out');
      }
      newRefreshToken = response.data.token;
      setRefreshToken(newRefreshToken);
    } catch {
      setAuth(BASE_USER);
    }

    return newRefreshToken;
  };
  return refresh;
};

export default useRefreshToken;
