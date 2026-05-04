import { I18nContext, TranslateOptions } from 'nestjs-i18n'

export function t(key: string, fallback: string, options?: TranslateOptions): string {
  return I18nContext.current()?.t(key, options) ?? fallback
}
