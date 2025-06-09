
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface PriceData {
  car_model: string;
  base_price: number;
  promotion: number;
  price_available: boolean;
  variant: string;
}

export const usePriceData = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPriceData();
  }, []);

  const fetchPriceData = async () => {
    try {
      console.log('🔍 Fetching price data from database...');
      
      const { data: pricesData, error: pricesError } = await supabase
        .from('car_prices')
        .select('car_model, base_price, promotion, price_available, variant')
        .order('car_model')
        .order('base_price'); // Order by price to get cheapest first

      if (pricesError) {
        console.error('❌ Prices database error:', pricesError);
        throw pricesError;
      }

      console.log('📊 Raw prices data:', pricesData);
      setPriceData(pricesData || []);
      
    } catch (error) {
      console.error('💥 Error fetching price data:', error);
      setPriceData([]);
    } finally {
      setLoading(false);
    }
  };

  // Get cheapest available variant for each car model
  const getCheapestVariantForModel = (carModel: string) => {
    console.log('🔍 Looking for cheapest variant for:', carModel);
    console.log('📋 Available price data:', priceData);
    
    const modelPrices = priceData.filter(price => {
      const matches = price.car_model === carModel;
      console.log(`🔍 Checking: ${price.car_model} === ${carModel} = ${matches}`);
      return matches;
    });
    
    console.log('🎯 Found model prices for', carModel, ':', modelPrices);
    
    if (modelPrices.length === 0) {
      console.log('❌ No prices found for', carModel);
      return null;
    }
    
    // Sort by price (cheapest first) and find the first available one
    const sortedPrices = modelPrices.sort((a, b) => 
      (a.base_price - a.promotion) - (b.base_price - b.promotion)
    );
    
    // First try to find an available price
    const availablePrice = sortedPrices.find(price => price.price_available);
    
    // If no available price, return the cheapest one (but mark as unavailable)
    const result = availablePrice || sortedPrices[0];
    
    console.log('💰 Final price result for', carModel, ':', result);
    
    return result;
  };

  return {
    priceData,
    loading,
    getCheapestVariantForModel
  };
};
