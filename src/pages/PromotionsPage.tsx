
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Gift, Calendar, Percent, Star, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import FloatingButtons from "@/components/FloatingButtons";
import ContactFooter from "@/components/ContactFooter";
import { useLanguage } from "@/contexts/LanguageContext";

const PromotionsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const promotions = [
    {
      id: 1,
      title: "Ưu đãi cuối năm 2024",
      description: "Giảm ngay 50 triệu đồng cho khách hàng mua xe trong tháng 12. Cơ hội vàng để sở hữu xe Geely với mức giá tốt nhất.",
      discount: "50,000,000 VNĐ",
      validUntil: "31/12/2024",
      type: "Giảm giá",
      status: "Còn hiệu lực",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=400&fit=crop",
      bgColor: "from-red-500 to-pink-600",
      conditions: [
        "Áp dụng cho tất cả dòng xe Geely",
        "Thanh toán một lần hoặc vay ngân hàng",
        "Không áp dụng cùng khuyến mãi khác",
        "Số lượng có hạn"
      ]
    },
    {
      id: 2,
      title: "Lãi suất 0% - 12 tháng đầu",
      description: "Vay mua xe với lãi suất 0% trong 12 tháng đầu, hỗ trợ tối đa 80% giá trị xe. Thủ tục nhanh gọn, duyệt vay trong 24h.",
      discount: "0% lãi suất",
      validUntil: "15/01/2025",
      type: "Tài chính",
      status: "Hot",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=400&fit=crop",
      bgColor: "from-green-500 to-emerald-600",
      conditions: [
        "Vay tối đa 80% giá trị xe",
        "Thời hạn vay từ 12-84 tháng",
        "Thu nhập ổn định từ 8 triệu/tháng",
        "Hồ sơ pháp lý đầy đủ"
      ]
    },
    {
      id: 3,
      title: "Quà tặng phụ kiện cao cấp",
      description: "Tặng bộ phụ kiện cao cấp trị giá 15 triệu đồng bao gồm: Camera hành trình, thiết bị định vị GPS, bọc ghế da, thảm lót sàn.",
      discount: "15,000,000 VNĐ",
      validUntil: "28/02/2025",
      type: "Quà tặng",
      status: "Mới",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop",
      bgColor: "from-blue-500 to-indigo-600",
      conditions: [
        "Mua xe trong thời gian khuyến mãi",
        "Nhận xe tại showroom",
        "Quà tặng không quy đổi thành tiền",
        "Lắp đặt miễn phí tại showroom"
      ]
    },
    {
      id: 4,
      title: "Trade-in xe cũ lấy xe mới",
      description: "Đổi xe cũ lấy xe mới với mức giá thu mua cao nhất thị trường. Thẩm định miễn phí, thủ tục nhanh chóng trong ngày.",
      discount: "Giá tốt nhất",
      validUntil: "31/03/2025",
      type: "Thu cũ đổi mới",
      status: "Thường xuyên",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=400&fit=crop",
      bgColor: "from-purple-500 to-violet-600",
      conditions: [
        "Xe đăng ký từ 2018 trở lên",
        "Chưa tai nạn nghiêm trọng",
        "Đầy đủ giấy tờ pháp lý",
        "Thẩm định tại showroom"
      ]
    },
    {
      id: 5,
      title: "Bảo hiểm miễn phí 1 năm",
      description: "Tặng gói bảo hiểm vật chất xe ô tô miễn phí trong năm đầu tiên với mức bồi thường lên đến 100% giá trị xe.",
      discount: "Miễn phí",
      validUntil: "30/04/2025",
      type: "Bảo hiểm",
      status: "Có hạn",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=400&fit=crop",
      bgColor: "from-orange-500 to-red-600",
      conditions: [
        "Mua xe mới tại showroom",
        "Đóng phí trước bạ đầy đủ",
        "Tuân thủ quy định bảo hiểm",
        "Không áp dụng cho xe đã qua sử dụng"
      ]
    },
    {
      id: 6,
      title: "Chăm sóc xe miễn phí 2 năm",
      description: "Miễn phí bảo dưỡng định kỳ trong 2 năm đầu hoặc 40.000km đầu tiên, bao gồm thay dầu, kiểm tra hệ thống.",
      discount: "2 năm miễn phí",
      validUntil: "31/05/2025",
      type: "Bảo dưỡng",
      status: "Đặc biệt",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop",
      bgColor: "from-teal-500 to-cyan-600",
      conditions: [
        "Bảo dưỡng tại đại lý ủy quyền",
        "Sử dụng phụ tùng chính hãng",
        "Tuân thủ lịch bảo dưỡng",
        "Áp dụng cho xe mới"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot": return "bg-red-500";
      case "Mới": return "bg-green-500";
      case "Đặc biệt": return "bg-purple-500";
      case "Có hạn": return "bg-orange-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Quay lại</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">Khuyến mãi</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
              Khuyến mãi <span className="text-red-600 font-medium">đặc biệt</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Cơ hội vàng để sở hữu xe Geely với những ưu đãi hấp dẫn nhất trong năm. 
              Đừng bỏ lỡ các chương trình khuyến mãi có thời hạn!
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>Ưu đãi hấp dẫn</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-blue-500 mr-1" />
                <span>Có thời hạn</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>Uy tín đảm bảo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <Card key={promo.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                <div className="relative overflow-hidden">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 left-4 bg-gradient-to-r ${promo.bgColor} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                    {promo.type === "Giảm giá" && <Percent className="w-3 h-3 mr-1" />}
                    {promo.type === "Tài chính" && <Calendar className="w-3 h-3 mr-1" />}
                    {promo.type === "Quà tặng" && <Gift className="w-3 h-3 mr-1" />}
                    {promo.type}
                  </div>
                  <div className={`absolute top-4 right-4 ${getStatusColor(promo.status)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                    {promo.status}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                    Đến {promo.validUntil}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {promo.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {promo.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-red-600 mb-3">
                      {promo.discount}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-900">Điều kiện:</h4>
                      {promo.conditions.slice(0, 2).map((condition, index) => (
                        <div key={index} className="flex items-start text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                          {condition}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${promo.bgColor} hover:opacity-90 text-white rounded-full group/btn`}
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-white mb-8">
            Không thể bỏ lỡ cơ hội này!
          </h2>
          <p className="text-xl text-red-100 mb-12">
            Liên hệ ngay với chúng tôi để được tư vấn chi tiết và nhận ưu đãi tốt nhất
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch tư vấn
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full"
            >
              Gọi ngay: 0879 89 0879
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <ContactFooter />

      {/* Floating Buttons */}
      <FloatingButtons />
    </div>
  );
};

export default PromotionsPage;
