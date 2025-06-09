
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Plus, Trash2 } from "lucide-react";

interface TechnicalSEOSectionProps {
  seoSettings: any;
  handleInputChange: (field: string, value: any) => void;
}

const TechnicalSEOSection = ({ seoSettings, handleInputChange }: TechnicalSEOSectionProps) => {
  const addHreflangTag = () => {
    const newTag = {
      hreflang: "vi-VN",
      href: "https://geelyninhthuan.vn/"
    };
    
    const updatedTags = [...(seoSettings.hreflang_tags || []), newTag];
    handleInputChange("hreflang_tags", updatedTags);
  };

  const updateHreflangTag = (index: number, field: string, value: string) => {
    const updatedTags = [...(seoSettings.hreflang_tags || [])];
    updatedTags[index] = { ...updatedTags[index], [field]: value };
    handleInputChange("hreflang_tags", updatedTags);
  };

  const removeHreflangTag = (index: number) => {
    const updatedTags = seoSettings.hreflang_tags.filter((_: any, i: number) => i !== index);
    handleInputChange("hreflang_tags", updatedTags);
  };

  const addCustomMetaTag = () => {
    const newTag = {
      name: "",
      content: "",
      property: ""
    };
    
    const updatedTags = [...(seoSettings.custom_meta_tags || []), newTag];
    handleInputChange("custom_meta_tags", updatedTags);
  };

  const updateCustomMetaTag = (index: number, field: string, value: string) => {
    const updatedTags = [...(seoSettings.custom_meta_tags || [])];
    updatedTags[index] = { ...updatedTags[index], [field]: value };
    handleInputChange("custom_meta_tags", updatedTags);
  };

  const removeCustomMetaTag = (index: number) => {
    const updatedTags = seoSettings.custom_meta_tags.filter((_: any, i: number) => i !== index);
    handleInputChange("custom_meta_tags", updatedTags);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Technical SEO
        </CardTitle>
        <CardDescription>
          Các cài đặt kỹ thuật SEO nâng cao
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Site Verification */}
        <div className="space-y-4">
          <h4 className="font-medium">Xác thực công cụ tìm kiếm</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="google_site_verification">Google Search Console</Label>
              <Input
                id="google_site_verification"
                value={seoSettings.google_site_verification}
                onChange={(e) => handleInputChange("google_site_verification", e.target.value)}
                placeholder="Meta verification code"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bing_site_verification">Bing Webmaster</Label>
              <Input
                id="bing_site_verification"
                value={seoSettings.bing_site_verification}
                onChange={(e) => handleInputChange("bing_site_verification", e.target.value)}
                placeholder="Meta verification code"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yandex_verification">Yandex Webmaster</Label>
              <Input
                id="yandex_verification"
                value={seoSettings.yandex_verification}
                onChange={(e) => handleInputChange("yandex_verification", e.target.value)}
                placeholder="Meta verification code"
              />
            </div>
          </div>
        </div>

        {/* Meta Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="meta_viewport">Meta Viewport</Label>
            <Input
              id="meta_viewport"
              value={seoSettings.meta_viewport}
              onChange={(e) => handleInputChange("meta_viewport", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meta_charset">Meta Charset</Label>
            <Input
              id="meta_charset"
              value={seoSettings.meta_charset}
              onChange={(e) => handleInputChange("meta_charset", e.target.value)}
            />
          </div>
        </div>

        {/* Hreflang Tags */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Hreflang Tags (Đa ngôn ngữ)</h4>
            <Button type="button" variant="outline" size="sm" onClick={addHreflangTag}>
              <Plus className="h-4 w-4 mr-1" />
              Thêm Hreflang
            </Button>
          </div>
          
          {seoSettings.hreflang_tags?.map((tag: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-medium">Hreflang {index + 1}</h5>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeHreflangTag(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Language code (vi-VN, en-US)"
                  value={tag.hreflang || ''}
                  onChange={(e) => updateHreflangTag(index, 'hreflang', e.target.value)}
                />
                <Input
                  placeholder="URL"
                  value={tag.href || ''}
                  onChange={(e) => updateHreflangTag(index, 'href', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Custom Meta Tags */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Custom Meta Tags</h4>
            <Button type="button" variant="outline" size="sm" onClick={addCustomMetaTag}>
              <Plus className="h-4 w-4 mr-1" />
              Thêm Meta Tag
            </Button>
          </div>
          
          {seoSettings.custom_meta_tags?.map((tag: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-medium">Meta Tag {index + 1}</h5>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeCustomMetaTag(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Name attribute"
                  value={tag.name || ''}
                  onChange={(e) => updateCustomMetaTag(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="Property attribute"
                  value={tag.property || ''}
                  onChange={(e) => updateCustomMetaTag(index, 'property', e.target.value)}
                />
                <Input
                  placeholder="Content"
                  value={tag.content || ''}
                  onChange={(e) => updateCustomMetaTag(index, 'content', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalSEOSection;
