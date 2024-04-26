import localFont from 'next/font/local';

const sfProDisplayBold = localFont({
  src: '../../assets/fonts/SF-Pro-Display_Bold.ttf',
  weight: 'bold',
  variable: '--sf-pro-display-bold',
});

const sfProDisplayMedium = localFont({
  src: '../../assets/fonts/SF-Pro-Display_Medium.ttf',
  weight: 'medium',
  variable: '--sf-pro-display-medium',
});

const firaCode = localFont({
  src: '../../assets/fonts/FiraCode-Medium.ttf',
  weight: 'medium',
  variable: '--fira-code-medium',
});

const outfitLight = localFont({
  src: '../../assets/fonts/Outfit-Light.ttf',
  weight: 'light',
  variable: '--outfit-light',
});

const outfitRegular = localFont({
  src: '../../assets/fonts/Outfit-Regular.ttf',
  weight: 'regular',
  variable: '--outfit-regular',
});

const outfitMedium = localFont({
  src: '../../assets/fonts/Outfit-Medium.ttf',
  weight: 'medium',
  variable: '--outfit-medium',
});

const outfitSemibold = localFont({
  src: '../../assets/fonts/Outfit-SemiBold.ttf',
  weight: 'semibold',
  variable: '--outfit-semibold',
});

const outfitBold = localFont({
  src: '../../assets/fonts/Outfit-Bold.ttf',
  weight: 'bold',
  variable: '--outfit-bold',
});

export {
  sfProDisplayBold,
  sfProDisplayMedium,
  firaCode,
  outfitLight,
  outfitRegular,
  outfitMedium,
  outfitSemibold,
  outfitBold,
};
