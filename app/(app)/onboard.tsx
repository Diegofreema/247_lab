import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import { Button, HStack } from '@gluestack-ui/themed';
import { Link, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { Container } from '@/components/ui/Container';
import { Image } from '@gluestack-ui/themed';
import { colors } from '@/constants';
import { MyText } from '@/components/ui/MyText';
const onBoardData = [
  {
    heading: 'Welcome to 247Lab',
    subText:
      'Get fast, affordable & and Professional medical Laboratory Diagnosis services from the comfort of your home',
    imgUrl: require('../../assets/images/onboard.png'),
  },
  {
    heading: '24/7 Services',
    subText:
      'Round-the-clock testing services for your convenience and peace of mind.',
    imgUrl: require('../../assets/images/onboard-1.png'),
  },
  {
    heading: 'Professional Staffs',
    subText: 'Our dedicated professionals deliver precise results with care.',
    imgUrl: require('../../assets/images/onboard-2.png'),
  },
];

const Onboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
  const data = onBoardData[currentIndex];

  const onBack = () => {
    const isFirstScreen = currentIndex === 0;
    if (!isFirstScreen) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const onNext = () => {
    if (currentIndex < onBoardData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.replace('/home');
    }
  };

  const swipe = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
    Gesture.Fling().direction(Directions.LEFT).onEnd(onNext)
  );

  const animation = SlideInRight;
  return (
    <GestureDetector gesture={swipe}>
      <Container>
        <Animated.View key={currentIndex} entering={animation}>
          <Animated.View entering={FadeIn} style={styles.imgContainer}>
            <Image source={data.imgUrl} alt="image" style={styles.img} />
          </Animated.View>

          <View style={styles.textContainer}>
            <Animated.Text entering={animation} style={styles.headingText}>
              {data.heading}
            </Animated.Text>
            <View style={{ minHeight: 110 }}>
              <Animated.Text
                entering={animation.delay(200)}
                style={styles.subText}
              >
                {data.subText}
              </Animated.Text>
            </View>
          </View>
        </Animated.View>
        <HStack gap={5} justifyContent="center" mb={15} mt={-10}>
          {onBoardData.map((_, index) => (
            <View
              key={index}
              style={{
                width: 70,

                height: 5,
                borderRadius: 2,
                backgroundColor:
                  index === currentIndex ? colors.green : colors.darkGrey,
              }}
            />
          ))}
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Link href={'/home'} replace style={styles.skip}>
            Skip
          </Link>

          <Button
            style={{
              backgroundColor: colors.green,
              borderRadius: 5,
              height: 50,
              width: 200,
            }}
            onPress={onNext}
          >
            <MyText
              text="Next"
              style={{ color: 'white', fontFamily: 'Poppins', fontSize: 15 }}
            />
            <AntDesign name="arrowright" size={20} color="white" />
          </Button>
        </HStack>
      </Container>
    </GestureDetector>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  imgContainer: {
    width: '100%',
    height: '60%',
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  img: { width: '100%', height: '100%' },
  textContainer: {
    marginTop: 20,
    gap: 20,
  },
  headingText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'PoppinsBold',
    color: 'black',
  },

  subText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
    color: colors.grey,
  },
  skip: {
    color: colors.green,
    fontSize: 15,
    fontFamily: 'PoppinsMedium',
  },
});
