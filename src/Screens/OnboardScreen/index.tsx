import { Image, ImageBackground, View } from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../Assets';
import { Text } from 'react-native-gesture-handler';
import { mainColors } from '../../Utils/helper';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CommonButton from '../../ReusableComponents/commonButton';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { renderProps } from './type';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';

type Props = MainStackScreenProps<'Onboard'>;
const OnboardScreen = ({ navigation }: Props) => {
  const [indexSwiper, setIndexSwiper] = useState(0);

  const swiperData = [
    {
      id: 1,
      perAmt: 'Curated',
      descText: 'Algo Marketplace',
      incText: 'Hand-picked strategies across Indian markets',
      img: Images.swiperImg,
    },
    {
      id: 2,
      perAmt: 'Auto',
      descText: 'Trade Execution',
      incText: 'No manual intervention needed',
      img: Images.swiperImg1,
    },
    {
      id: 3,
      perAmt: '6+',
      descText: 'Performance Metrics',
      incText: 'Sharpe • Max DD • Win Rate • Recovery & more',
      img: Images.swiperImg2,
    },
    {
      id: 4,
      perAmt: '3',
      descText: 'Steps to Start',
      incText: 'Login → Connect Broker → Subscribe',
      img: Images.swiperImg3,
    },
  ];
  const isLastSlide = indexSwiper === swiperData.length - 1;
  const renderSwiperItem = (item: renderProps) => {
    const { perAmt, descText, incText, img } = item;
    return (
      <View style={styles.renderBoxView}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)']}
          style={styles.shadowOverlay}
        />
        <Text style={styles.swiperCardFirstText}>{perAmt}</Text>
        <View style={styles.flexView}>
          <View style={styles.innerFlexView}>
            <Text style={styles.swiperCardFirstText1}>{descText}</Text>
            <Text style={styles.swiperCardFirstText2}>{incText}</Text>
          </View>
          <Image source={img} style={styles.img} resizeMode="contain" />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={Images.onboardBg} style={styles.backgroundImg} resizeMode='stretch'>
        <View style={styles.logoView}>
          <Image
            source={Images.logo}
            style={styles.logoImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.mainView}>
          <Text style={styles.headingText}>What is Asset Bridge?</Text>
          <Text style={styles.descText}>
            Asset Bridge is a smart algo trading platform that lets you invest in automated strategies built by experienced traders. No charts, no manual trading—just data-driven execution.
          </Text>
          <View style={styles.heightView} />
          <Text style={styles.headingText1}></Text>
          <SwiperFlatList
            data={swiperData}
            showPagination
            paginationStyle={styles.dotPagination}
            paginationActiveColor={mainColors.activeDot}
            paginationStyleItem={styles.dotPaginationStyle}
            renderItem={({ item }) => renderSwiperItem(item)}
            keyExtractor={item => item.id.toString()}
            onChangeIndex={({ index }) => setIndexSwiper(index)}
          />
        </View>
        <View style={styles.skipLogin}>
          {isLastSlide ? (
            <CommonButton
              label="Login"
              extraStyle={styles.loginBtn}
              onPress={() => navigation.navigate('Login')}
            />
          ) : (
            <CommonButton
              label="Skip"
              backgroundColor="transparent"
              textColor={mainColors.mainButton}
              onPress={() => navigation.navigate('Login')}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default OnboardScreen;
