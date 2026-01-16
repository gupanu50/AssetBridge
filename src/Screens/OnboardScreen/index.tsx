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

type Props = MainStackScreenProps<'Onboard'>;
const OnboardScreen = ({ navigation }: Props) => {
  const [indexSwiper, setIndexSwiper] = useState(0);

  const swiperData = [
    {
      id: 1,
      perAmt: '$5k',
      descText: 'Lorem Ipsum 1',
      incText: '+10% from yesterday',
      img: Images.swiperImg,
    },
    {
      id: 2,
      perAmt: '500',
      descText: 'Lorem Ipsum 2',
      incText: '+5% from yesterday',
      img: Images.swiperImg1,
    },
    {
      id: 3,
      perAmt: '9',
      descText: 'Lorem Ipsum 3',
      incText: '+15% from yesterday',
      img: Images.swiperImg2,
    },
    {
      id: 4,
      perAmt: '100',
      descText: 'Lorem Ipsum 3',
      incText: '+8% from yesterday',
      img: Images.swiperImg3,
    },
  ];
  const isLastSlide = indexSwiper === swiperData.length - 1;
  const renderSwiperItem = (item: renderProps) => {
    const { perAmt, descText, incText, img } = item;
    return (
      <View style={styles.renderBoxView}>
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
      <ImageBackground source={Images.onboardBg} style={styles.backgroundImg}>
        <View style={styles.logoView}>
          <Image
            source={Images.logo}
            style={styles.logoImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.mainView}>
          <Text style={styles.headingText}>What is Lorem Ipsum?</Text>
          <Text style={styles.descText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500.
          </Text>
          <Text style={styles.headingText1}>Lorem Ipsum is simply dummy</Text>
          <View style={styles.heightView} />
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
