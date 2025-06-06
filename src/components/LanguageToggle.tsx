
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useState } from "react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'vi' as const, name: 'VI' },
    { code: 'en' as const, name: 'EN' },
    { code: 'ru' as const, name: 'RU' },
    { code: 'zh' as const, name: 'ZH' }
  ];

  const currentIndex = languages.findIndex(lang => lang.code === language);

  const toggleLanguage = () => {
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex].code);
  };

  // Show current and next language
  const currentLang = languages[currentIndex];
  const nextLang = languages[(currentIndex + 1) % languages.length];

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-5 w-5 text-gray-600" />
      <button 
        onClick={toggleLanguage}
        className="text-gray-700 hover:text-gray-900 font-medium"
      >
        {currentLang.name} {nextLang.name}
      </button>
    </div>
  );
};

export default LanguageToggle;
