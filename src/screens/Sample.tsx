import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useThemeStore} from '../store/authStore';

const Sample = () => {
  const {isDarkMode, theme, ToggleTheme} = useThemeStore();
  return (
    <View className="flex-1 bg-slate-700">
      <TouchableOpacity
        className="text-black"
        onPress={() => {
          ToggleTheme();
        }}>
        <Text
          className="text-white text-center"
          style={{color: theme?.light}}>
          Press
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Sample;
