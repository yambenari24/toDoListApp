import {useEffect, useMemo, useRef} from 'react';
import {Animated, PanResponder} from 'react-native';
import {SCREEN_WIDTH} from './constant';
import {styles} from './styles';

export function useToDoListRow(isOpen: boolean, onSwipe: () => void) {
  const translateX = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

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

  const animatedStyle = useMemo(
    () => [styles.row, animatedRowStyle],
    [animatedRowStyle],
  );

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 2,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const scalingAnimatedStyle = {
    transform: [{scale: 2}],
  };

  return {
    translateX,
    animatedRowStyle,
    panResponder,
    animatedStyle,
    handlePressIn,
    handlePressOut,
    scalingAnimatedStyle,
  };
}
