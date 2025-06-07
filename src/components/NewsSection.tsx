
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image_url?: string;
  author?: string;
  published_at: string;
  read_time?: number;
}

const NewsSection = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsImages, setNewsImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
    fetchNewsImages();
  }, []);

  const fetchNews = async () => {
    try {
      console.log('📰 Fetching news from database...');
      
      // Static news for now, but prepared for database integration
      const staticNews: NewsItem[] = [
        {
          id: '1',
          title: 'Geely Coolray - Chiếc SUV đô thị được yêu thích nhất 2024',
          excerpt: 'Với thiết kế trẻ trung, công nghệ hiện đại và mức giá hợp lý, Geely Coolray đã trở thành lựa chọn hàng đầu của giới trẻ Việt Nam.',
          author: 'Geely Ninh Thuận',
          published_at: '2024-12-01',
          read_time: 5
        },
        {
          id: '2',
          title: 'Trải nghiệm công nghệ thông minh trên Geely Monjaro',
          excerpt: 'Hệ thống GKUI 4.0 với màn hình cảm ứng 12.3 inch mang đến trải nghiệm kết nối và giải trí tuyệt vời cho gia đình hiện đại.',
          author: 'Geely Ninh Thuận', 
          published_at: '2024-11-28',
          read_time: 7
        },
        {
          id: '3',
          title: 'Geely EX5 - Bước tiến mới của ngành ô tô điện tại Việt Nam',
          excerpt: 'Với công nghệ pin tiên tiến và khả năng di chuyển lên đến 400km, EX5 đánh dấu sự chuyển mình mạnh mẽ của Geely trong lĩnh vực xe điện.',
          author: 'Geely Ninh Thuận',
          published_at: '2024-11-25', 
          read_time: 6
        }
      ];

      setNews(staticNews);
      console.log('✅ News loaded:', staticNews.length);
    } catch (error) {
      console.error('❌ Error fetching news:', error);
    }
  };

  const fetchNewsImages = async () => {
    try {
      console.log('🖼️ Fetching news images...');
      
      const { data, error } = await supabase
        .from('website_images')
        .select('*')
        .eq('category', 'news')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching news images:', error);
      } else if (data && data.length > 0) {
        const imageUrls = data.map(img => img.url);
        setNewsImages(imageUrls);
        console.log('✅ News images loaded:', imageUrls.length);
      } else {
        console.log('⚠️ No news images found in database');
      }
    } catch (error) {
      console.error('💥 Error in fetchNewsImages:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getNewsImage = (index: number) => {
    if (newsImages.length > 0) {
      return newsImages[index % newsImages.length];
    }
    
    // Fallback images
    const fallbackImages = [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop"
    ];
    
    return fallbackImages[index % fallbackImages.length];
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-500">Đang tải tin tức...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Tin tức <span className="text-blue-600 font-medium">mới nhất</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về sản phẩm và công nghệ Geely
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getNewsImage(index)}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-white text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(article.published_at)}
                    {article.read_time && (
                      <>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        {article.read_time} phút đọc
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {article.author && (
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4 mr-2" />
                    {article.author}
                  </div>
                )}

                <Button 
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => navigate('/news')}
                >
                  Đọc tiếp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3"
            onClick={() => navigate('/news')}
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
