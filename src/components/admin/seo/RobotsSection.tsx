
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

interface RobotsSectionProps {
  seoSettings: any;
  handleInputChange: (field: string, value: any) => void;
}

const RobotsSection = ({ seoSettings, handleInputChange }: RobotsSectionProps) => {
  return (
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
  );
};

export default RobotsSection;
