import axios from 'axios';
import useAxiosPrivate from '../hooks/useAxios';
import {useAuthStore, useLookUpStore} from '../store/authStore';

import {AUTH_ENDPOINTS, NOTIFICATION_ENDPOINTS} from './constants';

export function useGeneralHelpers() {
  const {setAuth} = useAuthStore(state => state);
  const {lookups, setLookups} = useLookUpStore(state => state);
  const axiosIntercepted = useAxiosPrivate();
  return {
    fetchLookUps: getLookup(),
    // storeToken: registerFirebase(),
    // removeToken: unRegisterFirebase(),
  };

  function getLookup() {
    return () => {
      if (lookups.length > 0) return;
      try {
        const URL = AUTH_ENDPOINTS.GET_LOOK_UP;
        axiosIntercepted.get(URL).then(response => {
          const out = createLookups(response.data);
          setLookups(out);
        });
      } catch (err) {
        setAuth({
          userId: '',
          accessToken: '',
          refreshToken: '',
          email: '',
          isEmailVerified: false,
          role: '',
          phone: '',
          isPhoneVerified: false,
          roleBasedUserId: '',
          isRoleSelected: false,
          isCalendly: false,
          firstTime: true,
          step: 0,
          employerCompleted: false,
          isPasswordEmailVerified: false,
        });
      }
    };
  }
  // function registerFirebase() {
  //   return token => {
  //     try {
  //       getNewFCMToken()
  //         .then(deviceId => {
  //           try {
  //             const URL = NOTIFICATION_ENDPOINTS.REGISTER_DEVICE_ID;
  //             const BODY = JSON.stringify({
  //               deviceId: deviceId,
  //             });
  //             let CONFIG = {
  //               headers: {
  //                 LOCKETAUTHKEY: `${token}`,
  //                 'Content-Type': 'application/json',
  //               },
  //             };
  //             axios
  //               .post(URL, BODY, CONFIG)
  //               .then(response => {
  //                 const results = response.data;
  //                 if (results.isSuccess) {
  //                   storeFCMToken(deviceId);
  //                 }
  //               })
  //               .catch(err => {});
  //           } catch (err) {}
  //         })

  //         .catch(err => {});
  //     } catch (err) {}
  //   };
  // }

  // function unRegisterFirebase() {
  //   return token => {
  //     retrieveFCMToken()
  //       .then(deviceId => {
  //         try {
  //           const URL = NOTIFICATION_ENDPOINTS.REMOVE_DEVICE_ID;
  //           const BODY = JSON.stringify({
  //             deviceId: deviceId,
  //           });
  //           let CONFIG = {
  //             headers: {
  //               LOCKETAUTHKEY: `${token}`,
  //               'Content-Type': 'application/json',
  //             },
  //           };
  //           axios
  //             .post(URL, BODY, CONFIG)
  //             .then(response => {
  //               const results = response.data;
  //               if (results.isSuccess) {
  //                 deleteFCMToken();
  //                 removeFCMToken().then();
  //               }
  //             })
  //             .catch(err => {});
  //         } catch (err) {}
  //       })
  //       .catch(err => {});
  //   };
  // }
}
