import { View, ScrollView, FlatList, Text, Linking } from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import CommonHeader from '../../ReusableComponents/commonHeader';
import scaler from '../../Utils/scaler';
import { MainStackScreenProps } from '../../Navigation/NavigationTypes/screenTypes';
import { styles } from './styles';
import CommonTabSlider from '../../ReusableComponents/commonTabSlider';
import { TopTab } from './types';
import ExploreComponent from '../../ReusableScreenComponents/ExploreComponent';
import PositionsOpenComponent from '../../ReusableScreenComponents/PositionsOpenComponent';
import PositionsClosedComponent from '../../ReusableScreenComponents/PositionsClosedComponent';
import CommonTopBtnSlider from '../../ReusableComponents/commonTopBtnSlider';
import NotificationsModal from '../NotificationScreen';
import useOptionChainDatesDataQuery from '../OptionsChainScreen/Hooks/useGetOptionDatesDataQuery';
import { useDispatch } from 'react-redux';
import { expiry50Data, expiryBankData } from '../../Redux/optionChainExpirySlice';
import useHomeBannersQuery from './Hooks/useHomeBannerQuery';
import { fontFamily, mainColors } from '../../Utils/helper';
import IconButton from '../../ReusableComponents/iconButton';

type Props = MainStackScreenProps<'HomeTab'>;
const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  // -------------------- STATE --------------------
  const [activeTopTab, setActiveTopTab] = useState('Explore');
  const { data: optionChain50DatesData } = useOptionChainDatesDataQuery({
    symbol: String('Nifty50'),
  })
  const nifty50Data = useMemo(() => optionChain50DatesData?.data?.data?.data, [optionChain50DatesData]);
  const { data: optionChainBankDatesData } = useOptionChainDatesDataQuery({
    symbol: String('NiftyBank'),
  });
  const niftyBankData = useMemo(() => optionChainBankDatesData?.data?.data?.data, [optionChainBankDatesData]);
  const { data: homeBannersData, error } = useHomeBannersQuery();
  const homeBanners = useMemo(() => homeBannersData, [homeBannersData]);
  // console.log('HomeBanners', homeBanners, error);
  // Dispatch data to Redux when it changes
  useEffect(() => {
    if (nifty50Data) {
      dispatch(expiry50Data(nifty50Data));
    }
  }, [nifty50Data, dispatch]);

  useEffect(() => {
    if (niftyBankData) {
      dispatch(expiryBankData(niftyBankData));
    }
  }, [niftyBankData, dispatch]);

  // refs to keep tab visible while sliding
  const topTabListRef: any = useRef(null);

  // -------------------- DATA --------------------
  // Tabs exactly like image (slidable) + counts
  const topTabs = useMemo(
    () => [
      { id: 't1', label: 'Explore' },
      { id: 't2', label: 'Positions Opened' },
      { id: 't3', label: 'Positions Closed' },
    ],
    [],
  );
  // -------------------- RENDERERS --------------------
  const renderTopTab = ({ item, index }: { item: TopTab; index: number }) => {
    const isActive = activeTopTab === item.label;
    return (
      <CommonTabSlider
        activeTab="Explore"
        index={index}
        label={item?.label}
        isActive={isActive}
        setIsActive={setActiveTopTab}
      />
    );
  };

  // Top Movers grid cards (kept)
  const [showNoti, setShowNoti] = useState(false);
  const selectedBanner = useMemo(() => {
    return homeBanners?.data?.data?.[1];
  }, [homeBanners]);

  const bannerData = useMemo(() => {
    return selectedBanner?.data || [];
  }, [selectedBanner]);

  const renderInlineBannerText = () => {
    if (!bannerData.length) return null;

    const textItem = bannerData.find((item: any) => item.type === 'text');
    const linkItems = bannerData.filter((item: any) => item.type === 'link');

    const fullText = textItem?.value || '';
    if (!fullText) return null;

    const parts: Array<{
      text: string;
      url?: string;
      isLink?: boolean;
    }> = [];

    let currentIndex = 0;

    const matches: Array<{
      start: number;
      end: number;
      text: string;
      url: string;
    }> = [];

    linkItems.forEach((link: any) => {
      const linkText = link?.text;
      const url = link?.url;

      if (!linkText || !url) return;

      const start = fullText.toLowerCase().indexOf(linkText.toLowerCase());
      if (start !== -1) {
        matches.push({
          start,
          end: start + linkText.length,
          text: fullText.slice(start, start + linkText.length),
          url,
        });
      }
    });

    matches.sort((a, b) => a.start - b.start);

    matches.forEach((match) => {
      if (currentIndex < match.start) {
        parts.push({
          text: fullText.slice(currentIndex, match.start),
        });
      }

      parts.push({
        text: match.text,
        url: match.url,
        isLink: true,
      });

      currentIndex = match.end;
    });

    if (currentIndex < fullText.length) {
      parts.push({
        text: fullText.slice(currentIndex),
      });
    }

    return (
      <Text
        style={styles.renderText}
      >
        {parts.map((part, index) => (
          <Text
            key={`${part.text}-${index}`}
            onPress={part.isLink ? () => Linking.openURL(part.url!) : undefined}
            style={
              part.isLink
                ? {
                  color: mainColors.orangeChart,
                  textDecorationLine: 'underline',
                  fontFamily: fontFamily.poppinsMedium,
                  fontSize: scaler(12),
                  lineHeight: scaler(18),
                }
                : {
                  color: mainColors.orangeChart,
                  fontFamily: fontFamily.poppinsRegular,
                  fontSize: scaler(12),
                  lineHeight: scaler(18),
                }
            }
          >
            {part.text}
          </Text>
        ))}
      </Text>
    );
  };


  return (
    <View style={styles.container}>
      <CommonHeader onPressBell={() => setShowNoti(!showNoti)} navigation={navigation} />
      <NotificationsModal
        visible={showNoti}
        onClose={() => setShowNoti(!showNoti)}
        topOffset={scaler(80)}          // tweak: header height + margin
        arrowRightOffset={scaler(35)}   // tweak: align under bell icon
      />
      <CommonTopBtnSlider navigation={navigation} />
      {bannerData.length > 0 && (
        <View style={styles.bannerView}>
          <View style={styles.bannerIconWrap}>
            <IconButton
              vectorType="MaterialIcons"
              name="warning"
              color={mainColors.orangeChart}
            />
          </View>

          <View style={styles.bannerTextWrap}>
            {renderInlineBannerText()}
          </View>
        </View>
      )}
      {/* -------------------- SLIDABLE TOP TABS (LIKE IMAGE) -------------------- */}
      <View style={styles.topTabsWrap}>
        <FlatList
          ref={topTabListRef}
          data={topTabs}
          keyExtractor={item => item.id}
          renderItem={renderTopTab}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topTabsContent}
          onScrollToIndexFailed={() => { }}
        />
      </View>
      {activeTopTab === 'Explore' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scaler(30) }}
        >
          <ExploreComponent navigation={navigation} />
        </ScrollView>
      ) : activeTopTab === 'Positions Opened' ? (
        <PositionsOpenComponent />
      ) : (
        <PositionsClosedComponent />
      )}
    </View>
  );
};

export default HomeScreen;
