
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-1">
      <Button
        variant={language === 'vi' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('vi')}
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          language === 'vi' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        VI
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          language === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageToggle;
