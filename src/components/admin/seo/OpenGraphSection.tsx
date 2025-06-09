
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";

interface OpenGraphSectionProps {
  seoSettings: any;
  handleInputChange: (field: string, value: any) => void;
}

const OpenGraphSection = ({ seoSettings, handleInputChange }: OpenGraphSectionProps) => {
  return (
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
  );
};

export default OpenGraphSection;
