
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type CarModel = "Geely Coolray" | "Geely Monjaro" | "Geely EX5";
type CarVariant = "Standard" | "Premium" | "Flagship";

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const [selectedCar, setSelectedCar] = useState<CarModel>("Geely Coolray");
  const [selectedVariant, setSelectedVariant] = useState<CarVariant>("Standard");

  // Giá xe mẫu - trong thực tế sẽ lưu vào database
  const [carPrices, setCarPrices] = useState({
    "Geely Coolray": {
      Standard: { basePrice: 538000000, promotion: 26900000 },
      Premium: { basePrice: 578000000, promotion: 28900000 },
      Flagship: { basePrice: 628000000, promotion: 31400000 }
    },
    "Geely Monjaro": {
      Standard: { basePrice: 1200000000, promotion: 60000000 },
      Premium: { basePrice: 1350000000, promotion: 67500000 },
      Flagship: { basePrice: 1500000000, promotion: 75000000 }
    },
    "Geely EX5": {
      Standard: { basePrice: 769000000, promotion: 38450000 },
      Premium: { basePrice: 850000000, promotion: 42500000 },
      Flagship: { basePrice: 950000000, promotion: 47500000 }
    }
  });

  // Các khoản phí đăng ký
  const [registrationFees, setRegistrationFees] = useState({
    licensePlate: 1000000,
    roadFee: 1560000,
    insurance: 550000,
    serviceFee: 5000000,
    inspectionStandard: 95000,
    inspectionPremium: 150000
  });

  const handlePriceUpdate = (field: "basePrice" | "promotion", value: string) => {
    const numValue = parseInt(value) || 0;
    setCarPrices(prev => ({
      ...prev,
      [selectedCar]: {
        ...prev[selectedCar],
        [selectedVariant]: {
          ...prev[selectedCar][selectedVariant],
          [field]: numValue
        }
      }
    }));
  };

  const handleFeeUpdate = (field: keyof typeof registrationFees, value: string) => {
    const numValue = parseInt(value) || 0;
    setRegistrationFees(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-2xl font-bold text-blue-600">
            Quản Lý Admin - Geely Khánh Hòa
          </DialogTitle>
          <Button
            variant="outline"
            size="icon"
            className="absolute -top-2 -right-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6">
          <Tabs defaultValue="prices" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="prices">Quản Lý Giá Xe</TabsTrigger>
              <TabsTrigger value="fees">Phí Đăng Ký</TabsTrigger>
            </TabsList>

            <TabsContent value="prices" className="space-y-6">
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Giá niêm yết (VNĐ)</Label>
                      <Input
                        type="number"
                        value={carPrices[selectedCar][selectedVariant].basePrice}
                        onChange={(e) => handlePriceUpdate("basePrice", e.target.value)}
                        placeholder="Nhập giá niêm yết"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {formatPrice(carPrices[selectedCar][selectedVariant].basePrice)} VNĐ
                      </p>
                    </div>

                    <div>
                      <Label>Khuyến mãi (VNĐ)</Label>
                      <Input
                        type="number"
                        value={carPrices[selectedCar][selectedVariant].promotion}
                        onChange={(e) => handlePriceUpdate("promotion", e.target.value)}
                        placeholder="Nhập số tiền khuyến mãi"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {formatPrice(carPrices[selectedCar][selectedVariant].promotion)} VNĐ
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-800">
                      Giá sau khuyến mãi: {formatPrice(carPrices[selectedCar][selectedVariant].basePrice - carPrices[selectedCar][selectedVariant].promotion)} VNĐ
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="space-y-6">
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
                        value={registrationFees.licensePlate}
                        onChange={(e) => handleFeeUpdate("licensePlate", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Phí đường bộ 12 tháng (VNĐ)</Label>
                      <Input
                        type="number"
                        value={registrationFees.roadFee}
                        onChange={(e) => handleFeeUpdate("roadFee", e.target.value)}
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
                        value={registrationFees.serviceFee}
                        onChange={(e) => handleFeeUpdate("serviceFee", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Phí đăng kiểm Standard (VNĐ)</Label>
                      <Input
                        type="number"
                        value={registrationFees.inspectionStandard}
                        onChange={(e) => handleFeeUpdate("inspectionStandard", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Phí đăng kiểm Premium/Flagship (VNĐ)</Label>
                      <Input
                        type="number"
                        value={registrationFees.inspectionPremium}
                        onChange={(e) => handleFeeUpdate("inspectionPremium", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button 
              onClick={() => {
                console.log("Cập nhật giá xe:", carPrices);
                console.log("Cập nhật phí đăng ký:", registrationFees);
                onClose();
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
