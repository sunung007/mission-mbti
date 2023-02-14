import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import koTranslation from "./ko.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "ko",
    fallbackLng: "ko",
    resources: {
      ko: { translation: koTranslation },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
