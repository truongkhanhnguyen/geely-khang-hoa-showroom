import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Save, RefreshCw, Globe, Search, Share2, MapPin, Code, FileText } from "lucide-react";

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

  // Load SEO settings from database
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
        console.error('Error loading SEO settings:', error);
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
      console.error('Error loading SEO settings:', error);
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

  const generateRobotsContent = () => {
    let robots = [];
    if (seoSettings.robots_index) robots.push('index');
    else robots.push('noindex');
    
    if (seoSettings.robots_follow) robots.push('follow');
    else robots.push('nofollow');
    
    if (seoSettings.robots_noarchive) robots.push('noarchive');
    if (seoSettings.robots_nosnippet) robots.push('nosnippet');
    
    return robots.join(', ');
  };

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": seoSettings.schema_type,
      "name": seoSettings.schema_name,
      "description": seoSettings.schema_description,
      "url": seoSettings.schema_url,
      "logo": seoSettings.schema_logo,
      "address": seoSettings.schema_address,
      "offers": seoSettings.schema_offers,
      "makesOffer": seoSettings.schema_services
    };
  };

  const generateMetaHTML = () => {
    const structuredData = generateStructuredData();
    
    return `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="${seoSettings.meta_charset}" />
    <meta name="viewport" content="${seoSettings.meta_viewport}" />
    
    <!-- Primary Meta Tags -->
    <title>${seoSettings.site_title}</title>
    <meta name="title" content="${seoSettings.site_title}" />
    <meta name="description" content="${seoSettings.site_description}" />
    <meta name="keywords" content="${seoSettings.site_keywords}" />
    <meta name="author" content="${seoSettings.site_author}" />
    <meta name="robots" content="${generateRobotsContent()}" />
    <link rel="canonical" href="${seoSettings.canonical_url}" />

    <!-- Site Verification -->
    ${seoSettings.google_site_verification ? `<meta name="google-site-verification" content="${seoSettings.google_site_verification}" />` : ''}
    ${seoSettings.bing_site_verification ? `<meta name="msvalidate.01" content="${seoSettings.bing_site_verification}" />` : ''}
    ${seoSettings.yandex_verification ? `<meta name="yandex-verification" content="${seoSettings.yandex_verification}" />` : ''}

    <!-- Favicon -->
    <link rel="icon" href="${seoSettings.schema_logo}" type="image/png">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${seoSettings.og_type}" />
    <meta property="og:url" content="${seoSettings.canonical_url}" />
    <meta property="og:title" content="${seoSettings.og_title}" />
    <meta property="og:description" content="${seoSettings.og_description}" />
    <meta property="og:image" content="${seoSettings.og_image}" />
    <meta property="og:site_name" content="${seoSettings.og_site_name}" />
    <meta property="og:locale" content="${seoSettings.og_locale}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="${seoSettings.twitter_card}" />
    <meta property="twitter:url" content="${seoSettings.canonical_url}" />
    <meta property="twitter:title" content="${seoSettings.twitter_title}" />
    <meta property="twitter:description" content="${seoSettings.twitter_description}" />
    <meta property="twitter:image" content="${seoSettings.twitter_image}" />
    ${seoSettings.twitter_site ? `<meta property="twitter:site" content="${seoSettings.twitter_site}" />` : ''}

    <!-- Geo Tags -->
    <meta name="geo.region" content="${seoSettings.geo_region}" />
    <meta name="geo.placename" content="${seoSettings.geo_placename}" />
    <meta name="geo.position" content="${seoSettings.geo_position}" />
    <meta name="ICBM" content="${seoSettings.geo_position.replace(';', ', ')}" />

    <!-- Custom Meta Tags -->
    ${seoSettings.custom_meta_tags.map((tag: any) => `<meta name="${tag.name}" content="${tag.content}" />`).join('\n    ')}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(structuredData, null, 2)}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('website_seo_settings')
        .upsert(seoSettings)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Generate and copy HTML to clipboard
      const htmlContent = generateMetaHTML();
      await navigator.clipboard.writeText(htmlContent);
      
      toast({
        title: "Thành công",
        description: "Cài đặt SEO đã được lưu và HTML đã được sao chép vào clipboard.",
      });
    } catch (error) {
      console.error("Error saving SEO settings:", error);
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

      {/* Thông tin cơ bản */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Thông Tin Cơ Bản
          </CardTitle>
          <CardDescription>
            Các thông tin meta cơ bản của website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site_title">Tiêu đề trang</Label>
              <Input
                id="site_title"
                value={seoSettings.site_title}
                onChange={(e) => handleInputChange("site_title", e.target.value)}
                placeholder="Tiêu đề hiển thị trên tab trình duyệt"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="canonical_url">URL chính thức</Label>
              <Input
                id="canonical_url"
                value={seoSettings.canonical_url}
                onChange={(e) => handleInputChange("canonical_url", e.target.value)}
                placeholder="https://geelyninhthuan.vn/"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_description">Mô tả trang (160 ký tự)</Label>
            <Textarea
              id="site_description"
              value={seoSettings.site_description}
              onChange={(e) => handleInputChange("site_description", e.target.value)}
              rows={3}
              maxLength={160}
              placeholder="Mô tả ngắn gọn về website (hiển thị trên Google)"
            />
            <p className="text-sm text-gray-500">{seoSettings.site_description.length}/160 ký tự</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_keywords">Từ khóa SEO</Label>
            <Textarea
              id="site_keywords"
              value={seoSettings.site_keywords}
              onChange={(e) => handleInputChange("site_keywords", e.target.value)}
              rows={2}
              placeholder="từ khóa 1, từ khóa 2, từ khóa 3..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site_author">Tác giả</Label>
              <Input
                id="site_author"
                value={seoSettings.site_author}
                onChange={(e) => handleInputChange("site_author", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="geo_position">Vị trí địa lý (lat;lng)</Label>
              <Input
                id="geo_position"
                value={seoSettings.geo_position}
                onChange={(e) => handleInputChange("geo_position", e.target.value)}
                placeholder="11.564;108.991"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Robots & Indexing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Robots & Indexing
          </CardTitle>
          <CardDescription>
            Điều khiển cách công cụ tìm kiếm index trang web
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="robots_index"
                checked={seoSettings.robots_index}
                onCheckedChange={(checked) => handleInputChange("robots_index", checked)}
              />
              <Label htmlFor="robots_index">Index</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="robots_follow"
                checked={seoSettings.robots_follow}
                onCheckedChange={(checked) => handleInputChange("robots_follow", checked)}
              />
              <Label htmlFor="robots_follow">Follow</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="robots_noarchive"
                checked={seoSettings.robots_noarchive}
                onCheckedChange={(checked) => handleInputChange("robots_noarchive", checked)}
              />
              <Label htmlFor="robots_noarchive">No Archive</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="robots_nosnippet"
                checked={seoSettings.robots_nosnippet}
                onCheckedChange={(checked) => handleInputChange("robots_nosnippet", checked)}
              />
              <Label htmlFor="robots_nosnippet">No Snippet</Label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sitemap_priority">Sitemap Priority</Label>
              <Select value={seoSettings.sitemap_priority} onValueChange={(value) => handleInputChange("sitemap_priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.0">1.0 (Cao nhất)</SelectItem>
                  <SelectItem value="0.9">0.9</SelectItem>
                  <SelectItem value="0.8">0.8</SelectItem>
                  <SelectItem value="0.7">0.7</SelectItem>
                  <SelectItem value="0.5">0.5 (Trung bình)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sitemap_changefreq">Tần suất thay đổi</Label>
              <Select value={seoSettings.sitemap_changefreq} onValueChange={(value) => handleInputChange("sitemap_changefreq", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always">Always</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Open Graph */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Open Graph (Facebook)
          </CardTitle>
          <CardDescription>
            Tùy chỉnh hiển thị khi chia sẻ trên Facebook và mạng xã hội
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="og_title">Tiêu đề OG</Label>
              <Input
                id="og_title"
                value={seoSettings.og_title}
                onChange={(e) => handleInputChange("og_title", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="og_type">Loại OG</Label>
              <Select value={seoSettings.og_type} onValueChange={(value) => handleInputChange("og_type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="business.business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="og_description">Mô tả OG</Label>
            <Textarea
              id="og_description"
              value={seoSettings.og_description}
              onChange={(e) => handleInputChange("og_description", e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="og_image">URL hình ảnh OG</Label>
              <Input
                id="og_image"
                value={seoSettings.og_image}
                onChange={(e) => handleInputChange("og_image", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="og_site_name">Tên website</Label>
              <Input
                id="og_site_name"
                value={seoSettings.og_site_name}
                onChange={(e) => handleInputChange("og_site_name", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Twitter Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Twitter Cards</CardTitle>
          <CardDescription>
            Tùy chỉnh hiển thị khi chia sẻ trên Twitter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twitter_card">Loại Twitter Card</Label>
              <Select value={seoSettings.twitter_card} onValueChange={(value) => handleInputChange("twitter_card", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                  <SelectItem value="app">App</SelectItem>
                  <SelectItem value="player">Player</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter_site">Twitter Site (@username)</Label>
              <Input
                id="twitter_site"
                value={seoSettings.twitter_site}
                onChange={(e) => handleInputChange("twitter_site", e.target.value)}
                placeholder="@geelyninhthuan"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter_title">Tiêu đề Twitter</Label>
            <Input
              id="twitter_title"
              value={seoSettings.twitter_title}
              onChange={(e) => handleInputChange("twitter_title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter_description">Mô tả Twitter</Label>
            <Textarea
              id="twitter_description"
              value={seoSettings.twitter_description}
              onChange={(e) => handleInputChange("twitter_description", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Site Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Xác Thực Website
          </CardTitle>
          <CardDescription>
            Mã xác thực từ các công cụ tìm kiếm
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="google_site_verification">Google Site Verification</Label>
            <Input
              id="google_site_verification"
              value={seoSettings.google_site_verification}
              onChange={(e) => handleInputChange("google_site_verification", e.target.value)}
              placeholder="Mã xác thực từ Google Search Console"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bing_site_verification">Bing Site Verification</Label>
            <Input
              id="bing_site_verification"
              value={seoSettings.bing_site_verification}
              onChange={(e) => handleInputChange("bing_site_verification", e.target.value)}
              placeholder="Mã xác thực từ Bing Webmaster Tools"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yandex_verification">Yandex Verification</Label>
            <Input
              id="yandex_verification"
              value={seoSettings.yandex_verification}
              onChange={(e) => handleInputChange("yandex_verification", e.target.value)}
              placeholder="Mã xác thực từ Yandex Webmaster"
            />
          </div>
        </CardContent>
      </Card>

      {/* Structured Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Structured Data (Schema.org)
          </CardTitle>
          <CardDescription>
            Dữ liệu có cấu trúc giúp Google hiểu nội dung website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schema_type">Schema Type</Label>
              <Select value={seoSettings.schema_type} onValueChange={(value) => handleInputChange("schema_type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AutoDealer">Auto Dealer</SelectItem>
                  <SelectItem value="LocalBusiness">Local Business</SelectItem>
                  <SelectItem value="Organization">Organization</SelectItem>
                  <SelectItem value="Store">Store</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schema_name">Tên doanh nghiệp</Label>
              <Input
                id="schema_name"
                value={seoSettings.schema_name}
                onChange={(e) => handleInputChange("schema_name", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schema_description">Mô tả doanh nghiệp</Label>
            <Textarea
              id="schema_description"
              value={seoSettings.schema_description}
              onChange={(e) => handleInputChange("schema_description", e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schema_url">URL doanh nghiệp</Label>
              <Input
                id="schema_url"
                value={seoSettings.schema_url}
                onChange={(e) => handleInputChange("schema_url", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schema_logo">URL Logo</Label>
              <Input
                id="schema_logo"
                value={seoSettings.schema_logo}
                onChange={(e) => handleInputChange("schema_logo", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="structured_data_preview">Preview JSON-LD</Label>
            <Textarea
              id="structured_data_preview"
              value={JSON.stringify(generateStructuredData(), null, 2)}
              readOnly
              rows={10}
              className="font-mono text-sm bg-gray-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Geo Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Thông Tin Địa Lý
          </CardTitle>
          <CardDescription>
            Thông tin vị trí địa lý cho SEO local
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="geo_region">Mã vùng</Label>
              <Input
                id="geo_region"
                value={seoSettings.geo_region}
                onChange={(e) => handleInputChange("geo_region", e.target.value)}
                placeholder="VN-34"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="geo_placename">Tên địa điểm</Label>
              <Input
                id="geo_placename"
                value={seoSettings.geo_placename}
                onChange={(e) => handleInputChange("geo_placename", e.target.value)}
                placeholder="Ninh Thuận, Vietnam"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="geo_position">Tọa độ (lat;lng)</Label>
              <Input
                id="geo_position"
                value={seoSettings.geo_position}
                onChange={(e) => handleInputChange("geo_position", e.target.value)}
                placeholder="11.564;108.991"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview HTML Output */}
      <Card>
        <CardHeader>
          <CardTitle>Preview HTML Output</CardTitle>
          <CardDescription>
            Xem trước HTML sẽ được tạo ra từ cài đặt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={generateMetaHTML()}
            readOnly
            rows={20}
            className="font-mono text-sm"
          />
        </CardContent>
      </Card>

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
