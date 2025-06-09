
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter } from "lucide-react";

interface TwitterSectionProps {
  seoSettings: any;
  handleInputChange: (field: string, value: any) => void;
}

const TwitterSection = ({ seoSettings, handleInputChange }: TwitterSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Twitter className="h-5 w-5" />
          Twitter Cards
        </CardTitle>
        <CardDescription>
          Tùy chỉnh hiển thị khi chia sẻ trên Twitter/X
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="twitter_title">Tiêu đề Twitter</Label>
            <Input
              id="twitter_title"
              value={seoSettings.twitter_title}
              onChange={(e) => handleInputChange("twitter_title", e.target.value)}
            />
          </div>
          
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter_description">Mô tả Twitter</Label>
          <Textarea
            id="twitter_description"
            value={seoSettings.twitter_description}
            onChange={(e) => handleInputChange("twitter_description", e.target.value)}
            rows={2}
            maxLength={200}
          />
          <p className="text-sm text-gray-500">{seoSettings.twitter_description.length}/200 ký tự</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="twitter_image">URL hình ảnh Twitter</Label>
            <Input
              id="twitter_image"
              value={seoSettings.twitter_image}
              onChange={(e) => handleInputChange("twitter_image", e.target.value)}
            />
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
      </CardContent>
    </Card>
  );
};

export default TwitterSection;
