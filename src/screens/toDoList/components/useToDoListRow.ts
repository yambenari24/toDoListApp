import {useEffect, useMemo, useRef} from 'react';
import {Animated, PanResponder} from 'react-native';
import {SCREEN_WIDTH} from './constant';

export function useToDoListRow(isOpen: boolean, onSwipe: () => void) {
  const translateX = useRef(new Animated.Value(0)).current;

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

  return {translateX, animatedRowStyle, panResponder};
}
