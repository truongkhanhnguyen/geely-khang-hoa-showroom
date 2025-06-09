
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SEOData {
  site_title: string;
  site_description: string;
  site_keywords: string;
  site_author: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  geo_region: string;
  geo_placename: string;
  geo_position: string;
  structured_data: any;
}

const SEOManagement = () => {
  const { toast } = useToast();
  const [seoData, setSeoData] = useState<SEOData>({
    site_title: "Geely Ninh Thuận - Coolray, Monjaro, EX5 | Đại lý chính hãng, lái thử miễn phí",
    site_description: "🚗 Showroom Geely Ninh Thuận chính hãng - Coolray từ 699tr, Monjaro từ 1.469tr, EX5 điện từ 769tr. ✅ Lái thử miễn phí ✅ Vay 80% ✅ Bảo hành chính hãng. Liên hệ ngay!",
    site_keywords: "Geely Ninh Thuận, Geely Nha Trang, xe Geely, Coolray, Monjaro, EX5, lái thử xe, đại lý Geely, xe hơi Ninh Thuận, ô tô điện, SUV 7 chỗ, vay mua xe",
    site_author: "Geely Ninh Thuận",
    canonical_url: "https://geelyninhthuan.vn/",
    og_title: "Geely Ninh Thuận - Coolray, Monjaro, EX5 | Đại lý chính hãng",
    og_description: "Showroom Geely Ninh Thuận chính hãng - Coolray từ 699tr, Monjaro từ 1.469tr, EX5 điện từ 769tr. Lái thử miễn phí, vay 80%, bảo hành chính hãng.",
    og_image: "/lovable-uploads/0e52bbc3-964b-4752-b195-4dcd50f21b5f.png",
    twitter_title: "Geely Ninh Thuận - Coolray, Monjaro, EX5 | Đại lý chính hãng",
    twitter_description: "Showroom Geely Ninh Thuận chính hãng - Coolray từ 699tr, Monjaro từ 1.469tr, EX5 điện từ 769tr. Lái thử miễn phí, vay 80%, bảo hành chính hãng.",
    twitter_image: "/lovable-uploads/0e52bbc3-964b-4752-b195-4dcd50f21b5f.png",
    geo_region: "VN-34",
    geo_placename: "Ninh Thuận, Vietnam",
    geo_position: "11.564;108.991",
    structured_data: {
      "@context": "https://schema.org",
      "@type": "AutoDealer",
      "name": "Geely Ninh Thuận",
      "alternateName": "Showroom Geely Ninh Thuận",
      "description": "Đại lý chính hãng Geely tại Ninh Thuận - chuyên bán xe Coolray, Monjaro, EX5",
      "url": "https://geelyninhthuan.vn/",
      "logo": "/lovable-uploads/0e52bbc3-964b-4752-b195-4dcd50f21b5f.png"
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SEOData, value: string) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStructuredDataChange = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      setSeoData(prev => ({
        ...prev,
        structured_data: parsed
      }));
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  const generateMetaHTML = () => {
    return `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>${seoData.site_title}</title>
    <meta name="title" content="${seoData.site_title}" />
    <meta name="description" content="${seoData.site_description}" />
    <meta name="keywords" content="${seoData.site_keywords}" />
    <meta name="author" content="${seoData.site_author}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${seoData.canonical_url}" />

    <!-- Favicon -->
    <link rel="icon" href="/lovable-uploads/0e52bbc3-964b-4752-b195-4dcd50f21b5f.png" type="image/png">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${seoData.canonical_url}" />
    <meta property="og:title" content="${seoData.og_title}" />
    <meta property="og:description" content="${seoData.og_description}" />
    <meta property="og:image" content="${seoData.og_image}" />
    <meta property="og:site_name" content="Geely Ninh Thuận" />
    <meta property="og:locale" content="vi_VN" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${seoData.canonical_url}" />
    <meta property="twitter:title" content="${seoData.twitter_title}" />
    <meta property="twitter:description" content="${seoData.twitter_description}" />
    <meta property="twitter:image" content="${seoData.twitter_image}" />

    <!-- Geo Tags -->
    <meta name="geo.region" content="${seoData.geo_region}" />
    <meta name="geo.placename" content="${seoData.geo_placename}" />
    <meta name="geo.position" content="${seoData.geo_position}" />
    <meta name="ICBM" content="${seoData.geo_position.replace(';', ', ')}" />

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(seoData.structured_data, null, 2)}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Generate the complete HTML
      const htmlContent = generateMetaHTML();
      
      // Copy to clipboard for manual update
      await navigator.clipboard.writeText(htmlContent);
      
      toast({
        title: "Thành công",
        description: "HTML đã được sao chép vào clipboard. Vui lòng cập nhật file index.html thủ công.",
      });
    } catch (error) {
      console.error("Error saving SEO data:", error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu dữ liệu SEO",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản Lý SEO & Meta Tags</CardTitle>
          <CardDescription>
            Tùy chỉnh các thông tin SEO và meta tags cho website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site_title">Tiêu đề trang</Label>
              <Input
                id="site_title"
                value={seoData.site_title}
                onChange={(e) => handleInputChange("site_title", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="canonical_url">URL chính thức</Label>
              <Input
                id="canonical_url"
                value={seoData.canonical_url}
                onChange={(e) => handleInputChange("canonical_url", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_description">Mô tả trang</Label>
            <Textarea
              id="site_description"
              value={seoData.site_description}
              onChange={(e) => handleInputChange("site_description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_keywords">Từ khóa (phân cách bằng dấu phẩy)</Label>
            <Textarea
              id="site_keywords"
              value={seoData.site_keywords}
              onChange={(e) => handleInputChange("site_keywords", e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site_author">Tác giả</Label>
              <Input
                id="site_author"
                value={seoData.site_author}
                onChange={(e) => handleInputChange("site_author", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="geo_position">Vị trí địa lý (lat;lng)</Label>
              <Input
                id="geo_position"
                value={seoData.geo_position}
                onChange={(e) => handleInputChange("geo_position", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Graph (Facebook)</CardTitle>
          <CardDescription>
            Tùy chỉnh hiển thị khi chia sẻ trên Facebook
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="og_title">Tiêu đề OG</Label>
            <Input
              id="og_title"
              value={seoData.og_title}
              onChange={(e) => handleInputChange("og_title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="og_description">Mô tả OG</Label>
            <Textarea
              id="og_description"
              value={seoData.og_description}
              onChange={(e) => handleInputChange("og_description", e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="og_image">URL hình ảnh OG</Label>
            <Input
              id="og_image"
              value={seoData.og_image}
              onChange={(e) => handleInputChange("og_image", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Twitter Cards</CardTitle>
          <CardDescription>
            Tùy chỉnh hiển thị khi chia sẻ trên Twitter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="twitter_title">Tiêu đề Twitter</Label>
            <Input
              id="twitter_title"
              value={seoData.twitter_title}
              onChange={(e) => handleInputChange("twitter_title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter_description">Mô tả Twitter</Label>
            <Textarea
              id="twitter_description"
              value={seoData.twitter_description}
              onChange={(e) => handleInputChange("twitter_description", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Structured Data (JSON-LD)</CardTitle>
          <CardDescription>
            Tùy chỉnh dữ liệu có cấu trúc cho Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="structured_data">JSON-LD</Label>
            <Textarea
              id="structured_data"
              value={JSON.stringify(seoData.structured_data, null, 2)}
              onChange={(e) => handleStructuredDataChange(e.target.value)}
              rows={15}
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Đang lưu..." : "Sao chép HTML"}
        </Button>
      </div>
    </div>
  );
};

export default SEOManagement;
