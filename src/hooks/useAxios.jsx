import {useEffect} from 'react';
import { axiosIntercepted } from '../services/index';
import {useAuthStore} from '../store/authStore';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useAuthStore(state => state.auth);

  useEffect(() => {
    const requestIntercept = axiosIntercepted.interceptors.request.use(
      config => {
        if (!config.headers['AUTHKEY']) {
          config.headers['AUTHKEY'] = `${auth?.refreshToken}`;
        }

        return config;
      },
      // eslint-disable-next-line no-undef
      error => Promise.reject(error),
    );

    const responseIntercept = axiosIntercepted.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (
          [401, 412].includes(error?.response?.status) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const newRefreshToken = await refresh();
          if (!newRefreshToken) {
            return null;
          }
          prevRequest.headers['AUTHKEY'] = `${newRefreshToken}`;
          return axiosIntercepted(prevRequest);
        }
        // eslint-disable-next-line no-undef
        return Promise.reject(error);
      },
    );

    return () => {
      axiosIntercepted.interceptors.request.eject(requestIntercept);
      axiosIntercepted.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosIntercepted;
};

export default useAxiosPrivate;
