
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarImageCarousel from '@/components/CarImageCarousel';
import TestDriveModal from '@/components/TestDriveModal';
import PriceQuoteModal from '@/components/PriceQuoteModal';
import ContactModal from '@/components/ContactModal';
import ContactFooter from '@/components/ContactFooter';
import { ArrowLeft, Calendar, Clock, DollarSign, Phone, MessageCircle, Calculator, Zap, Battery } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EX5Details = () => {
  const navigate = useNavigate();
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [showPriceQuoteModal, setShowPriceQuoteModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const ex5Images = [
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1549399737-4e4285dd019c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop"
  ];

  const specifications = {
    motorPower: "150 kW (201 HP)",
    torque: "310 Nm",
    battery: "61.9 kWh Lithium-ion",
    range: "400 km (NEDC)",
    charging: "DC Fast Charging 80% in 30min",
    drivetrain: "FWD",
    acceleration: "7.6 seconds (0-100km/h)",
    topSpeed: "150 km/h",
    seating: "5 seats",
    length: "4495mm",
    width: "1834mm",
    height: "1596mm",
    wheelbase: "2650mm",
    groundClearance: "180mm",
    curbWeight: "1650kg"
  };

  const features = [
    "10.25 inch touchscreen infotainment",
    "Digital instrument cluster",
    "Wireless charging pad",
    "Automatic climate control",
    "Leather seats",
    "Remote vehicle control via app",
    "Regenerative braking system",
    "Multiple driving modes",
    "LED headlights and DRL",
    "Keyless entry and start",
    "Premium sound system",
    "Panoramic sunroof"
  ];

  const safetyFeatures = [
    "6 airbags",
    "ABS with EBD",
    "Electronic Stability Control",
    "Traction Control System",
    "Hill Start Assist",
    "Rear parking sensors",
    "Reversing camera",
    "ISOFIX child seat anchors",
    "Emergency brake assist",
    "Electronic brakeforce distribution",
    "Tire pressure monitoring",
    "Security alarm system"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-white hover:text-green-200 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold">Geely EX5</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <CarImageCarousel images={ex5Images} />
          </div>

          {/* Car Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Geely EX5</h1>
              <p className="text-xl text-gray-600 mb-4">SUV điện cao cấp, thân thiện môi trường</p>
              
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="flex items-center bg-green-100 text-green-800">
                  <Zap className="w-4 h-4 mr-1" />
                  Electric
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  2024
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Mới ra mắt
                </Badge>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-600">COMING SOON</p>
                    <p className="text-gray-600">Sắp ra mắt tại Ninh Thuận</p>
                  </div>
                  <Battery className="w-12 h-12 text-green-600" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                onClick={() => setShowTestDriveModal(true)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Đặt lịch lái thử
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
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
                <h3 className="text-2xl font-semibold mb-4">Giới thiệu Geely EX5</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Geely EX5 là mẫu SUV điện hoàn toàn đầu tiên của Geely tại Việt Nam, đánh dấu bước chuyển mình 
                    của thương hiệu vào thời đại xe điện. Với thiết kế hiện đại và công nghệ tiên tiến, EX5 hứa hẹn 
                    sẽ mang đến trải nghiệm lái xe hoàn toàn mới.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Được trang bị motor điện công suất 150kW và pin lithium-ion dung lượng 61.9kWh, EX5 có thể 
                    di chuyển quãng đường lên đến 400km với một lần sạc đầy. Hệ thống sạc nhanh DC cho phép sạc 
                    từ 20% lên 80% chỉ trong 30 phút.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Ngoài việc thân thiện với môi trường, EX5 còn mang lại trải nghiệm lái xe êm ái, yên tĩnh 
                    và tiết kiệm chi phí vận hành. Đây là lựa chọn lý tưởng cho những khách hàng muốn sở hữu 
                    một chiếc SUV điện cao cấp với công nghệ hiện đại.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Thông số kỹ thuật</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Hệ thống điện & Vận hành</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Công suất motor:</span>
                        <span className="font-medium">{specifications.motorPower}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mô-men xoắn:</span>
                        <span className="font-medium">{specifications.torque}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pin:</span>
                        <span className="font-medium">{specifications.battery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quãng đường di chuyển:</span>
                        <span className="font-medium">{specifications.range}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sạc nhanh:</span>
                        <span className="font-medium">{specifications.charging}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dẫn động:</span>
                        <span className="font-medium">{specifications.drivetrain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tăng tốc 0-100km/h:</span>
                        <span className="font-medium">{specifications.acceleration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tốc độ tối đa:</span>
                        <span className="font-medium">{specifications.topSpeed}</span>
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
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
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
        selectedCar="Geely EX5"
      />
      <PriceQuoteModal 
        isOpen={showPriceQuoteModal}
        onClose={() => setShowPriceQuoteModal(false)}
        selectedCar="Geely EX5"
      />
      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  );
};

export default EX5Details;
