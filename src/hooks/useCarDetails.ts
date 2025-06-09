
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CarSpecification {
  icon: string;
  label: string;
  value: string;
}

interface CarDetailedFeature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface CarCTASection {
  title: string;
  description: string;
  accent_color: string;
}

interface CarDetails {
  id: string;
  car_model: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  specifications: any;
  detailed_features: any[];
  gallery_images: string[];
  specifications_data: CarSpecification[];
  detailed_features_data: CarDetailedFeature[];
  cta_section: CarCTASection;
  hero_image_url: string | null;
  hero_mobile_image_url: string | null;
  priority: number;
  is_active: boolean;
}

export const useCarDetails = (carModel: string) => {
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        console.log('Fetching car details for model:', carModel);
        
        const { data, error } = await supabase
          .from('car_details')
          .select('*')
          .eq('car_model', carModel)
          .eq('is_active', true)
          .maybeSingle();

        if (error) {
          console.error('Error fetching car details:', error);
          setError(error.message);
          return;
        }

        if (!data) {
          console.log('No car details found for model:', carModel);
          setCarDetails(null);
          return;
        }

        // Transform and ensure data structure
        const transformedData: CarDetails = {
          id: data.id,
          car_model: data.car_model,
          name: data.name,
          tagline: data.tagline,
          description: data.description,
          features: data.features || [],
          specifications: data.specifications || {},
          detailed_features: data.detailed_features || [],
          gallery_images: data.gallery_images || [],
          specifications_data: data.specifications_data || [],
          detailed_features_data: data.detailed_features_data || [],
          cta_section: data.cta_section || {
            title: "Sẵn sàng trải nghiệm?",
            description: "Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt",
            accent_color: "blue-600"
          },
          hero_image_url: data.hero_image_url,
          hero_mobile_image_url: data.hero_mobile_image_url,
          priority: data.priority || 1,
          is_active: data.is_active ?? true
        };

        console.log('Car details loaded:', transformedData);
        setCarDetails(transformedData);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Không thể tải thông tin xe');
      } finally {
        setIsLoading(false);
      }
    };

    if (carModel) {
      fetchCarDetails();
    }
  }, [carModel]);

  return { carDetails, isLoading, error };
};
