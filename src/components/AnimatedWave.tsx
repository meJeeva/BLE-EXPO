import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface AnimatedWaveProps {
  style?: any;
  translateYValue: Animated.Value;
  opacityRange: number[];
  translateYRange: number[];
}

const AnimatedWave: React.FC<AnimatedWaveProps> = ({
  style,
  translateYValue,
  opacityRange,
  translateYRange,
}) => {
  return (
    <Animated.View
      style={[
        styles.waveCircle,
        style,
        {
          transform: [
            {
              translateY: translateYValue.interpolate({
                inputRange: [0, 1],
                outputRange: translateYRange,
              }),
            },
          ],
          opacity: translateYValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: opacityRange,
          }),
        },
      ]}
    />
  );
};

export default AnimatedWave;

const styles = StyleSheet.create({
  waveCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.PrimaryLight,
  },
});
