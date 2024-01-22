import { createI18nextIntegration } from '@withease/i18next';
import { attach, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import i18next, { type i18n } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import { appStarted } from '../config/init';
import { assert } from '../lib/typescript';

export type Locale = 'en' | 'ru';

const localeChanged = createEvent<Locale>();

const $i18nextInstance = createStore<i18n | null>(null);

const $locale = createStore<Locale>('en');

const setupI18nextFx = attach({
  source: $locale,
  effect: async (locale) =>
    i18next
      .createInstance({ lng: locale })
      .use(resourcesToBackend(async (language: string) => import(`./locales/${language}.json`))),
});

const changeLanguageFx = attach({
  source: $i18nextInstance,
  effect: async (instance, locale: Locale) => {
    assert(instance, 'i18next API is not ready');
    await instance.changeLanguage(locale);
  },
});

const integration = createI18nextIntegration({
  instance: $i18nextInstance,
  setup: appStarted,
});

$i18nextInstance.on(setupI18nextFx.doneData, (_, next) => next);

$locale.on(localeChanged, (_, next) => next);

persist({ store: $locale, key: 'app-locale' });

sample({ clock: appStarted, target: setupI18nextFx });

sample({ clock: localeChanged, target: changeLanguageFx });

export const i18nModel = { ...integration, $locale, localeChanged };
