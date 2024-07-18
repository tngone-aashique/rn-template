import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_USER, SECURE_STORAGE_KEYS} from '../utils/constanst';
import {persist, createJSONStorage} from 'zustand/middleware';

interface LookUpState {
  lookups: any[];
  setLookups: (look: any[]) => void;
}

interface AuthState {
  auth: typeof BASE_USER;
  initializing: boolean;
  setAuth: (auths: Partial<typeof BASE_USER>) => void;
  setUserName: (username: string) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setInitializing: (initializing: boolean) => void;
}

interface ThemeState {
  isDarkMode: boolean;
  theme: Theme;
  ToggleTheme: () => void;
}

interface Theme {
  white: string;
  success: string;
  error: string;
  info: string;
  dark: string;
  light: string;
  otpTextLight: string;
  backgroundLight: string;
  primaryBorderColor: string;
  primaryColor: string;
  secondaryColor: string;
  trashColor: string;
  whitemode?: string;
  line: string;
  profileBackground: string;
  darkMode?: string;
}

export const useLookUpStore = create<LookUpState>(set => ({
  lookups: [],
  setLookups: look => set(() => ({lookups: look})),
}));

export const useAuthStore = create<AuthState>()(
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
      storage: createJSONStorage(() => AsyncStorage as any),
      onRehydrateStorage: state => {
        // function to know wether the apploads data from the local storage
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            state?.setInitializing(false);
          }
        };
      },
    },
  ),
);

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDarkMode: true,
      theme: darkTheme,
      ToggleTheme: () =>
        set(state => ({
          isDarkMode: !state.isDarkMode,
          theme: state.isDarkMode ? lightTheme : darkTheme,
        })),
    }),
    {
      name: SECURE_STORAGE_KEYS.APP_THEME, // storing the theme in the local storage
      storage: createJSONStorage(() => AsyncStorage as any),
    },
  ),
);

const lightTheme = {
  white: '#FFFFFF',
  success: '#5cb85c',
  error: '#FF3C3E',
  info: '#eee600',
  dark: '#000000',
  light: '#000000',
  otpTextLight: '#D3D3D3',
  backgroundLight: '#FFFFFF',
  primaryBorderColor: '#000000',
  primaryColor: '#FFFFFF',
  secondaryColor: '#B6B6B6',
  trashColor: '#FFFFFF',
  whitemode: '#DBDBDB',
  line: '#DBDBDB',
  profileBackground: '#E8E8E8',
};

const darkTheme = {
  white: '#FFFFFF',
  success: '#5cb85c',
  error: '#FF3333',
  info: '#eee600',
  otpTextLight: '#404040',
  dark: '#121212',
  backgroundLight: '#121212',
  primaryBorderColor: '#08E2FF',
  light: '#FFFFFF',
  primaryColor: '#08E2FF',
  secondaryColor: '#B6B6B6',
  trashColor: '#cf434a',
  darkMode: '#93F2FF',
  line: 'rgba(255, 255, 255, 0.20)',
  profileBackground: 'rgba(69, 69, 69, 0.7)',
};
