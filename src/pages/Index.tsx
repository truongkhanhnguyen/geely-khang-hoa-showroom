import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Calculator, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "@/components/HeroCarousel";
import TestDriveModal from "@/components/TestDriveModal";
import PriceQuoteModal from "@/components/PriceQuoteModal";
import LoanCalculator from "@/components/LoanCalculator";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingButtons from "@/components/FloatingButtons";
import PromotionsSection from "@/components/PromotionsSection";
import ContactFooter from "@/components/ContactFooter";
import NewsSection from "@/components/NewsSection";
import ContactModal from "@/components/ContactModal";
const Index = () => {
  const {
    t
  } = useLanguage();
  const navigate = useNavigate();
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const cars = [{
    name: "Geely Coolray",
    tagline: "Urban. Dynamic. Smart.",
    description: "SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.",
    price: "Từ 538 triệu VNĐ",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
    features: ["Động cơ 1.5L Turbo", "Hệ thống GKUI 19", "6 túi khí an toàn", "Phanh ABS + EBD"]
  }, {
    name: "Geely Monjaro",
    tagline: "Premium. Powerful. Refined.",
    description: "SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.",
    price: "Từ 1.469 triệu VNĐ",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&h=1080&fit=crop",
    features: ["Động cơ 2.0L Turbo", "Hệ thống giải trí 12.3''", "Cruise Control thích ứng", "Cửa sổ trời toàn cảnh"]
  }, {
    name: "Geely EX5",
    tagline: "Electric. Efficient. Future.",
    description: "SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.",
    price: "Từ 769 triệu VNĐ",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1920&h=1080&fit=crop",
    features: ["100% động cơ điện", "Phạm vi 400km", "Sạc nhanh 30 phút", "Hệ thống tự lái L2"]
  }];
  const handleTestDrive = (carName: string) => {
    setSelectedCar(carName);
    setShowTestDrive(true);
  };
  const handlePriceQuote = (carName: string) => {
    setSelectedCar(carName);
    setShowPriceQuote(true);
  };
  const handleExplore = (carName: string) => {
    switch (carName) {
      case "Geely Coolray":
        navigate("/coolray");
        break;
      case "Geely Monjaro":
        navigate("/monjaro");
        break;
      case "Geely EX5":
        navigate("/ex5");
        break;
      default:
        break;
    }
  };
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-3">
              <img src="/lovable-uploads/3f3f054c-409a-4bfd-84c6-f58576129a83.png" alt="Geely Logo" className="h-6 md:h-8 w-auto" />
              <span className="text-sm md:text-xl font-bold text-gray-900 tracking-wider" style={{
              fontFamily: 'Arial, sans-serif'
            }}>NINH THUẬN</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#cars" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">SẢN PHẨM</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">DỊCH VỤ</a>
              
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium" onClick={() => setShowContactModal(true)}>
                LIÊN HỆ
              </Button>
              <LanguageToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* SEO optimized Hero Carousel */}
      <HeroCarousel cars={cars} onTestDrive={handleTestDrive} onPriceQuote={handlePriceQuote} onExplore={handleExplore} />

      {/* SEO optimized Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-light text-gray-900 mb-4">
              Dịch vụ chuyên nghiệp <span className="text-blue-600 font-medium">Geely Ninh Thuận</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Đại lý chính hãng Geely tại Ninh Thuận - Lái thử miễn phí, vay 80%, bảo hành toàn quốc
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <article className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Đặt lịch lái thử xe miễn phí</h2>
                <p className="text-gray-600 mb-6">Trải nghiệm các dòng xe Geely Coolray, Monjaro, EX5 tại Ninh Thuận. Lái thử miễn phí, tư vấn chuyên nghiệp.</p>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full" onClick={() => setShowTestDrive(true)} aria-label="Đặt lịch lái thử xe Geely miễn phí">
                  Đặt lịch ngay
                </Button>
              </div>
            </article>

            <article className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Báo giá và tư vấn vay trả góp</h2>
                <p className="text-gray-600 mb-6">Nhận báo giá lăn bánh chi tiết và tư vấn vay mua xe lên đến 80% giá trị xe với lãi suất ưu đãi.</p>
                <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-full" onClick={() => setShowPriceQuote(true)} aria-label="Xem báo giá xe Geely và tư vấn vay trả góp">
                  Xem báo giá
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Promotions Section with SEO */}
      <PromotionsSection />

      {/* News Section with SEO */}
      <NewsSection />

      {/* SEO optimized Loan Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Tính toán <span className="text-green-600 font-medium">vay trả góp xe Geely</span>
            </h2>
            <p className="text-lg text-gray-600">
              Hỗ trợ vay lên đến 80% giá trị xe với lãi suất ưu đãi tại Ninh Thuận
            </p>
          </div>
          <LoanCalculator carPrice={1469000000} />
        </div>
      </section>

      {/* Contact Footer */}
      <ContactFooter />

      {/* Floating Buttons */}
      <FloatingButtons />

      {/* Modals */}
      <TestDriveModal isOpen={showTestDrive} onClose={() => setShowTestDrive(false)} selectedCar={selectedCar} />
      <PriceQuoteModal isOpen={showPriceQuote} onClose={() => setShowPriceQuote(false)} selectedCar={selectedCar} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>;
};
export default Index;
