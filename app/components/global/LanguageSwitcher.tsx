
import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
 
const supportedLanguages = [
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Spanish' },
];
 
export default function LanguageSwitcher({ currentLanguage }: { currentLanguage: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
 
  const getBasePath = (pathname: string) => {
    const parts = pathname.split('/').filter(Boolean);
    if (supportedLanguages.some(lang => lang.id === parts[0])) {
      return `/${parts.slice(1).join('/')}` || '/';
    }
    return pathname;
  };
 
  const basePath = getBasePath(location.pathname);
  const currentLangTitle = supportedLanguages.find(lang => lang.id === currentLanguage)?.title || 'English';
 
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg"
      >
        <span>{currentLangTitle}</span>
        <svg
          className={`w-3 h-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
 
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {supportedLanguages.map((lang) => (
              <Link
                key={lang.id}
                // Construct the new URL: /es + /
                to={lang.id === 'en' ? basePath : `/${lang.id}${basePath}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {lang.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 
 