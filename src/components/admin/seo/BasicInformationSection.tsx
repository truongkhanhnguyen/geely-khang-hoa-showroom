
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface BasicInformationSectionProps {
  seoSettings: any;
  handleInputChange: (field: string, value: any) => void;
}

const BasicInformationSection = ({ seoSettings, handleInputChange }: BasicInformationSectionProps) => {
  return (
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
  );
};

export default BasicInformationSection;
