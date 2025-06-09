
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type CarModel = "Geely Coolray" | "Geely Monjaro" | "Geely EX5";
type CarVariant = "Standard" | "Premium" | "Flagship";

interface CarPrice {
  id: string;
  car_model: string;
  variant: string;
  base_price: number;
  promotion: number;
  price_available: boolean;
}

interface RegistrationFees {
  id: string;
  license_plate: number;
  road_fee: number;
  insurance: number;
  service_fee: number;
  inspection_standard: number;
  inspection_premium: number;
}

const PriceManagement = () => {
  const { toast } = useToast();
  const [selectedCar, setSelectedCar] = useState<CarModel>("Geely Coolray");
  const [selectedVariant, setSelectedVariant] = useState<CarVariant>("Standard");
  const [carPrices, setCarPrices] = useState<CarPrice[]>([]);
  const [registrationFees, setRegistrationFees] = useState<RegistrationFees | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch car prices
      const { data: pricesData, error: pricesError } = await supabase
        .from('car_prices')
        .select('*')
        .order('car_model', { ascending: true });

      if (pricesError) throw pricesError;

      // Fetch registration fees
      const { data: feesData, error: feesError } = await supabase
        .from('registration_fees')
        .select('*')
        .limit(1);

      if (feesError) throw feesError;

      setCarPrices(pricesData || []);
      setRegistrationFees(feesData?.[0] || null);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPrice = () => {
    return carPrices.find(
      price => price.car_model === selectedCar && price.variant === selectedVariant
    );
  };

  const handlePriceUpdate = async (field: "base_price" | "promotion", value: string) => {
    const numValue = parseInt(value) || 0;
    const currentPrice = getCurrentPrice();
    
    if (!currentPrice) return;

    try {
      const { error } = await supabase
        .from('car_prices')
        .update({ [field]: numValue, updated_at: new Date().toISOString() })
        .eq('id', currentPrice.id);

      if (error) throw error;

      // Update local state
      setCarPrices(prev => prev.map(price => 
        price.id === currentPrice.id 
          ? { ...price, [field]: numValue }
          : price
      ));

      toast({
        title: "Thành công",
        description: "Cập nhật giá thành công!",
      });
    } catch (error) {
      console.error('Error updating price:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật giá. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handlePriceAvailabilityToggle = async (available: boolean) => {
    const currentPrice = getCurrentPrice();
    
    if (!currentPrice) return;

    try {
      const { error } = await supabase
        .from('car_prices')
        .update({ price_available: available, updated_at: new Date().toISOString() })
        .eq('id', currentPrice.id);

      if (error) throw error;

      // Update local state
      setCarPrices(prev => prev.map(price => 
        price.id === currentPrice.id 
          ? { ...price, price_available: available }
          : price
      ));

      toast({
        title: "Thành công",
        description: available ? "Đã bật hiển thị giá!" : "Đã tắt hiển thị giá!",
      });
    } catch (error) {
      console.error('Error updating price availability:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái hiển thị giá. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleFeeUpdate = async (field: keyof Omit<RegistrationFees, 'id'>, value: string) => {
    const numValue = parseInt(value) || 0;
    
    if (!registrationFees) return;

    try {
      const { error } = await supabase
        .from('registration_fees')
        .update({ [field]: numValue, updated_at: new Date().toISOString() })
        .eq('id', registrationFees.id);

      if (error) throw error;

      // Update local state
      setRegistrationFees(prev => prev ? { ...prev, [field]: numValue } : null);

      toast({
        title: "Thành công",
        description: "Cập nhật phí thành công!",
      });
    } catch (error) {
      console.error('Error updating fee:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật phí. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // This function can be used for bulk operations if needed
      toast({
        title: "Thành công",
        description: "Tất cả thay đổi đã được lưu!",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu dữ liệu.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  const currentPrice = getCurrentPrice();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cập Nhật Giá Xe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Dòng xe</Label>
              <Select value={selectedCar} onValueChange={(value) => setSelectedCar(value as CarModel)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Geely Coolray">Geely Coolray</SelectItem>
                  <SelectItem value="Geely Monjaro">Geely Monjaro</SelectItem>
                  <SelectItem value="Geely EX5">Geely EX5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Phiên bản</Label>
              <Select value={selectedVariant} onValueChange={(value) => setSelectedVariant(value as CarVariant)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Flagship">Flagship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {currentPrice && (
            <>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-base font-semibold">Hiển thị giá</Label>
                  <p className="text-sm text-gray-600">
                    {currentPrice.price_available 
                      ? "Giá xe hiện đang được hiển thị trên website" 
                      : "Giá xe hiện không được hiển thị (Coming Soon)"}
                  </p>
                </div>
                <Switch
                  checked={currentPrice.price_available}
                  onCheckedChange={handlePriceAvailabilityToggle}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giá niêm yết (VNĐ)</Label>
                  <Input
                    type="number"
                    value={currentPrice.base_price}
                    onChange={(e) => handlePriceUpdate("base_price", e.target.value)}
                    placeholder="Nhập giá niêm yết"
                    disabled={!currentPrice.price_available}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPrice(currentPrice.base_price)} VNĐ
                  </p>
                </div>

                <div>
                  <Label>Khuyến mãi (VNĐ)</Label>
                  <Input
                    type="number"
                    value={currentPrice.promotion}
                    onChange={(e) => handlePriceUpdate("promotion", e.target.value)}
                    placeholder="Nhập số tiền khuyến mãi"
                    disabled={!currentPrice.price_available}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPrice(currentPrice.promotion)} VNĐ
                  </p>
                </div>
              </div>

              {currentPrice.price_available && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-800">
                    Giá sau khuyến mãi: {formatPrice(currentPrice.base_price - currentPrice.promotion)} VNĐ
                  </p>
                </div>
              )}

              {!currentPrice.price_available && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="font-semibold text-orange-800">
                    Giá xe hiện không được hiển thị trên website. Khách hàng sẽ thấy "Coming Soon"
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {registrationFees && (
        <Card>
          <CardHeader>
            <CardTitle>Cập Nhật Phí Đăng Ký</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phí biển số (VNĐ)</Label>
                <Input
                  type="number"
                  value={registrationFees.license_plate}
                  onChange={(e) => handleFeeUpdate("license_plate", e.target.value)}
                />
              </div>

              <div>
                <Label>Phí đường bộ 12 tháng (VNĐ)</Label>
                <Input
                  type="number"
                  value={registrationFees.road_fee}
                  onChange={(e) => handleFeeUpdate("road_fee", e.target.value)}
                />
              </div>

              <div>
                <Label>Bảo hiểm TNDS (VNĐ)</Label>
                <Input
                  type="number"
                  value={registrationFees.insurance}
                  onChange={(e) => handleFeeUpdate("insurance", e.target.value)}
                />
              </div>

              <div>
                <Label>Phí dịch vụ đăng ký (VNĐ)</Label>
                <Input
                  type="number"
                  value={registrationFees.service_fee}
                  onChange={(e) => handleFeeUpdate("service_fee", e.target.value)}
                />
              </div>

              <div>
                <Label>Phí đăng kiểm Standard (VNĐ)</Label>
                <Input
                  type="number"
                  value={registrationFees.inspection_standard}
                  onChange={(e) => handleFeeUpdate("inspection_standard", e.target.value)}
                />
              </div>

              <div>
                <Label>Phí đăng kiểm Premium/Flagship (VNĐ)</Label>
                <Input
                  type="number"
                  value={registrationFees.inspection_premium}
                  onChange={(e) => handleFeeUpdate("inspection_premium", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {saving ? "Đang lưu..." : "Lưu tất cả thay đổi"}
        </Button>
      </div>
    </div>
  );
};

export default PriceManagement;
