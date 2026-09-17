import { useNavigation } from '../context/NavigationContext';
import { common } from './translations/common';

type Dict = typeof common;
type LangKey = keyof Dict;

const getPath = (obj: unknown, path: string[]): unknown =>
  path.reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

// t('footer.sedesHeading') resuelve en el idioma activo, con fallback a
// español si la clave todavía no existe ahí (migración incremental, fases
// 2-5 del plan de i18n) en vez de romper la pantalla.
export const useTranslation = <D extends Record<LangKey, object> = Dict>(dict: D = common as unknown as D) => {
  const { language } = useNavigation();

  const t = (key: string): unknown => {
    const path = key.split('.');
    const value = getPath(dict[language as LangKey], path);
    if (value !== undefined) return value;
    return getPath(dict.es, path);
  };

  return { t, language };
};
