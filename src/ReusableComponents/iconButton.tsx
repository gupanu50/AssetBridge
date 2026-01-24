import React from 'react';
import {
  ImageResizeMode,
  ImageSourcePropType,
  Pressable,
  StyleSheetProperties,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import scaler from '../Utils/scaler';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
type IconButtonProps = {
  type?: 'MaterialCommunityIcons' | 'Image';
  dark?: boolean;
  name: string;
  source?: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  vectorType: string;
  style?: StyleSheetProperties;
};

function IconButton(
  //@ts-ignore
  props: IconButtonProps & Omit<IconProps, 'onPress' | 'name'> & TouchProps,
) {
  const {
    color,
    iconVariant = 'black',
    size = scaler(24),
    borderRadius = (size * 1.5) / 2,
    name,
    vectorType,
    backgroundColor,
    style,
    ...touchProps
  } = props;

  return (
    <Pressable
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      {...touchProps}
      style={style}
    >
      {name && vectorType === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color ? color : iconVariant}
        />
      )}
      {name && vectorType === 'MaterialIcons' && (
        <MaterialIcons
          name={name}
          size={size}
          color={color ? color : iconVariant}
        />
      )}
      {name && vectorType === 'AntDesign' && (
        <AntDesign
          name={name}
          size={size}
          color={color ? color : iconVariant}
        />
      )}
      {name && vectorType === 'Feather' && (
        <Feather
          name={name}
          size={size}
          color={color ? color : iconVariant} />
      )}
      {name && vectorType === 'EvilIcons' && (
        <EvilIcons
          name={name}
          size={size}
          color={color ? color : iconVariant} />
      )}
    </Pressable>
  );
}

export default IconButton;
