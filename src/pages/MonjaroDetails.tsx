import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign } from "lucide-react";
import CarImageCarousel from '@/components/CarImageCarousel';
import ContactFooter from '@/components/ContactFooter';
import FloatingButtons from '@/components/FloatingButtons';
import LanguageToggle from '@/components/LanguageToggle';
import PriceQuoteModal from '@/components/PriceQuoteModal';
import TestDriveModal from '@/components/TestDriveModal';
import { useLanguage } from '@/contexts/LanguageContext';

interface CarSpec {
  label: string;
  value: string;
}

const MonjaroDetails = () => {
  const { t } = useLanguage();
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showPriceQuoteModal, setShowPriceQuoteModal] = useState(false);

  const carImages = [
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop"
  ];

  const carSpecs: CarSpec[] = [
    { label: "Động cơ", value: "2.0L Turbo" },
    { label: "Công suất cực đại", value: "235 mã lực" },
    { label: "Hộp số", value: "Tự động 8 cấp" },
    { label: "Dẫn động", value: "4 bánh toàn thời gian" },
    { label: "Số chỗ", value: "7" },
    { label: "Tiêu thụ nhiên liệu", value: "8.5L/100km" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <a href="/" className="hover:opacity-75 transition-opacity">
                <img
                  src="/lovable-uploads/53460547-efd5-41cc-9b2d-92f168c32983.png"
                  alt="Geely Logo"
                  className="h-8 w-auto"
                />
              </a>
              <span className="text-xl font-semibold text-gray-900">Monjaro</span>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section with Gallery */}
      <section className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Car Gallery */}
            <div className="relative">
              <CarImageCarousel 
                carModel="Monjaro"
                images={carImages}
              />
              
              {/* Action Buttons - Positioned at bottom right of gallery */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-3 z-10">
                <Button
                  onClick={() => setShowTestDriveModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Đặt lịch lái thử
                </Button>
                
                <Button
                  onClick={() => setShowPriceQuoteModal(true)}
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Xem báo giá
                </Button>
              </div>
            </div>

            {/* Right: Car Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Geely <span className="text-blue-600 font-medium">Monjaro</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  SUV 7 chỗ cao cấp với thiết kế sang trọng và công nghệ tiên tiến, 
                  mang đến trải nghiệm lái xe đẳng cấp cho gia đình hiện đại.
                </p>
              </div>

              {/* Price Section - Coming Soon */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">COMING SOON</h3>
                  <p className="text-gray-600 mb-4">
                    Mẫu xe này sắp được ra mắt tại thị trường Việt Nam
                  </p>
                  <div className="text-sm text-blue-600 bg-blue-100 rounded-full px-4 py-2 inline-block">
                    Liên hệ để được thông báo khi có sẵn
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://geely.com/wp-content/uploads/2023/07/icon_01.svg"
                    alt="Feature 1"
                    className="h-10 w-10"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Thiết kế sang trọng</h4>
                    <p className="text-gray-600 text-sm">Ngoại thất lịch lãm, nội thất tinh tế</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://geely.com/wp-content/uploads/2023/07/icon_02.svg"
                    alt="Feature 2"
                    className="h-10 w-10"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Công nghệ tiên tiến</h4>
                    <p className="text-gray-600 text-sm">Hệ thống lái xe thông minh, an toàn</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://geely.com/wp-content/uploads/2023/07/icon_03.svg"
                    alt="Feature 3"
                    className="h-10 w-10"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Động cơ mạnh mẽ</h4>
                    <p className="text-gray-600 text-sm">Vận hành êm ái, tiết kiệm nhiên liệu</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://geely.com/wp-content/uploads/2023/07/icon_04.svg"
                    alt="Feature 4"
                    className="h-10 w-10"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Không gian rộng rãi</h4>
                    <p className="text-gray-600 text-sm">7 chỗ ngồi thoải mái cho cả gia đình</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">
            Thông số <span className="text-blue-600 font-medium">kỹ thuật</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {carSpecs.map((spec, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{spec.label}</h3>
                <p className="text-gray-600">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">
            Tính năng <span className="text-blue-600 font-medium">an toàn</span>
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
              <img
                src="https://geely.com/wp-content/uploads/2023/07/safe_01.svg"
                alt="ABS"
                className="h-8 w-8"
              />
              <span className="text-gray-700">Hệ thống chống bó cứng phanh ABS</span>
            </li>
            <li className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
              <img
                src="https://geely.com/wp-content/uploads/2023/07/safe_02.svg"
                alt="EBD"
                className="h-8 w-8"
              />
              <span className="text-gray-700">Hệ thống phân phối lực phanh điện tử EBD</span>
            </li>
            <li className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
              <img
                src="https://geely.com/wp-content/uploads/2023/07/safe_03.svg"
                alt="BA"
                className="h-8 w-8"
              />
              <span className="text-gray-700">Hệ thống hỗ trợ phanh khẩn cấp BA</span>
            </li>
            <li className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
              <img
                src="https://geely.com/wp-content/uploads/2023/07/safe_04.svg"
                alt="ESP"
                className="h-8 w-8"
              />
              <span className="text-gray-700">Hệ thống cân bằng điện tử ESP</span>
            </li>
            <li className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
              <img
                src="https://geely.com/wp-content/uploads/2023/07/safe_05.svg"
                alt="TCS"
                className="h-8 w-8"
              />
              <span className="text-gray-700">Hệ thống kiểm soát lực kéo TCS</span>
            </li>
            <li className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
              <img
                src="https://geely.com/wp-content/uploads/2023/07/safe_06.svg"
                alt="HHC"
                className="h-8 w-8"
              />
              <span className="text-gray-700">Hệ thống hỗ trợ khởi hành ngang dốc HHC</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Footer */}
      <ContactFooter />

      {/* Modals */}
      <TestDriveModal
        isOpen={showTestDriveModal}
        onClose={() => setShowTestDriveModal(false)}
        carModel="Geely Monjaro"
      />

      <PriceQuoteModal
        isOpen={showPriceQuoteModal}
        onClose={() => setShowPriceQuoteModal(false)}
        carModel="Geely Monjaro"
      />

      {/* Floating Buttons */}
      <FloatingButtons />
    </div>
  );
};

export default MonjaroDetails;
