import { type Locale } from '~/shared/i18n';

import { images } from './ui/assets';

export const menuItems: Array<{ locale: Locale; label: string; image: string }> = [
  {
    locale: 'en',
    label: 'language.english',
    image: images.english,
  },
  {
    locale: 'ru',
    label: 'language.russian',
    image: images.russian,
  },
];
