
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Calculator } from "lucide-react";
import CarCard from "@/components/CarCard";
import TestDriveModal from "@/components/TestDriveModal";
import PriceQuoteModal from "@/components/PriceQuoteModal";

const Index = () => {
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");

  const cars = [
    {
      name: "Geely Coolray",
      tagline: "Urban. Dynamic. Smart.",
      description: "SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.",
      price: "Từ 699 triệu VNĐ",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
      features: ["Động cơ 1.5L Turbo", "Hệ thống GKUI 19", "6 túi khí an toàn", "Phanh ABS + EBD"]
    },
    {
      name: "Geely Monjaro",
      tagline: "Premium. Powerful. Refined.",
      description: "SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.",
      price: "Từ 1.469 triệu VNĐ",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      features: ["Động cơ 2.0L Turbo", "Hệ thống giải trí 12.3''", "Cruise Control thích ứng", "Cửa sổ trời toàn cảnh"]
    },
    {
      name: "Geely EX5",
      tagline: "Electric. Efficient. Future.",
      description: "SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.",
      price: "Từ 769 triệu VNĐ",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Geely Khánh Hòa</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#cars" className="text-gray-700 hover:text-blue-600 transition-colors">Sản phẩm</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Dịch vụ</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Liên hệ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 animate-fade-in">
            Khám phá thế giới
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-medium">
              Geely
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in">
            Công nghệ tiên tiến. Thiết kế hiện đại. Trải nghiệm vượt trội.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full"
              onClick={() => document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Khám phá ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section id="cars" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Dòng xe <span className="text-blue-600 font-medium">nổi bật</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lựa chọn hoàn hảo cho mọi nhu cầu và phong cách sống
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <CarCard 
                key={car.name}
                car={car}
                index={index}
                onTestDrive={handleTestDrive}
                onPriceQuote={handlePriceQuote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Dịch vụ <span className="text-blue-600 font-medium">chuyên nghiệp</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Đặt lịch lái thử</h3>
                <p className="text-gray-600 mb-6">Trải nghiệm thực tế các dòng xe Geely với lịch hẹn linh hoạt</p>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full"
                  onClick={() => setShowTestDrive(true)}
                >
                  Đặt lịch ngay
                </Button>
              </div>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Báo giá lăn bánh</h3>
                <p className="text-gray-600 mb-6">Nhận báo giá chi tiết và tư vấn các gói tài chính ưu đãi</p>
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-8">
            Liên hệ <span className="text-blue-600 font-medium">với chúng tôi</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Showroom</h3>
              <p className="text-gray-600">Geely Khánh Hòa<br />Nha Trang, Khánh Hòa</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hotline</h3>
              <p className="text-gray-600">0123 456 789</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
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
          <p className="text-gray-400">© 2024 Geely Khánh Hòa. Tất cả quyền được bảo lưu.</p>
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
    </div>
  );
};

export default Index;
