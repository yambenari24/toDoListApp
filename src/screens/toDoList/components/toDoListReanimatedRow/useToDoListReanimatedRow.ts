import {useEffect, useMemo} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {SCREEN_WIDTH} from '../constant';
import {styles} from './style';

export function useToDoListReanimatedRow(isOpen: boolean, onSwipe: () => void) {
  const translateX = useSharedValue(0);

  // Use an effect to trigger animation based on 'isOpen'
  useEffect(() => {
    translateX.value = isOpen ? -SCREEN_WIDTH * 0.2 : 0;
  }, [isOpen, translateX]);

  // Animated style for the row
  const animatedRowStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  // Pan gesture handling
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(event => {
      if (event.translationX < -40) {
        runOnJS(onSwipe)(); // Execute the swipe action
        translateX.value = withSpring(-SCREEN_WIDTH * 0.2);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useMemo(
    () => [styles.row, animatedRowStyle],
    [animatedRowStyle],
  );

  return {translateX, animatedRowStyle, panGesture, animatedStyle};
}
