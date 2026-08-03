declare const __APP_VERSION__: string;

// echarts doesn't ship types for its i18n locale files
declare module 'echarts/lib/i18n/langnb-NO.js' {
  import type nbNO from 'echarts/types/src/i18n/langnb-NO';

  const locale: typeof nbNO;
  export default locale;
}
