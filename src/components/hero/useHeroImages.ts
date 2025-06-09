
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Car } from './types';
import { carModelsMapping } from './carModelsData';
import { usePriceData } from './usePriceData';

export const useHeroImages = (propsCars?: Car[]) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getCheapestVariantForModel, loading: priceLoading } = usePriceData();

  useEffect(() => {
    console.log('🚀 HERO IMAGES HOOK INITIALIZATION');
    console.log('Props cars received:', propsCars);
    
    if (propsCars && propsCars.length > 0) {
      console.log('✅ Using props cars from Index.tsx');
      setCars(propsCars);
      setIsLoading(false);
    } else if (!priceLoading) {
      console.log('🔍 No props cars, fetching from database...');
      fetchHeroImages();
    }
  }, [propsCars, priceLoading, getCheapestVariantForModel]);

  const fetchHeroImages = async () => {
    try {
      console.log('\n==== FETCHING HERO IMAGES FROM DATABASE ====');
      
      const { data: imagesData, error: imagesError } = await supabase
        .from('website_images')
        .select('*')
        .or('category.eq.hero-banner,category.like.hero-banner-%')
        .order('created_at', { ascending: false });

      console.log('📊 Images Query Result:', { error: imagesError, count: imagesData?.length });

      if (imagesError) {
        console.error('❌ Images database error:', imagesError);
        throw imagesError;
      }

      if (!imagesData || imagesData.length === 0) {
        console.log('⚠️ NO HERO IMAGES FOUND - Using defaults');
        createDefaultCars();
        return;
      }

      console.log('\n🔍 PROCESSING IMAGES FROM DATABASE:');
      
      const heroImages = imagesData.map((image: any, index: number) => {
        console.log(`\n--- IMAGE ${index + 1}: ${image.name} ---`);
        
        const searchTerms = [
          image.name?.toLowerCase() || '',
          image.description?.toLowerCase() || '',
          image.category?.toLowerCase() || '',
          image.file_name?.toLowerCase() || ''
        ].join(' ');
        
        console.log('🔍 Combined search terms:', searchTerms);
        
        let carModel = null;
        let carInfo = null;

        // Match car model from category or search terms
        if (image.category?.includes('monjaro')) {
          carModel = 'monjaro';
          carInfo = carModelsMapping.monjaro;
        } else if (image.category?.includes('coolray')) {
          carModel = 'coolray';
          carInfo = carModelsMapping.coolray;
        } else if (image.category?.includes('ex5')) {
          carModel = 'ex5';
          carInfo = carModelsMapping.ex5;
        } else if (searchTerms.includes('coolray') || searchTerms.includes('cool ray')) {
          carModel = 'coolray';
          carInfo = carModelsMapping.coolray;
        } else if (searchTerms.includes('monjaro')) {
          carModel = 'monjaro';
          carInfo = carModelsMapping.monjaro;
        } else if (searchTerms.includes('ex5') || searchTerms.includes('ex-5')) {
          carModel = 'ex5';
          carInfo = carModelsMapping.ex5;
        }

        // Get cheapest variant price for this car model
        const priceInfo = carInfo ? getCheapestVariantForModel(carInfo.name) : null;
        const isPriceAvailable = priceInfo?.price_available ?? false;
        
        let displayPrice = "Liên hệ để biết giá";
        if (priceInfo) {
          if (isPriceAvailable) {
            const finalPrice = priceInfo.base_price - (priceInfo.promotion || 0);
            displayPrice = `Từ ${(finalPrice / 1000000).toFixed(0)} triệu VNĐ`;
          } else {
            displayPrice = "Coming Soon";
          }
        }
        
        console.log('💰 Price info for', carInfo?.name, ':', {
          priceInfo,
          isPriceAvailable,
          displayPrice
        });
        
        return carInfo ? {
          name: carInfo.name,
          tagline: carInfo.tagline,
          description: carInfo.description,
          price: displayPrice,
          image: image.url,
          mobile_image: image.mobile_url,
          features: carInfo.features,
          priority: carInfo.priority || 999,
          price_available: isPriceAvailable
        } : {
          name: image.name,
          tagline: "Geely Ninh Thuận",
          description: image.description || `Khám phá ${image.name} - Xe hơi hiện đại với công nghệ tiên tiến`,
          price: displayPrice,
          image: image.url,
          mobile_image: image.mobile_url,
          features: ["Công nghệ hiện đại", "Thiết kế sang trọng", "An toàn cao cấp", "Tiết kiệm nhiên liệu"],
          priority: 999,
          price_available: false
        };
      });

      const sortedCars = heroImages.sort((a, b) => (a.priority || 999) - (b.priority || 999));
      console.log('\n🎯 FINAL RESULT:', sortedCars);
      setCars(sortedCars);

    } catch (error) {
      console.error('💥 CRITICAL ERROR in fetchHeroImages:', error);
      createDefaultCars();
    } finally {
      setIsLoading(false);
    }
  };

  const createDefaultCars = () => {
    console.log('🔄 Creating default cars');
    const defaultCars = Object.values(carModelsMapping).map(car => {
      const priceInfo = getCheapestVariantForModel(car.name);
      const isPriceAvailable = priceInfo?.price_available ?? false;
      
      let displayPrice = "Liên hệ để biết giá";
      if (priceInfo && isPriceAvailable) {
        const finalPrice = priceInfo.base_price - (priceInfo.promotion || 0);
        displayPrice = `Từ ${(finalPrice / 1000000).toFixed(0)} triệu VNĐ`;
      } else if (priceInfo && !isPriceAvailable) {
        displayPrice = "Coming Soon";
      }

      return {
        ...car,
        price: displayPrice,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
        price_available: isPriceAvailable
      };
    });
    setCars(defaultCars);
  };

  return { cars, isLoading };
};
