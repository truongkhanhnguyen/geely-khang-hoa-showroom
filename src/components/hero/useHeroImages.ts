
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Car } from './types';
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
      
      // First get car details for content
      const { data: carDetailsData, error: carDetailsError } = await supabase
        .from('car_details')
        .select('*')
        .eq('is_active', true)
        .order('priority');

      // Always get images from website_images for consistency
      const { data: imagesData, error: imagesError } = await supabase
        .from('website_images')
        .select('*')
        .or('category.eq.hero-banner,category.like.hero-banner-%')
        .order('created_at', { ascending: false });

      if (carDetailsError) {
        console.error('❌ Car details database error:', carDetailsError);
        throw carDetailsError;
      }

      if (imagesError) {
        console.error('❌ Images database error:', imagesError);
        throw imagesError;
      }

      if (carDetailsData && carDetailsData.length > 0) {
        console.log('✅ Found car details in database:', carDetailsData.length);
        console.log('📊 Found website images:', imagesData?.length || 0);
        
        // Combine car details with matching images from website_images
        const carsWithImages = carDetailsData.map((carDetail: any) => {
          // Find matching image from website_images
          let matchingImage = null;
          if (imagesData && imagesData.length > 0) {
            const searchTerms = carDetail.name.toLowerCase();
            matchingImage = imagesData.find((image: any) => {
              const imageSearchTerms = [
                image.name?.toLowerCase() || '',
                image.description?.toLowerCase() || '',
                image.category?.toLowerCase() || '',
                image.file_name?.toLowerCase() || ''
              ].join(' ');
              
              // Check for car model name in image data
              if (searchTerms.includes('coolray') && imageSearchTerms.includes('coolray')) return true;
              if (searchTerms.includes('monjaro') && imageSearchTerms.includes('monjaro')) return true;
              if (searchTerms.includes('ex5') && imageSearchTerms.includes('ex5')) return true;
              
              return false;
            });
          }

          // Get cheapest variant price for this car model
          const priceInfo = getCheapestVariantForModel(carDetail.name);
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
          
          console.log('💰 Price info for', carDetail.name, ':', {
            priceInfo,
            isPriceAvailable,
            displayPrice
          });

          console.log('🖼️ Image matching for', carDetail.name, ':', {
            found: !!matchingImage,
            imageUrl: matchingImage?.url,
            mobileUrl: matchingImage?.mobile_url
          });
          
          return {
            name: carDetail.name,
            tagline: carDetail.tagline,
            description: carDetail.description,
            price: displayPrice,
            image: matchingImage?.url || "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
            mobile_image: matchingImage?.mobile_url,
            features: carDetail.features || [],
            priority: carDetail.priority || 999,
            price_available: isPriceAvailable
          };
        });

        console.log('\n🎯 FINAL RESULT FROM CAR DETAILS + WEBSITE IMAGES:', carsWithImages);
        setCars(carsWithImages);
        setIsLoading(false);
        return;
      }

      // Fallback to website_images only if no car_details found
      console.log('⚠️ No car details found, falling back to website_images only...');
      
      if (!imagesData || imagesData.length === 0) {
        console.log('⚠️ NO HERO IMAGES FOUND - Using defaults');
        createDefaultCars();
        return;
      }

      // Process website_images as fallback
      const heroImages = imagesData.map((image: any) => {
        const searchTerms = [
          image.name?.toLowerCase() || '',
          image.description?.toLowerCase() || '',
          image.category?.toLowerCase() || '',
          image.file_name?.toLowerCase() || ''
        ].join(' ');
        
        let carName = "Geely Vehicle";
        let carTagline = "Premium Quality";
        let carDescription = "Xe hơi hiện đại với công nghệ tiên tiến";
        let carFeatures = ["Công nghệ hiện đại", "Thiết kế sang trọng", "An toàn cao cấp", "Tiết kiệm nhiên liệu"];
        
        if (searchTerms.includes('coolray')) {
          carName = "Geely Coolray";
          carTagline = "Urban. Dynamic. Smart.";
          carDescription = "SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.";
          carFeatures = ["Động cơ 1.5L Turbo", "Hệ thống GKUI 19", "6 túi khí an toàn", "Phanh ABS + EBD"];
        } else if (searchTerms.includes('monjaro')) {
          carName = "Geely Monjaro";
          carTagline = "Premium. Powerful. Refined.";
          carDescription = "SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.";
          carFeatures = ["Động cơ 2.0L Turbo", "Hệ thống giải trí 12.3''", "Cruise Control thích ứng", "Cửa sổ trời toàn cảnh"];
        } else if (searchTerms.includes('ex5')) {
          carName = "Geely EX5";
          carTagline = "Electric. Efficient. Future.";
          carDescription = "SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.";
          carFeatures = ["100% động cơ điện", "Phạm vi 400km", "Sạc nhanh 30 phút", "Hệ thống tự lái L2"];
        }

        const priceInfo = getCheapestVariantForModel(carName);
        const isPriceAvailable = priceInfo?.price_available ?? false;
        
        let displayPrice = "Liên hệ để biết giá";
        if (priceInfo && isPriceAvailable) {
          const finalPrice = priceInfo.base_price - (priceInfo.promotion || 0);
          displayPrice = `Từ ${(finalPrice / 1000000).toFixed(0)} triệu VNĐ`;
        } else if (priceInfo && !isPriceAvailable) {
          displayPrice = "Coming Soon";
        }
        
        return {
          name: carName,
          tagline: carTagline,
          description: carDescription,
          price: displayPrice,
          image: image.url,
          mobile_image: image.mobile_url,
          features: carFeatures,
          priority: 999,
          price_available: isPriceAvailable
        };
      });

      console.log('\n🎯 FINAL RESULT FROM WEBSITE IMAGES:', heroImages);
      setCars(heroImages);

    } catch (error) {
      console.error('💥 CRITICAL ERROR in fetchHeroImages:', error);
      createDefaultCars();
    } finally {
      setIsLoading(false);
    }
  };

  const createDefaultCars = () => {
    console.log('🔄 Creating default cars');
    const defaultCarsData = [
      {
        name: "Geely Coolray",
        tagline: "Urban. Dynamic. Smart.",
        description: "SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.",
        features: ["Động cơ 1.5L Turbo", "Hệ thống GKUI 19", "6 túi khí an toàn", "Phanh ABS + EBD"],
        priority: 1
      },
      {
        name: "Geely Monjaro",
        tagline: "Premium. Powerful. Refined.",
        description: "SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.",
        features: ["Động cơ 2.0L Turbo", "Hệ thống giải trí 12.3''", "Cruise Control thích ứng", "Cửa sổ trời toàn cảnh"],
        priority: 2
      },
      {
        name: "Geely EX5",
        tagline: "Electric. Efficient. Future.",
        description: "SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.",
        features: ["100% động cơ điện", "Phạm vi 400km", "Sạc nhanh 30 phút", "Hệ thống tự lái L2"],
        priority: 3
      }
    ];

    const defaultCars = defaultCarsData.map(car => {
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
