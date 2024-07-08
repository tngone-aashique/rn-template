import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_USER, SECURE_STORAGE_KEYS} from '../utils/constanst';
import {persist, createJSONStorage} from 'zustand/middleware';

export const useLookUpStore = create(set => ({
  lookups: [],
  setLookups: look => set(() => ({lookups: look})),
}));

export const useAuthStore = create(
  persist(
    (set, get) => ({
      auth: BASE_USER, //intial value
      initializing: true,
      setAuth: auths => set({auth: {...get().auth, ...auths}}), //function to change auth
      setUserName: username => set({auth: {...get().auth, username}}), //function to change user name
      setAccessToken: accessToken => set({auth: {...get().auth, accessToken}}), //function to change accestoken
      setRefreshToken: refreshToken =>
        set({auth: {...get().auth, refreshToken}}), //function to change refreshToken
      setInitializing: initializing => set({initializing}),
    }),
    {
      name: SECURE_STORAGE_KEYS.USER_SESSION, // storing the token in the local storage
      storage: createJSONStorage(() => {
        try {
          return AsyncStorage;
        } catch (error) {
          console.error('Error accessing sessionStorage:', error);
          return;
        }
      }),
      onRehydrateStorage: state => {
        // function to know wether the apploads data from the local storage
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            state.setInitializing(false);
          }
        };
      },
    },
  ),
);
