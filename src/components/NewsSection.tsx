
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
  content: string;
  image_url?: string;
  category: string;
  date: string;
  created_at: string;
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
      
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })
        .limit(3); // Chỉ lấy 3 tin mới nhất cho trang chủ

      if (error) {
        console.error('❌ Error fetching news:', error);
        return;
      }

      console.log('✅ News loaded from database:', data?.length || 0);
      setNews(data || []);
    } catch (error) {
      console.error('❌ Error in fetchNews:', error);
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

  const getNewsImage = (newsItem: NewsItem, index: number) => {
    // Ưu tiên sử dụng image_url từ tin tức
    if (newsItem.image_url) {
      return newsItem.image_url;
    }
    
    // Nếu không có, sử dụng từ gallery news images
    if (newsImages.length > 0) {
      return newsImages[index % newsImages.length];
    }
    
    // Fallback images cuối cùng
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

  // Không hiển thị section nếu không có tin tức
  if (news.length === 0) {
    return null;
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
                  src={getNewsImage(article, index)}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-white text-sm bg-black/50 rounded px-2 py-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(article.date)}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

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
