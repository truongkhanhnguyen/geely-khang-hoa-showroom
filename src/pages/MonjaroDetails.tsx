
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CarImageCarousel } from '@/components/CarImageCarousel';
import { TestDriveModal } from '@/components/TestDriveModal';
import { PriceQuoteModal } from '@/components/PriceQuoteModal';
import { ContactModal } from '@/components/ContactModal';
import { ContactFooter } from '@/components/ContactFooter';
import { ArrowLeft, Calendar, Clock, DollarSign, Phone, MessageCircle, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MonjaroDetails = () => {
  const navigate = useNavigate();
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showPriceQuoteModal, setShowPriceQuoteModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const monjaroImages = [
    "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1549399737-4e4285dd019c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
  ];

  const specifications = {
    engine: "1.5L Turbo DOHC",
    power: "177 HP",
    torque: "255 Nm",
    transmission: "7-speed DCT",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    fuelEconomy: "6.8L/100km",
    seating: "5 seats",
    length: "4543mm",
    width: "1834mm",
    height: "1715mm",
    wheelbase: "2658mm",
    groundClearance: "190mm",
    curbWeight: "1450kg"
  };

  const features = [
    "12.3 inch LCD instrument cluster",
    "12.3 inch touchscreen infotainment",
    "360° surround view camera",
    "Panoramic sunroof",
    "Wireless charging pad",
    "Automatic climate control",
    "Leather seats with heating",
    "ADAS safety features",
    "LED headlights and taillights",
    "Remote engine start",
    "Keyless entry and start",
    "Premium sound system"
  ];

  const safetyFeatures = [
    "6 airbags",
    "ABS with EBD",
    "Electronic Stability Control",
    "Traction Control System",
    "Hill Start Assist",
    "Blind Spot Monitoring",
    "Forward Collision Warning",
    "Automatic Emergency Braking",
    "Lane Departure Warning",
    "Tire Pressure Monitoring",
    "Reversing radar",
    "ISOFIX child seat anchors"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-white hover:text-blue-200 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold">Geely Monjaro</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <CarImageCarousel images={monjaroImages} />
          </div>

          {/* Car Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Geely Monjaro</h1>
              <p className="text-xl text-gray-600 mb-4">SUV 7 chỗ cao cấp, thiết kế hiện đại</p>
              
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  2024
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Mới ra mắt
                </Badge>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">COMING SOON</p>
                    <p className="text-gray-600">Sắp ra mắt tại Ninh Thuận</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => setShowTestDriveModal(true)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Đặt lịch lái thử
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => setShowPriceQuoteModal(true)}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Báo giá
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => setShowContactModal(true)}
              >
                <Phone className="w-5 h-5 mr-2" />
                Gọi ngay
              </Button>
              <Button 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => setShowContactModal(true)}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Nhắn tin
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-16">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="specifications">Thông số</TabsTrigger>
              <TabsTrigger value="features">Tính năng</TabsTrigger>
              <TabsTrigger value="safety">An toàn</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Giới thiệu Geely Monjaro</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Geely Monjaro là mẫu SUV 7 chỗ cao cấp với thiết kế hiện đại và trang bị công nghệ tiên tiến. 
                    Xe được phát triển trên nền tảng Compact Modular Architecture (CMA) của Geely, mang đến sự kết hợp 
                    hoàn hảo giữa hiệu suất, tiện nghi và an toàn.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Với động cơ 1.5L Turbo mạnh mẽ, hộp số DCT 7 cấp và hệ thống an toàn ADAS tiên tiến, 
                    Monjaro hứa hẹn sẽ mang đến trải nghiệm lái xe đẳng cấp cho khách hàng Việt Nam.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Ngoại thất của Monjaro thể hiện ngôn ngữ thiết kế "Expanding Cosmos" đặc trưng của Geely, 
                    với những đường nét năng động và sang trọng. Nội thất rộng rãi với 7 chỗ ngồi tiện nghi, 
                    trang bị màn hình cảm ứng 12.3 inch và hệ thống âm thanh cao cấp.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Thông số kỹ thuật</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Động cơ & Vận hành</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Động cơ:</span>
                        <span className="font-medium">{specifications.engine}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Công suất:</span>
                        <span className="font-medium">{specifications.power}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mô-men xoắn:</span>
                        <span className="font-medium">{specifications.torque}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hộp số:</span>
                        <span className="font-medium">{specifications.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nhiên liệu:</span>
                        <span className="font-medium">{specifications.fuelType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dẫn động:</span>
                        <span className="font-medium">{specifications.drivetrain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tiêu hao nhiên liệu:</span>
                        <span className="font-medium">{specifications.fuelEconomy}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Kích thước & Trọng lượng</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số chỗ ngồi:</span>
                        <span className="font-medium">{specifications.seating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chiều dài:</span>
                        <span className="font-medium">{specifications.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chiều rộng:</span>
                        <span className="font-medium">{specifications.width}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chiều cao:</span>
                        <span className="font-medium">{specifications.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chiều dài cơ sở:</span>
                        <span className="font-medium">{specifications.wheelbase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Khoảng sáng gầm:</span>
                        <span className="font-medium">{specifications.groundClearance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trọng lượng không tải:</span>
                        <span className="font-medium">{specifications.curbWeight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Tính năng nổi bật</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="safety" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Tính năng an toàn</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {safetyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Contact Footer */}
      <ContactFooter />

      {/* Modals */}
      <TestDriveModal 
        isOpen={showTestDriveModal}
        onClose={() => setShowTestDriveModal(false)}
        selectedCar="Geely Monjaro"
      />
      <PriceQuoteModal 
        isOpen={showPriceQuoteModal}
        onClose={() => setShowPriceQuoteModal(false)}
        selectedCar="Geely Monjaro"
      />
      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  );
};

export default MonjaroDetails;
