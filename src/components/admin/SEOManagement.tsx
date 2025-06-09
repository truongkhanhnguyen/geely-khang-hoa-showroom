
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Save, RefreshCw } from "lucide-react";
import BasicInformationSection from "./seo/BasicInformationSection";
import RobotsSection from "./seo/RobotsSection";
import OpenGraphSection from "./seo/OpenGraphSection";

interface SEOSettings {
  id?: string;
  site_title: string;
  site_description: string;
  site_keywords: string;
  site_author: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  og_site_name: string;
  og_locale: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  twitter_card: string;
  twitter_site: string;
  geo_region: string;
  geo_placename: string;
  geo_position: string;
  robots_index: boolean;
  robots_follow: boolean;
  robots_noarchive: boolean;
  robots_nosnippet: boolean;
  meta_viewport: string;
  meta_charset: string;
  hreflang_tags: any[];
  schema_type: string;
  schema_name: string;
  schema_description: string;
  schema_url: string;
  schema_logo: string;
  schema_address: any;
  schema_offers: any[];
  schema_services: any[];
  sitemap_priority: string;
  sitemap_changefreq: string;
  google_site_verification: string;
  bing_site_verification: string;
  yandex_verification: string;
  custom_meta_tags: any[];
}

const SEOManagement = () => {
  const { toast } = useToast();
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    site_title: "Geely Ninh Thuận - Coolray, Monjaro, EX5 | Đại lý chính hãng, lái thử miễn phí",
    site_description: "🚗 Showroom Geely Ninh Thuận chính hãng - Coolray từ 699tr, Monjaro từ 1.469tr, EX5 điện từ 769tr. ✅ Lái thử miễn phí ✅ Vay 80% ✅ Bảo hành chính hãng. Liên hệ ngay!",
    site_keywords: "Geely Ninh Thuận, Geely Nha Trang, xe Geely, Coolray, Monjaro, EX5, lái thử xe, đại lý Geely, xe hơi Ninh Thuận, ô tô điện, SUV 7 chỗ, vay mua xe",
    site_author: "Geely Ninh Thuận",
    canonical_url: "https://geelyninhthuan.vn/",
    og_title: "Geely Ninh Thuận - Coolray, Monjaro, EX5 | Đại lý chính hãng",
    og_description: "Showroom Geely Ninh Thuận chính hãng - Coolray từ 699tr, Monjaro từ 1.469tr, EX5 điện từ 769tr. Lái thử miễn phí, vay 80%, bảo hành chính hãng.",
    og_image: "/lovable-uploads/0e52bbc3-964b-4752-b195-4dcd50f21b5f.png",
    og_type: "website",
    og_site_name: "Geely Ninh Thuận",
    og_locale: "vi_VN",
    twitter_title: "Geely Ninh Thuận - Coolray, Monjaro, EX5 | Đại lý chính hãng",
    twitter_description: "Showroom Geely Ninh Thuận chính hãng - Coolray từ 699tr, Monjaro từ 1.469tr, EX5 điện từ 769tr. Lái thử miễn phí, vay 80%, bảo hành chính hãng.",
    twitter_image: "/lovable-uploads/0e52bbc3-964b-4752-b195-4dcd50f21b5f.png",
    twitter_card: "summary_large_image",
    twitter_site: "@geelyninhthuan",
    geo_region: "VN-34",
    geo_placename: "Ninh Thuận, Vietnam",
    geo_position: "11.564;108.991",
    robots_index: true,
    robots_follow: true,
    robots_noarchive: false,
    robots_nosnippet: false,
    meta_viewport: "width=device-width, initial-scale=1.0",
    meta_charset: "UTF-8",
    hreflang_tags: [],
    schema_type: "AutoDealer",
    schema_name: "Geely Ninh Thuận",
    schema_description: "Đại lý chính hãng Geely tại Ninh Thuận - chuyên bán xe Coolray, Monjaro, EX5",
    schema_url: "https://geelyninhthuan.vn/",
    schema_logo: "/lovable-uploads/0e52bbc3-964b-4752-b195-4dcd50f21b5f.png",
    schema_address: {
      "@type": "PostalAddress",
      "streetAddress": "Ninh Thuận",
      "addressLocality": "Phan Rang-Tháp Chàm",
      "addressRegion": "Ninh Thuận",
      "addressCountry": "VN"
    },
    schema_offers: [],
    schema_services: [],
    sitemap_priority: "1.0",
    sitemap_changefreq: "weekly",
    google_site_verification: "",
    bing_site_verification: "",
    yandex_verification: "",
    custom_meta_tags: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSEOSettings();
  }, []);

  const loadSEOSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_seo_settings')
        .select('*')
        .maybeSingle();

      if (error) {
        return;
      }

      if (data) {
        setSeoSettings({
          ...data,
          hreflang_tags: Array.isArray(data.hreflang_tags) ? data.hreflang_tags : [],
          schema_address: typeof data.schema_address === 'object' && data.schema_address !== null ? data.schema_address : {},
          schema_offers: Array.isArray(data.schema_offers) ? data.schema_offers : [],
          schema_services: Array.isArray(data.schema_services) ? data.schema_services : [],
          custom_meta_tags: Array.isArray(data.custom_meta_tags) ? data.custom_meta_tags : []
        });
      }
    } catch (error) {
      // Handle error silently
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SEOSettings, value: any) => {
    setSeoSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('website_seo_settings')
        .upsert(seoSettings);

      if (error) {
        throw error;
      }
      
      toast({
        title: "Thành công",
        description: "Cài đặt SEO đã được lưu thành công.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu cài đặt SEO",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    loadSEOSettings();
    toast({
      title: "Đã khôi phục",
      description: "Đã khôi phục về cài đặt đã lưu",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
        <span>Đang tải cài đặt SEO...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header với nút lưu */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Quản Lý SEO & Meta Tags</h2>
          <p className="text-gray-600">Tối ưu hóa SEO cho website của bạn</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Khôi phục
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>

      {/* Sections */}
      <BasicInformationSection 
        seoSettings={seoSettings} 
        handleInputChange={handleInputChange} 
      />
      
      <RobotsSection 
        seoSettings={seoSettings} 
        handleInputChange={handleInputChange} 
      />
      
      <OpenGraphSection 
        seoSettings={seoSettings} 
        handleInputChange={handleInputChange} 
      />

      {/* Save Actions */}
      <div className="flex justify-end space-x-2 sticky bottom-4 bg-white p-4 border rounded-lg shadow-lg">
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Khôi phục
        </Button>
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </div>
    </div>
  );
};

export default SEOManagement;
