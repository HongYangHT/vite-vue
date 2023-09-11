import { LOCAL_LANGUAGE } from '@/common/constants'
import { localStore } from '@/common/utils/local-store'
import { useEventBus } from '@/hooks/use-bus'
import { Composer, I18n, I18nMode, I18nOptions, Locale, VueI18n, createI18n } from 'vue-i18n'
import { SET_LANGUAGE_TYPE } from '@/common/event-types'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const { eventBus } = useEventBus()

// 读取配置文件
const INITIAL_LOCAL_LANGUAGE = import.meta.env.VITE_INITIAL_LOCAL_LANGUAGE
const DEFAULT_LANG = INITIAL_LOCAL_LANGUAGE
const LOADED_LANGUAGE: string[] = []

const localeMap = new Map([
  ['zh-CN', 'zh-cn'],
  ['en-US', 'en']
])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getResourceMessages = (r: any) => r.default || r

function isComposer(instance: VueI18n | Composer, mode: I18nMode): instance is Composer {
  return mode === 'composition' && isRef(instance.locale)
}

export function getLocale(i18n: I18n): string {
  if (isComposer(i18n.global, i18n.mode)) {
    return i18n.global.locale.value
  } else {
    return i18n.global.locale
  }
}

export function setLocale(i18n: I18n, locale: Locale): void {
  if (isComposer(i18n.global, i18n.mode)) {
    i18n.global.locale.value = locale
  } else {
    i18n.global.locale = locale
  }
}

export function setupI18n(options: I18nOptions = { locale: INITIAL_LOCAL_LANGUAGE }): I18n {
  const i18n = createI18n(options)
  setI18nLanguage(i18n, options.locale as string)
  return i18n
}

export function setI18nLanguage(i18n: I18n, locale: Locale): void {
  setLocale(i18n, locale)
  dayjs.locale(localeMap.get(locale))
  localStore.set(LOCAL_LANGUAGE, locale)
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')?.setAttribute('lang', locale)

  loadLocaleMessages(i18n, locale)

  eventBus.emit(SET_LANGUAGE_TYPE, locale)
}

export async function loadLocaleMessages(i18n: I18n, locale: Locale) {
  if (LOADED_LANGUAGE.includes(locale)) return
  // NOTE: 这里动态导入的是js文件, 原因是为了和 构建后的文件名一致, vue-i18n 也是支持json yaml等格式, 用js是为了更好的做模块化管理国际化文件
  const messages = await import(`../assets/locals/${locale}.js`).then(getResourceMessages)
  i18n.global.setLocaleMessage(locale, messages)
  LOADED_LANGUAGE.push(locale)
  return nextTick()
}

export const i18nFactory = () => {
  const browserLanguage = navigator.language
  const prevLanguage = localStore.get(LOCAL_LANGUAGE)

  const localLanguage = prevLanguage ?? (browserLanguage || DEFAULT_LANG)
  document.querySelector('html')?.setAttribute('lang', localLanguage)

  const _i18n = setupI18n({
    legacy: false,
    locale: localLanguage,
    fallbackLocale: DEFAULT_LANG
  })

  return _i18n
}

export default i18nFactory()
