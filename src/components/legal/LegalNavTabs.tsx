import React from 'react';
import { useNavigation } from '../../context/NavigationContext';

export type LegalTabKey = 'terminos' | 'privacidad' | 'cookies' | 'devoluciones';

interface LegalNavTabsProps {
  activeTab: LegalTabKey;
  onTabChange?: (tab: LegalTabKey) => void;
}

const TABS: Array<{ key: LegalTabKey; label: string; icon: string; path: string }> = [
  { key: 'terminos', label: 'Términos y Condiciones', icon: '📜', path: '/terminos' },
  { key: 'privacidad', label: 'Política de Privacidad', icon: '🔒', path: '/privacidad' },
  { key: 'cookies', label: 'Política de Cookies', icon: '🍪', path: '/cookies' },
  { key: 'devoluciones', label: 'Envíos y Devoluciones', icon: '📦', path: '/devoluciones' },
];

export const LegalNavTabs: React.FC<LegalNavTabsProps> = ({ activeTab, onTabChange }) => {
  const { navigate } = useNavigation();

  const handleSelect = (tab: LegalTabKey) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    if (tab === 'privacidad') {
      navigate('privacidad');
    } else {
      navigate('terminos');
    }
  };

  return (
    <nav
      aria-label="Documentos legales"
      className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full mx-auto max-w-2xl mb-12 shadow-inner border"
      style={{
        background: 'rgba(234, 224, 204, 0.45)',
        borderColor: 'rgba(121, 132, 120, 0.25)',
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleSelect(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
              isActive
                ? 'shadow-sm text-stone-900 font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
            }`}
            style={{
              background: isActive ? '#FAF7F2' : 'transparent',
              color: isActive ? '#2D4A4D' : '#5C6B5C',
              border: isActive ? '1px solid rgba(45, 74, 77, 0.15)' : '1px solid transparent',
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default LegalNavTabs;
