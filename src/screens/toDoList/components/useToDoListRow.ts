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

  const handlePressIn = () => {
    console.log(
      'ttt\x1b[44m',
      new Date().getMilliseconds(),
      new Date().toLocaleTimeString(),
      'press in',
      '\x1b[0m',
    );
    Animated.spring(scaleValue, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    console.log(
      'ttt\x1b[41m',
      new Date().getMilliseconds(),
      new Date().toLocaleTimeString(),
      'press out',
      '\x1b[0m',
    );
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = useMemo(
    () => [styles.row, animatedRowStyle],
    [animatedRowStyle],
  );

  const scalingAnimatedStyle = {
    transform: [{scale: scaleValue}],
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
