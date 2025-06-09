
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CarSpecification {
  icon: string;
  label: string;
  value: string;
}

export interface CarDetailedFeature {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CarCTASection {
  title: string;
  description: string;
  accent_color: string;
}

export interface CarDetailsData {
  id: string;
  car_model: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  gallery_images: string[];
  hero_image_url?: string;
  hero_mobile_image_url?: string;
  specifications_data: CarSpecification[];
  detailed_features_data: CarDetailedFeature[];
  cta_section: CarCTASection;
  priority?: number;
  is_active?: boolean;
}

// Helper functions for type-safe JSON parsing
const parseArrayOrDefault = <T>(data: any, defaultValue: T[]): T[] => {
  if (Array.isArray(data)) {
    return data as T[];
  }
  return defaultValue;
};

const parseObjectOrDefault = <T>(data: any, defaultValue: T): T => {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    return data as T;
  }
  return defaultValue;
};

export const useCarDetails = (carModel?: string) => {
  return useQuery({
    queryKey: ['car-details', carModel],
    queryFn: async () => {
      console.log('Fetching car details for:', carModel);
      
      let query = supabase
        .from('car_details')
        .select('*')
        .eq('is_active', true);

      if (carModel) {
        query = query.eq('car_model', carModel);
      }

      const { data, error } = await query.order('priority', { ascending: true });

      if (error) {
        console.error('Error fetching car details:', error);
        throw error;
      }

      console.log('Raw car details data:', data);

      if (!data || data.length === 0) {
        console.log('No car details found');
        return carModel ? null : [];
      }

      const processedData = data.map(item => {
        // Safely parse JSON fields with type checking
        const galleryImages = parseArrayOrDefault(item.gallery_images, []);
        const features = parseArrayOrDefault(item.features, []);
        const specificationsData = parseArrayOrDefault<CarSpecification>(item.specifications_data, []);
        const detailedFeaturesData = parseArrayOrDefault<CarDetailedFeature>(item.detailed_features_data, []);
        const ctaSection = parseObjectOrDefault<CarCTASection>(item.cta_section, {
          title: "Sẵn sàng trải nghiệm?",
          description: "Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt",
          accent_color: "blue-600"
        });

        return {
          id: item.id,
          car_model: item.car_model,
          name: item.name,
          tagline: item.tagline,
          description: item.description,
          features: features,
          gallery_images: galleryImages,
          hero_image_url: item.hero_image_url,
          hero_mobile_image_url: item.hero_mobile_image_url,
          specifications_data: specificationsData,
          detailed_features_data: detailedFeaturesData,
          cta_section: ctaSection,
          priority: item.priority,
          is_active: item.is_active,
        } as CarDetailsData;
      });

      console.log('Processed car details:', processedData);

      return carModel ? processedData[0] || null : processedData;
    },
    enabled: true,
  });
};

export const useAllCarDetails = () => {
  return useCarDetails();
};

export const useSingleCarDetails = (carModel: string) => {
  return useCarDetails(carModel);
};
