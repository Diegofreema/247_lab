import { colors } from '@/constants';
import { Box, Text } from '@gluestack-ui/themed';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const minHeight = 0;

export function OfflineBanner() {
  const netinfo = useNetInfo();
  const insets = useSafeAreaInsets();
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const isOffline = netinfo.isInternetReachable === false;
  const maxHeight = 28 + insets.bottom / 2;

  useEffect(() => {
    if (isOffline) {
      height.value = withTiming(maxHeight);
      opacity.value = withTiming(1);
    } else {
      height.value = withTiming(minHeight);
      opacity.value = withTiming(0);
    }
  }, [isOffline, height, maxHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    marginTop: interpolate(
      height.value,
      [minHeight, maxHeight],
      [minHeight, -insets.bottom + 4]
    ),
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Box style={styles.container}>
        <Box bg={colors.green} style={styles.textContainer}>
          <Text color="white" fontWeight="bold" fontSize={14}>
            App is offline
          </Text>
        </Box>
      </Box>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
});
