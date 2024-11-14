import {useEffect, useMemo, useRef} from 'react';
import {Animated, PanResponder, useAnimatedValue} from 'react-native';
import {SCREEN_WIDTH} from './constant';
import {styles} from './styles';

export function useToDoListRow(isOpen: boolean, onSwipe: () => void) {
  const translateX = useRef(new Animated.Value(0)).current;
  const scaleValue = useAnimatedValue(1);

  useEffect(() => {
    if (isOpen) {
      Animated.spring(translateX, {
        toValue: -SCREEN_WIDTH * 0.2,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, translateX]);

  const animatedRowStyle = useMemo(() => {
    return {transform: [{translateX}]};
  }, [translateX]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          onSwipe();
          Animated.spring(translateX, {
            toValue: -SCREEN_WIDTH * 0.2,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const scalingAnimatedStyle = useMemo(
    () => ({
      transform: [{scale: scaleValue}],
    }),
    [scaleValue],
  );
  const animatedStyle = useMemo(
    () => [styles.row, animatedRowStyle],
    [animatedRowStyle],
  );

  const scalingStyle = () => {
    return [styles.row, scalingAnimatedStyle];
  };

  return {
    translateX,
    animatedRowStyle,
    panResponder,
    animatedStyle,
    handlePressIn,
    handlePressOut,
    scalingStyle,
  };
}
