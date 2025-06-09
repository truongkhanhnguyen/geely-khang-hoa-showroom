import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Sparkles, Car, BatteryCharging, GaugeCircle, ShieldCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import CarImageCarousel from '@/components/CarImageCarousel';
import ContactFooter from '@/components/ContactFooter';
import FloatingButtons from '@/components/FloatingButtons';
import TestDriveModal from '@/components/TestDriveModal';
import PriceQuoteModal from '@/components/PriceQuoteModal';
import { useLanguage } from '@/contexts/LanguageContext';

interface CarSpec {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const EX5Details = () => {
  const { t } = useLanguage();
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showPriceQuoteModal, setShowPriceQuoteModal] = useState(false);

  const carImages = [
    "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&h=1080&fit=crop"
  ];

  const carSpecs: CarSpec[] = [
    { icon: <Car className="h-4 w-4" />, label: "Kiểu xe", value: "SUV Điện" },
    { icon: <BatteryCharging className="h-4 w-4" />, label: "Quãng đường di chuyển", value: "400 km" },
    { icon: <GaugeCircle className="h-4 w-4" />, label: "Công suất", value: "160 kW" },
    { icon: <ShieldCheck className="h-4 w-4" />, label: "An toàn", value: "5 sao NCAP" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/53460547-efd5-41cc-9b2d-92f168c32983.png" 
                alt="Geely Logo" 
                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
              <span className="text-xl font-semibold text-gray-900">Geely Ninh Thuận</span>
            </div>
            <div className="space-x-4">
              <Button variant="ghost">Về chúng tôi</Button>
              <Button variant="ghost">Sản phẩm</Button>
              <Button variant="ghost">Tin tức</Button>
              <Button variant="ghost">Liên hệ</Button>
            </div>
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
                carModel="EX5"
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
                  Geely <span className="text-green-600 font-medium">EX5</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  SUV điện thông minh với công nghệ pin tiên tiến và khả năng di chuyển 
                  ấn tượng, đánh dấu tương lai xanh của ngành ô tô.
                </p>
              </div>

              {/* Price Section - Coming Soon */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">COMING SOON</h3>
                  <p className="text-gray-600 mb-4">
                    Mẫu xe điện này sắp được ra mắt tại thị trường Việt Nam
                  </p>
                  <div className="text-sm text-green-600 bg-green-100 rounded-full px-4 py-2 inline-block">
                    Liên hệ để được thông báo khi có sẵn
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                {carSpecs.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                    <div className="text-blue-600">{spec.icon}</div>
                    <div>
                      <p className="text-gray-900 font-medium">{spec.label}</p>
                      <p className="text-gray-600 text-sm">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">
            Thông số <span className="text-green-600 font-medium">kỹ thuật</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Động cơ và hiệu suất
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Loại động cơ:</strong> Điện
                </li>
                <li>
                  <strong>Công suất tối đa:</strong> 160 kW (218 mã lực)
                </li>
                <li>
                  <strong>Mô-men xoắn cực đại:</strong> 300 Nm
                </li>
                <li>
                  <strong>Hệ dẫn động:</strong> Cầu trước (FWD)
                </li>
                <li>
                  <strong>Thời gian tăng tốc 0-100 km/h:</strong> 8.9 giây
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kích thước và trọng lượng
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Chiều dài:</strong> 4.500 mm
                </li>
                <li>
                  <strong>Chiều rộng:</strong> 1.834 mm
                </li>
                <li>
                  <strong>Chiều cao:</strong> 1.615 mm
                </li>
                <li>
                  <strong>Chiều dài cơ sở:</strong> 2.665 mm
                </li>
                <li>
                  <strong>Trọng lượng không tải:</strong> 1.650 kg
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ngoại thất
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Đèn pha:</strong> LED
                </li>
                <li>
                  <strong>Mâm xe:</strong> Hợp kim 18 inch
                </li>
                <li>
                  <strong>Gương chiếu hậu:</strong> Chỉnh điện, gập điện, tích hợp báo rẽ
                </li>
                <li>
                  <strong>Cửa sổ trời:</strong> Panorama
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Electric Features */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">
            Tính năng <span className="text-green-600 font-medium">điện</span> nổi bật
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Pin và sạc
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Loại pin:</strong> Lithium-ion
                </li>
                <li>
                  <strong>Dung lượng pin:</strong> 52.5 kWh
                </li>
                <li>
                  <strong>Thời gian sạc nhanh (DC):</strong> 30 phút (30-80%)
                </li>
                <li>
                  <strong>Thời gian sạc chậm (AC):</strong> 8 tiếng
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Công nghệ điện
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Hệ thống quản lý pin:</strong> Thông minh
                </li>
                <li>
                  <strong>Chế độ lái:</strong> Tiết kiệm, Thông thường, Thể thao
                </li>
                <li>
                  <strong>Phanh tái tạo năng lượng:</strong> Có
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tiện nghi điện
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Màn hình hiển thị thông tin:</strong> LCD 12.3 inch
                </li>
                <li>
                  <strong>Điều hòa:</strong> Tự động, 2 vùng
                </li>
                <li>
                  <strong>Cổng sạc USB:</strong> Hàng ghế trước và sau
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <ContactFooter />

      {/* Modals */}
      <TestDriveModal
        isOpen={showTestDriveModal}
        onClose={() => setShowTestDriveModal(false)}
        carModel="Geely EX5"
      />

      <PriceQuoteModal
        isOpen={showPriceQuoteModal}
        onClose={() => setShowPriceQuoteModal(false)}
        carModel="Geely EX5"
      />

      {/* Floating Buttons */}
      <FloatingButtons />
    </div>
  );
};

export default EX5Details;
