
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calculator, User, Phone, Mail, MessageSquare, Car, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PriceQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: string;
}

const PriceQuoteModal = ({ isOpen, onClose, selectedCar }: PriceQuoteModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    car: selectedCar,
    variant: "",
    financingType: "",
    notes: ""
  });

  const carPrices = {
    "Geely Coolray": {
      "Comfort": { price: 699000000, variants: ["Comfort"] },
      "Premium": { price: 769000000, variants: ["Comfort", "Premium"] }
    },
    "Geely Monjaro": {
      "Comfort": { price: 1469000000, variants: ["Comfort"] },
      "Premium": { price: 1569000000, variants: ["Comfort", "Premium"] }
    },
    "Geely EX5": {
      "Comfort": { price: 769000000, variants: ["Comfort"] },
      "Premium": { price: 869000000, variants: ["Comfort", "Premium"] }
    }
  };

  const calculatePrice = () => {
    if (!formData.car || !formData.variant) return null;
    
    const basePrice = carPrices[formData.car as keyof typeof carPrices]?.[formData.variant as keyof typeof carPrices[typeof formData.car]]?.price;
    if (!basePrice) return null;

    const registrationFee = 20000000; // 20 triệu
    const insurance = basePrice * 0.015; // 1.5% giá trị xe
    const roadMaintenance = 1560000; // Phí bảo trì đường bộ
    const registration = 2000000; // Phí đăng ký

    return {
      basePrice,
      registrationFee,
      insurance,
      roadMaintenance,
      registration,
      total: basePrice + registrationFee + insurance + roadMaintenance + registration
    };
  };

  const priceBreakdown = calculatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.car || !formData.variant) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Các trường có dấu * là bắt buộc",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Yêu cầu báo giá đã được gửi!",
      description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để tư vấn chi tiết."
    });

    setFormData({
      name: "",
      phone: "",
      email: "",
      car: "",
      variant: "",
      financingType: "",
      notes: ""
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Set selected car when modal opens
  if (selectedCar && formData.car !== selectedCar) {
    setFormData(prev => ({ ...prev, car: selectedCar, variant: "" }));
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Báo giá lăn bánh
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Họ và tên *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nhập họ và tên"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Số điện thoại *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Nhập địa chỉ email"
                className="mt-1"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center text-sm font-medium text-gray-700">
                  <Car className="w-4 h-4 mr-2" />
                  Dòng xe *
                </Label>
                <Select value={formData.car} onValueChange={(value) => handleInputChange("car", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn dòng xe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Geely Coolray">Geely Coolray</SelectItem>
                    <SelectItem value="Geely Monjaro">Geely Monjaro</SelectItem>
                    <SelectItem value="Geely EX5">Geely EX5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center text-sm font-medium text-gray-700">
                  <Calculator className="w-4 h-4 mr-2" />
                  Phiên bản *
                </Label>
                <Select value={formData.variant} onValueChange={(value) => handleInputChange("variant", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn phiên bản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comfort">Comfort</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Hình thức thanh toán
              </Label>
              <Select value={formData.financingType} onValueChange={(value) => handleInputChange("financingType", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Chọn hình thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Thanh toán toàn bộ</SelectItem>
                  <SelectItem value="installment">Trả góp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes" className="flex items-center text-sm font-medium text-gray-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ghi chú
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Ghi chú thêm (nếu có)"
                className="mt-1 resize-none"
                rows={3}
              />
            </div>
          </form>

          {priceBreakdown && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                Chi phí ước tính
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Giá xe ({formData.car} {formData.variant}):</span>
                  <span className="font-medium">{formatPrice(priceBreakdown.basePrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phí trước bạ:</span>
                  <span className="font-medium">{formatPrice(priceBreakdown.registrationFee)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bảo hiểm:</span>
                  <span className="font-medium">{formatPrice(priceBreakdown.insurance)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phí bảo trì đường bộ:</span>
                  <span className="font-medium">{formatPrice(priceBreakdown.roadMaintenance)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phí đăng ký:</span>
                  <span className="font-medium">{formatPrice(priceBreakdown.registration)}</span>
                </div>
                <div className="border-t border-blue-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Tổng chi phí lăn bánh:</span>
                    <span className="text-xl font-bold text-blue-600">{formatPrice(priceBreakdown.total)}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * Giá trên chỉ mang tính chất tham khảo. Giá chính thức sẽ được tư vấn chi tiết khi liên hệ.
              </p>
            </Card>
          )}

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Đóng
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            >
              Gửi yêu cầu báo giá
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceQuoteModal;
