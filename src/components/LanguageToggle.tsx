
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'vi' as const, name: 'VI', flag: '🇻🇳' },
    { code: 'en' as const, name: 'EN', flag: '🇺🇸' },
    { code: 'ru' as const, name: 'RU', flag: '🇷🇺' },
    { code: 'zh' as const, name: 'ZH', flag: '🇨🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === language);
  const currentIndex = languages.findIndex(lang => lang.code === language);

  const nextLanguage = () => {
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code);
  };

  const prevLanguage = () => {
    const prevIndex = (currentIndex - 1 + languages.length) % languages.length;
    setLanguage(languages[prevIndex].code);
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 rounded-full p-1 min-w-[120px]">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevLanguage}
          className="rounded-full p-1 hover:bg-gray-200"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-lg">{currentLang?.flag}</span>
            <span className="text-xs font-medium text-gray-700">{currentLang?.name}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextLanguage}
          className="rounded-full p-1 hover:bg-gray-200"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default LanguageToggle;
