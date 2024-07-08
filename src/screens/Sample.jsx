import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Sample = () => {
  return (
    <View className="flex-1 bg-slate-700">
      <TouchableOpacity className="S bg-fuchsia-500 text-black">
        <Text className="text-white text-center"> Press</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Sample;
