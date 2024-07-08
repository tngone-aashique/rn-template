import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useGeneralHelpers} from '../services/GeneralSettings';
import {useAuthStore, useLookUpStore} from '../store/authStore';
import Sample from '../screens/Sample';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const {initializing, auth, setAuth} = useAuthStore();
  const {lookups} = useLookUpStore(state => state);
  const generalHelpers = useGeneralHelpers();
  // const permissionHandler = usePermissionHandler();

  const [initial, setInitial] = useState(false);

  useEffect(() => {
    // generalHelpers.fetchLookUps();
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.details !== null || Object.keys(state.details).length !== 0) {
        if (
          !state.isConnected &&
          !state.isInternetReachable &&
          state.isInternetReachable !== null
        ) {
          setInitial(true);
          Toast.show({
            visibilityTime: 3000,
            position: 'bottom',
            bottomOffset: 100,
            type: 'error',
            text1: 'net',
            text2: 'net',
          });
        } else {
          if (initial) {
            setInitial(false);
            Toast.show({
              visibilityTime: 3000,
              position: 'bottom',
              bottomOffset: 100,
              type: 'error',
              text1: 'Online',
              text2: 'Online',
            });
          }
        }
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [initial]);

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     permissionHandler.requestAndroidPushNotification();
  //   } else {
  //     hasIOSNotificationUserPermission();
  //   }
  // }, []);
  return (
    <NavigationContainer>
      <>{!initializing && <HomeNavigator />}</>
    </NavigationContainer>
  );
};

const HomeNavigator = () => {
  const {auth} = useAuthStore(state => state);

  return (
    <Stack.Navigator
      initialRouteName="sample"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Group>
        <>
          <Stack.Screen
            name="sample"
            component={Sample}
            options={{
              headerShown: false,
            }}
          />
        </>
      </Stack.Group>
    </Stack.Navigator>
  );
};
