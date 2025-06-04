
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, ArrowRight, Eye, MessageCircle, Share2, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import FloatingButtons from "@/components/FloatingButtons";
import ContactFooter from "@/components/ContactFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const NewsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const categories = ["Tất cả", "Công nghệ", "Khuyến mãi", "An toàn", "Sự kiện", "Tin tức"];

  const newsItems = [
    {
      id: 1,
      title: "Geely ra mắt công nghệ pin mới cho xe điện thế hệ tiếp theo",
      excerpt: "Công nghệ pin lithium-iron-phosphate (LFP) thế hệ mới của Geely hứa hẹn tăng phạm vi hoạt động lên 600km với thời gian sạc nhanh chóng chỉ 15 phút...",
      content: "Chi tiết đầy đủ về công nghệ pin mới...",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=400&fit=crop",
      date: "2024-12-15",
      category: "Công nghệ",
      author: "Geely Ninh Thuận",
      views: 1250,
      featured: true
    },
    {
      id: 2, 
      title: "Chương trình ưu đãi đặc biệt chào mừng năm mới 2025",
      excerpt: "Nhân dịp chào đón năm mới 2025, Geely Ninh Thuận triển khai chương trình ưu đãi hấp dẫn với mức giảm giá lên đến 70 triệu đồng...",
      content: "Nội dung chi tiết về chương trình khuyến mãi...",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=400&fit=crop",
      date: "2024-12-10",
      category: "Khuyến mãi",
      author: "Geely Ninh Thuận",
      views: 980,
      featured: true
    },
    {
      id: 3,
      title: "Geely Coolray đạt chứng nhận an toàn 5 sao từ ASEAN NCAP",
      excerpt: "Trong thử nghiệm mới nhất, Geely Coolray tiếp tục khẳng định vị thế dẫn đầu về an toàn với chứng nhận 5 sao từ tổ chức đánh giá uy tín...",
      content: "Thông tin chi tiết về chứng nhận an toàn...",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop", 
      date: "2024-12-05",
      category: "An toàn",
      author: "Geely Ninh Thuận",
      views: 750,
      featured: false
    },
    {
      id: 4,
      title: "Khai trương showroom Geely Ninh Thuận với không gian hiện đại",
      excerpt: "Showroom Geely Ninh Thuận chính thức khai trương với thiết kế hiện đại, không gian trưng bày rộng rãi và đội ngũ tư vấn chuyên nghiệp...",
      content: "Thông tin về showroom mới...",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=400&fit=crop",
      date: "2024-11-28",
      category: "Sự kiện",
      author: "Geely Ninh Thuận",
      views: 1100,
      featured: false
    },
    {
      id: 5,
      title: "Geely EX5 - Xu hướng xe điện dẫn đầu thị trường Việt Nam",
      excerpt: "Với công nghệ tiên tiến và thiết kế thời trang, Geely EX5 đang tạo nên làn sóng mới trong phân khúc xe điện tại Việt Nam...",
      content: "Phân tích về xu hướng xe điện...",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=400&fit=crop",
      date: "2024-11-20",
      category: "Tin tức",
      author: "Geely Ninh Thuận",
      views: 890,
      featured: false
    },
    {
      id: 6,
      title: "Lễ bàn giao 100 xe Geely cho khách hàng Ninh Thuận",
      excerpt: "Trong tháng 11, Geely Ninh Thuận đã vinh dự bàn giao 100 chiếc xe cho khách hàng địa phương, đánh dấu cột mốc quan trọng...",
      content: "Thông tin về lễ bàn giao xe...",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
      date: "2024-11-15",
      category: "Sự kiện",
      author: "Geely Ninh Thuận",
      views: 650,
      featured: false
    }
  ];

  const filteredNews = selectedCategory === "Tất cả" 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

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
                <span className="text-xl font-semibold text-gray-900">Tin tức</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
              Tin tức <span className="text-blue-600 font-medium">Geely</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Cập nhật những thông tin mới nhất về sản phẩm, công nghệ và hoạt động 
              của Geely tại Ninh Thuận
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Danh mục:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      {selectedCategory === "Tất cả" && featuredNews.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Tin nổi bật</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <Card key={item.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Nổi bật
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(item.date).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {item.views}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Bởi {item.author}</span>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full group/btn"
                      >
                        Đọc thêm
                        <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {selectedCategory === "Tất cả" ? "Tin tức khác" : `Tin tức ${selectedCategory}`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(item.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {item.views}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Bởi {item.author}</span>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-full group/btn"
                    >
                      Đọc thêm
                      <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-white mb-8">
            Đăng ký nhận tin tức
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Nhận thông tin mới nhất về sản phẩm và khuyến mãi từ Geely Ninh Thuận
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white"
            />
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full"
            >
              Đăng ký
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

export default NewsPage;
