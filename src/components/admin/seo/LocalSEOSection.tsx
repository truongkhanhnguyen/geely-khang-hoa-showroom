
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocalSEOSectionProps {
  seoSettings: any;
  handleInputChange: (field: string, value: any) => void;
}

const LocalSEOSection = ({ seoSettings, handleInputChange }: LocalSEOSectionProps) => {
  const updateSchemaAddress = (field: string, value: string) => {
    const updatedAddress = {
      ...seoSettings.schema_address,
      [field]: value
    };
    handleInputChange("schema_address", updatedAddress);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Local SEO & Địa lý
        </CardTitle>
        <CardDescription>
          Tối ưu hóa SEO địa phương và vị trí địa lý
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Geographic Meta Tags */}
        <div className="space-y-4">
          <h4 className="font-medium">Thông tin địa lý</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="geo_region">Khu vực (ISO 3166-2)</Label>
              <Input
                id="geo_region"
                value={seoSettings.geo_region}
                onChange={(e) => handleInputChange("geo_region", e.target.value)}
                placeholder="VN-34 (Ninh Thuận)"
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
        </div>

        {/* Schema Address */}
        <div className="space-y-4">
          <h4 className="font-medium">Địa chỉ doanh nghiệp (Schema.org)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address_street">Địa chỉ đường phố</Label>
              <Input
                id="address_street"
                value={seoSettings.schema_address?.streetAddress || ''}
                onChange={(e) => updateSchemaAddress("streetAddress", e.target.value)}
                placeholder="123 Đường ABC"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address_locality">Thành phố/Địa phương</Label>
              <Input
                id="address_locality"
                value={seoSettings.schema_address?.addressLocality || ''}
                onChange={(e) => updateSchemaAddress("addressLocality", e.target.value)}
                placeholder="Phan Rang-Tháp Chàm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address_region">Tỉnh/Thành</Label>
              <Input
                id="address_region"
                value={seoSettings.schema_address?.addressRegion || ''}
                onChange={(e) => updateSchemaAddress("addressRegion", e.target.value)}
                placeholder="Ninh Thuận"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address_country">Quốc gia</Label>
              <Input
                id="address_country"
                value={seoSettings.schema_address?.addressCountry || ''}
                onChange={(e) => updateSchemaAddress("addressCountry", e.target.value)}
                placeholder="VN"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address_postal">Mã bưu điện</Label>
              <Input
                id="address_postal"
                value={seoSettings.schema_address?.postalCode || ''}
                onChange={(e) => updateSchemaAddress("postalCode", e.target.value)}
                placeholder="59000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address_phone">Số điện thoại</Label>
              <Input
                id="address_phone"
                value={seoSettings.schema_address?.telephone || ''}
                onChange={(e) => updateSchemaAddress("telephone", e.target.value)}
                placeholder="+84 xxx xxx xxx"
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="space-y-4">
          <h4 className="font-medium">Giờ hoạt động</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="opening_hours">Giờ mở cửa</Label>
              <Textarea
                id="opening_hours"
                value={seoSettings.schema_address?.openingHours || ''}
                onChange={(e) => updateSchemaAddress("openingHours", e.target.value)}
                placeholder="Mo-Fr 08:00-17:00, Sa 08:00-12:00"
                rows={3}
              />
              <p className="text-sm text-gray-500">
                Định dạng: Mo-Fr 08:00-17:00, Sa 08:00-12:00
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price_range">Phạm vi giá</Label>
              <Input
                id="price_range"
                value={seoSettings.schema_address?.priceRange || ''}
                onChange={(e) => updateSchemaAddress("priceRange", e.target.value)}
                placeholder="$$ (699tr - 1.5 tỷ VND)"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalSEOSection;
