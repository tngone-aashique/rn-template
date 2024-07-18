import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useThemeStore} from '../store/authStore';

const Sample = () => {
  const {isDarkMode, theme, toggleTheme} = useThemeStore();
  return (
    <View className="flex-1 bg-slate-700">
      <TouchableOpacity className="text-black" onPress={toggleTheme}>
        <Text className="text-center" style={{color: theme?.light}}>
          Press
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Sample;
