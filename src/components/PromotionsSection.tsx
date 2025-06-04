
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Calendar, Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PromotionsSection = () => {
  const { t } = useLanguage();

  const promotions = [
    {
      id: 1,
      title: "Ưu đãi cuối năm",
      description: "Giảm ngay 50 triệu đồng cho khách hàng mua xe trong tháng 12",
      discount: "50,000,000 VNĐ",
      validUntil: "31/12/2024",
      type: "Giảm giá",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=250&fit=crop",
      bgColor: "from-red-500 to-pink-600"
    },
    {
      id: 2,
      title: "Lãi suất 0%",
      description: "Vay mua xe với lãi suất 0% trong 12 tháng đầu",
      discount: "0% lãi suất",
      validUntil: "15/01/2025",
      type: "Tài chính",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
      bgColor: "from-green-500 to-emerald-600"
    },
    {
      id: 3,
      title: "Quà tặng phụ kiện",
      description: "Tặng bộ phụ kiện cao cấp trị giá 15 triệu đồng",
      discount: "15,000,000 VNĐ",
      validUntil: "28/02/2025",
      type: "Quà tặng",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=250&fit=crop",
      bgColor: "from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            {t('currentPromotions')} <span className="text-red-600 font-medium">2024</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('promotionsSubtitle')}
          </p>
        </div>

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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
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
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-red-600">
                    {promo.discount}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-full group/btn"
                >
                  Tìm hiểu thêm
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-full"
          >
            Xem tất cả khuyến mãi
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
