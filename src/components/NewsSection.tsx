
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const NewsSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const newsItems = [
    {
      id: 1,
      title: "Geely ra mắt công nghệ pin mới cho xe điện tại Ninh Thuận",
      excerpt: "Công nghệ pin thế hệ mới của Geely hứa hẹn tăng phạm vi hoạt động lên 500km cho dòng xe EX5...",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=250&fit=crop",
      date: "2024-12-15",
      category: "Công nghệ"
    },
    {
      id: 2, 
      title: "Chương trình ưu đãi đặc biệt tháng 12 tại Geely Ninh Thuận",
      excerpt: "Nhân dịp cuối năm, Geely Ninh Thuận triển khai chương trình ưu đãi hấp dẫn cho khách hàng mua xe...",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=250&fit=crop",
      date: "2024-12-10",
      category: "Khuyến mãi"
    },
    {
      id: 3,
      title: "Geely đạt chứng nhận an toàn 5 sao ASEAN NCAP",
      excerpt: "Các dòng xe Geely Coolray, Monjaro tiếp tục khẳng định vị thế với chứng nhận an toàn cao nhất...",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop", 
      date: "2024-12-05",
      category: "An toàn"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Tin tức mới nhất <span className="text-blue-600 font-medium">Geely Ninh Thuận</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cập nhật thông tin mới nhất về sản phẩm, khuyến mãi và sự kiện từ đại lý Geely Ninh Thuận
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white rounded-lg">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={`${item.title} - Tin tức Geely Ninh Thuận`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={item.date}>{new Date(item.date).toLocaleDateString('vi-VN')}</time>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <Button 
                  variant="outline"
                  className="w-full border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-full group/btn"
                  aria-label={`Đọc thêm bài viết: ${item.title}`}
                >
                  Đọc thêm
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/news')}
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full"
            aria-label="Xem tất cả tin tức Geely Ninh Thuận"
          >
            Xem tất cả tin tức
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
