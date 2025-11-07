import {useState, useEffect, useRef} from 'react';
import {CountrySelector} from '~/components/global/CountrySelector';
import {LanguageSelector} from '~/components/global/LanguageSelector';
import {ChevronDownIcon} from '~/components/icons/ChevronDown';

type Props = {
  iconUrl?: string;
};

export default function LanguageCurrencyMenu({iconUrl}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Function to close dropdown manually
  const handleSelectionChange = () => {
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md bg-white text-sm font-medium hover:bg-gray-50"
      >
        {iconUrl && (
          <img
            src={iconUrl}
            alt="Language & Currency"
                   title="Change Language or Currency"
            className="object-contain"
          />
        )}
      </button>
      <div
        role="tooltip"
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#091019] text-white text-sm rounded-md px-3 py-1 opacity-0 pointer-events-none whitespace-nowrap transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        Change Language or Currency
      </div>

      {/* Context Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-[318px] rounded-xl border border-[#DCDCDC] bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {/* Language Section */}
          <div className="p-2 border border-[#DCDCDC] rounded-md m-6">
            <div className="text-[12px] font-[400] text-[#4D4E4F]">
              Change Language
            </div>
            {/* Pass callback to close menu */}
            <LanguageSelector align="left" onChange={handleSelectionChange} />
          </div>

          {/* Currency Section */}
          <div className="p-2 border border-[#DCDCDC] rounded-md m-6">
            <div className="text-[12px] font-[400] text-[#4D4E4F]">
              Change Currency
            </div>
            {/* Pass callback to close menu */}
            <CountrySelector align="left" onChange={handleSelectionChange} />
          </div>
        </div>
      )}
    </div>
  );
}
