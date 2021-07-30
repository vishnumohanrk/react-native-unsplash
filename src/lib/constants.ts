import { DarkTheme, Theme } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native';

export const rippleColor = 'rgba(255, 255, 255, 0.32)';
export const rippleConfig = TouchableNativeFeedback.Ripple(rippleColor, true);

export const appTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    card: '#212121',
    text: '#ffffff',
    primary: '#ffffff',
    background: '#111111',
  },
};

export const shrunkHeaderHt = 56;
export const fullHeaderHt = shrunkHeaderHt * 3.5;
export const avatarSize = shrunkHeaderHt * 2;
export const avatarRadius = avatarSize / 2;
