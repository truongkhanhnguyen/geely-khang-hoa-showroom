
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tag, Calendar, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  valid_until?: string;
  discount_amount?: number;
  created_at: string;
}

const PromotionsSection = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [promotionImages, setPromotionImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
    fetchPromotionImages();
  }, []);

  const fetchPromotions = async () => {
    try {
      console.log('🎁 Fetching promotions from database...');
      
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // Chỉ lấy 3 khuyến mãi mới nhất cho trang chủ

      if (error) {
        console.error('❌ Error fetching promotions:', error);
        return;
      }

      console.log('✅ Promotions loaded from database:', data?.length || 0);
      setPromotions(data || []);
    } catch (error) {
      console.error('❌ Error in fetchPromotions:', error);
    }
  };

  const fetchPromotionImages = async () => {
    try {
      console.log('🖼️ Fetching promotion images...');
      
      const { data, error } = await supabase
        .from('website_images')
        .select('*')
        .eq('category', 'promotions')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching promotion images:', error);
      } else if (data && data.length > 0) {
        const imageUrls = data.map(img => img.url);
        setPromotionImages(imageUrls);
        console.log('✅ Promotion images loaded:', imageUrls.length);
      } else {
        console.log('⚠️ No promotion images found in database');
      }
    } catch (error) {
      console.error('💥 Error in fetchPromotionImages:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const getPromotionImage = (promotion: Promotion, index: number) => {
    // Ưu tiên sử dụng image_url từ khuyến mãi
    if (promotion.image_url) {
      return promotion.image_url;
    }
    
    // Nếu không có, sử dụng từ gallery promotion images
    if (promotionImages.length > 0) {
      return promotionImages[index % promotionImages.length];
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-500">Đang tải khuyến mãi...</div>
          </div>
        </div>
      </section>
    );
  }

  // Không hiển thị section nếu không có khuyến mãi
  if (promotions.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Khuyến mãi <span className="text-red-600 font-medium">đặc biệt</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những ưu đãi hấp dẫn nhất cho các dòng xe Geely tại Ninh Thuận
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promotion, index) => (
            <Card key={promotion.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getPromotionImage(promotion, index)}
                  alt={promotion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Gift className="w-4 h-4 mr-1" />
                    Khuyến mãi
                  </div>
                </div>
                {promotion.discount_amount && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{formatCurrency(promotion.discount_amount)}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {promotion.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {promotion.description}
                </p>

                {promotion.valid_until && (
                  <div className="flex items-center text-sm text-red-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    Có hiệu lực đến: {formatDate(promotion.valid_until)}
                  </div>
                )}

                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                  onClick={() => navigate('/promotions')}
                >
                  Xem chi tiết
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
            onClick={() => navigate('/promotions')}
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
