
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Calculator, Phone } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import TestDriveModal from "@/components/TestDriveModal";
import PriceQuoteModal from "@/components/PriceQuoteModal";
import LoanCalculator from "@/components/LoanCalculator";
import NewsSection from "@/components/NewsSection";
import ContactModal from "@/components/ContactModal";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");

  const cars = [
    {
      name: "Geely Coolray",
      tagline: "Urban. Dynamic. Smart.",
      description: "SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.",
      price: "Từ 699 triệu VNĐ",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
      features: ["Động cơ 1.5L Turbo", "Hệ thống GKUI 19", "6 túi khí an toàn", "Phanh ABS + EBD"]
    },
    {
      name: "Geely Monjaro",
      tagline: "Premium. Powerful. Refined.",
      description: "SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.",
      price: "Từ 1.469 triệu VNĐ",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&h=1080&fit=crop",
      features: ["Động cơ 2.0L Turbo", "Hệ thống giải trí 12.3''", "Cruise Control thích ứng", "Cửa sổ trời toàn cảnh"]
    },
    {
      name: "Geely EX5",
      tagline: "Electric. Efficient. Future.",
      description: "SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.",
      price: "Từ 769 triệu VNĐ",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1920&h=1080&fit=crop",
      features: ["100% động cơ điện", "Phạm vi 400km", "Sạc nhanh 30 phút", "Hệ thống tự lái L2"]
    }
  ];

  const handleTestDrive = (carName: string) => {
    setSelectedCar(carName);
    setShowTestDrive(true);
  };

  const handlePriceQuote = (carName: string) => {
    setSelectedCar(carName);
    setShowPriceQuote(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Geely Khánh Hòa</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#cars" className="text-gray-700 hover:text-blue-600 transition-colors">{t('products')}</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">{t('services')}</a>
              <a href="#news" className="text-gray-700 hover:text-blue-600 transition-colors">{t('news')}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">{t('contact')}</a>
              <Button
                onClick={() => setShowContact(true)}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                Liên hệ lại
              </Button>
              <LanguageToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <HeroCarousel 
        cars={cars}
        onTestDrive={handleTestDrive}
        onPriceQuote={handlePriceQuote}
      />

      {/* Loan Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Tính toán <span className="text-green-600 font-medium">vay trả góp</span>
            </h2>
            <p className="text-lg text-gray-600">
              Hỗ trợ vay lên đến 80% giá trị xe với lãi suất ưu đãi
            </p>
          </div>
          <LoanCalculator carPrice={1469000000} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              {t('professionalServices')} <span className="text-blue-600 font-medium"></span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('testDriveTitle')}</h3>
                <p className="text-gray-600 mb-6">{t('testDriveDesc')}</p>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full"
                  onClick={() => setShowTestDrive(true)}
                >
                  {t('scheduleNow')}
                </Button>
              </div>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('priceQuoteTitle')}</h3>
                <p className="text-gray-600 mb-6">{t('priceQuoteDesc')}</p>
                <Button 
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-full"
                  onClick={() => setShowPriceQuote(true)}
                >
                  Xem báo giá
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-8">
            {t('contactUs')} <span className="text-blue-600 font-medium"></span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('showroom')}</h3>
              <p className="text-gray-600">Geely Khánh Hòa<br />Nha Trang, Khánh Hòa</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('hotline')}</h3>
              <p className="text-gray-600">0123 456 789</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('email')}</h3>
              <p className="text-gray-600">info@geelykhanhhoa.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-semibold">Geely Khánh Hòa</span>
          </div>
          <p className="text-gray-400">© 2024 Geely Khánh Hòa. {t('allRightsReserved')}</p>
        </div>
      </footer>

      {/* Modals */}
      <TestDriveModal 
        isOpen={showTestDrive} 
        onClose={() => setShowTestDrive(false)}
        selectedCar={selectedCar}
      />
      <PriceQuoteModal 
        isOpen={showPriceQuote} 
        onClose={() => setShowPriceQuote(false)}
        selectedCar={selectedCar}
      />
      <ContactModal 
        isOpen={showContact}
        onClose={() => setShowContact(false)}
      />
    </div>
  );
};

export default Index;
