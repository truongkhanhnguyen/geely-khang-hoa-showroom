import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface PriceQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar?: string;
}

type CarModel = "Geely Coolray" | "Geely Monjaro" | "Geely EX5";
type CarVariant = "Standard" | "Premium" | "Flagship";

const PriceQuoteModal = ({ isOpen, onClose, selectedCar }: PriceQuoteModalProps) => {
  const [showQuote, setShowQuote] = useState(false);
  const [formData, setFormData] = useState({
    carModel: selectedCar || "",
    name: "",
    phone: ""
  });

  const carPrices: Record<CarModel, Record<CarVariant, { basePrice: number; promotion: number; finalPrice: number }>> = {
    "Geely Coolray": {
      Standard: { basePrice: 538000000, promotion: 26900000, finalPrice: 511100000 },
      Premium: { basePrice: 578000000, promotion: 28900000, finalPrice: 549100000 },
      Flagship: { basePrice: 628000000, promotion: 31400000, finalPrice: 596600000 }
    },
    "Geely Monjaro": {
      Standard: { basePrice: 1200000000, promotion: 60000000, finalPrice: 1140000000 },
      Premium: { basePrice: 1350000000, promotion: 67500000, finalPrice: 1282500000 },
      Flagship: { basePrice: 1500000000, promotion: 75000000, finalPrice: 1425000000 }
    },
    "Geely EX5": {
      Standard: { basePrice: 769000000, promotion: 38450000, finalPrice: 730550000 },
      Premium: { basePrice: 850000000, promotion: 42500000, finalPrice: 807500000 },
      Flagship: { basePrice: 950000000, promotion: 47500000, finalPrice: 902500000 }
    }
  };

  const calculateRegistrationFees = (variant: CarVariant, basePrice: number) => {
    const registrationTax = Math.round(basePrice * 0.1);
    const licensePlate = 1000000;
    const inspection = variant === "Standard" ? 95000 : 150000;
    const roadFee = 1560000;
    const insurance = 550000;
    const serviceFee = 5000000;
    
    const totalRegistration = registrationTax + licensePlate + inspection + roadFee + insurance + serviceFee;
    return {
      registrationTax,
      licensePlate,
      inspection,
      roadFee,
      insurance,
      serviceFee,
      totalRegistration
    };
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.carModel && formData.name && formData.phone) {
      console.log("Price quote request:", formData);
      setShowQuote(true);
    }
  };

  const handleClose = () => {
    setShowQuote(false);
    setFormData({ carModel: selectedCar || "", name: "", phone: "" });
    onClose();
  };

  const selectedCarData = formData.carModel ? carPrices[formData.carModel as CarModel] : null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-red-600">
            BÁO GIÁ XE GEELY CHI NHÁNH KHÁNH HÒA
          </DialogTitle>
          <div className="text-center text-sm text-gray-600">
            442 Lê Hồng Phong, Phường Phước Hải, Thành phố Nha Trang, Tỉnh Khánh Hòa
          </div>
          <div className="text-center text-sm font-semibold">
            HOTLINE: 0879890879
          </div>
        </DialogHeader>

        {!showQuote ? (
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold">Thông tin yêu cầu báo giá</h3>
              <p className="text-gray-600">Vui lòng điền thông tin để nhận báo giá chi tiết</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="carModel">Dòng xe quan tâm *</Label>
                <Select 
                  value={formData.carModel} 
                  onValueChange={(value) => setFormData({...formData, carModel: value})}
                >
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
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nhập họ và tên"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Nhập số điện thoại"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Gửi yêu cầu báo giá
            </Button>
          </form>
        ) : (
          selectedCarData && (
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-600">{formData.carModel.toUpperCase()}</h3>
              </div>

              {/* Main Price Table */}
              <div className="mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="border border-gray-300 p-3 text-left">STT</th>
                      <th className="border border-gray-300 p-3 text-left">CÁC KHOẢN CHI PHÍ</th>
                      <th className="border border-gray-300 p-3 text-center">STANDARD</th>
                      <th className="border border-gray-300 p-3 text-center">PREMIUM</th>
                      <th className="border border-gray-300 p-3 text-center">FLAGSHIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">1</td>
                      <td className="border border-gray-300 p-3 font-semibold">GIÁ BÁN NIÊM YẾT</td>
                      <td className="border border-gray-300 p-3 text-center">{formatPrice(selectedCarData.Standard.basePrice)}</td>
                      <td className="border border-gray-300 p-3 text-center">{formatPrice(selectedCarData.Premium.basePrice)}</td>
                      <td className="border border-gray-300 p-3 text-center">{formatPrice(selectedCarData.Flagship.basePrice)}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">2</td>
                      <td className="border border-gray-300 p-3 font-semibold">CSKM THÁNG 05.2025</td>
                      <td className="border border-gray-300 p-3 text-center text-red-600">{formatPrice(selectedCarData.Standard.promotion)}</td>
                      <td className="border border-gray-300 p-3 text-center text-red-600">{formatPrice(selectedCarData.Premium.promotion)}</td>
                      <td className="border border-gray-300 p-3 text-center text-red-600">{formatPrice(selectedCarData.Flagship.promotion)}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">3</td>
                      <td className="border border-gray-300 p-3 font-semibold">GIÁ HĐMB XHĐ</td>
                      <td className="border border-gray-300 p-3 text-center font-semibold">{formatPrice(selectedCarData.Standard.finalPrice)}</td>
                      <td className="border border-gray-300 p-3 text-center font-semibold">{formatPrice(selectedCarData.Premium.finalPrice)}</td>
                      <td className="border border-gray-300 p-3 text-center font-semibold">{formatPrice(selectedCarData.Flagship.finalPrice)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Registration Fees Table */}
              <div className="mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="border border-gray-300 p-3 text-left">STT</th>
                      <th className="border border-gray-300 p-3 text-left">CÁC KHOẢN CHI PHÍ ĐĂNG KÝ BIỂN SỐ</th>
                      <th className="border border-gray-300 p-3 text-center">STANDARD</th>
                      <th className="border border-gray-300 p-3 text-center">PREMIUM</th>
                      <th className="border border-gray-300 p-3 text-center">FLAGSHIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(["Standard", "Premium", "Flagship"] as CarVariant[]).map((variant, index) => {
                      const fees = calculateRegistrationFees(variant, selectedCarData[variant].basePrice);
                      return index === 0 ? (
                        <>
                          <tr key="tax">
                            <td className="border border-gray-300 p-2" rowSpan={7}>4</td>
                            <td className="border border-gray-300 p-2">THUẾ TRƯỚC BẠ (TẠM TÍNH 10%)</td>
                            <td className="border border-gray-300 p-2 text-center">{formatPrice(calculateRegistrationFees("Standard", selectedCarData.Standard.basePrice).registrationTax)}</td>
                            <td className="border border-gray-300 p-2 text-center">{formatPrice(calculateRegistrationFees("Premium", selectedCarData.Premium.basePrice).registrationTax)}</td>
                            <td className="border border-gray-300 p-2 text-center">{formatPrice(calculateRegistrationFees("Flagship", selectedCarData.Flagship.basePrice).registrationTax)}</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">PHÍ BIỂN SỐ</td>
                            <td className="border border-gray-300 p-2 text-center">1,000,000</td>
                            <td className="border border-gray-300 p-2 text-center">1,000,000</td>
                            <td className="border border-gray-300 p-2 text-center">1,000,000</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">PHÍ ĐĂNG KIỂM</td>
                            <td className="border border-gray-300 p-2 text-center">95,000</td>
                            <td className="border border-gray-300 p-2 text-center">150,000</td>
                            <td className="border border-gray-300 p-2 text-center">150,000</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">PHÍ ĐƯỜNG BỘ 12 THÁNG</td>
                            <td className="border border-gray-300 p-2 text-center">1,560,000</td>
                            <td className="border border-gray-300 p-2 text-center">1,560,000</td>
                            <td className="border border-gray-300 p-2 text-center">1,560,000</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">BẢO HIỂM TNDS</td>
                            <td className="border border-gray-300 p-2 text-center">550,000</td>
                            <td className="border border-gray-300 p-2 text-center">550,000</td>
                            <td className="border border-gray-300 p-2 text-center">550,000</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">PHÍ DỊCH VỤ ĐĂNG KÝ XE</td>
                            <td className="border border-gray-300 p-2 text-center">5,000,000</td>
                            <td className="border border-gray-300 p-2 text-center">5,000,000</td>
                            <td className="border border-gray-300 p-2 text-center">5,000,000</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2 font-semibold">TỔNG PHÍ ĐĂNG KÝ BIỂN SỐ</td>
                            <td className="border border-gray-300 p-2 text-center font-semibold">{formatPrice(calculateRegistrationFees("Standard", selectedCarData.Standard.basePrice).totalRegistration)}</td>
                            <td className="border border-gray-300 p-2 text-center font-semibold">{formatPrice(calculateRegistrationFees("Premium", selectedCarData.Premium.basePrice).totalRegistration)}</td>
                            <td className="border border-gray-300 p-2 text-center font-semibold">{formatPrice(calculateRegistrationFees("Flagship", selectedCarData.Flagship.basePrice).totalRegistration)}</td>
                          </tr>
                        </>
                      ) : null;
                    })}
                    <tr className="bg-blue-100">
                      <td className="border border-gray-300 p-3 font-bold" colSpan={2}>TỔNG GIÁ TRỊ XE LĂN BÁNH</td>
                      <td className="border border-gray-300 p-3 text-center font-bold text-blue-600 text-lg">
                        {formatPrice(selectedCarData.Standard.finalPrice + calculateRegistrationFees("Standard", selectedCarData.Standard.basePrice).totalRegistration)}
                      </td>
                      <td className="border border-gray-300 p-3 text-center font-bold text-blue-600 text-lg">
                        {formatPrice(selectedCarData.Premium.finalPrice + calculateRegistrationFees("Premium", selectedCarData.Premium.basePrice).totalRegistration)}
                      </td>
                      <td className="border border-gray-300 p-3 text-center font-bold text-blue-600 text-lg">
                        {formatPrice(selectedCarData.Flagship.finalPrice + calculateRegistrationFees("Flagship", selectedCarData.Flagship.basePrice).totalRegistration)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p>(*) Đặc biệt: Bảo hành chính hãng 05 năm hoặc 150.000km (tùy điều kiện nào đến trước)</p>
                <p className="text-center font-semibold">Trân trọng Cảm ơn Quý khách hàng đã quan tâm đến sản phẩm của Geely!</p>
              </div>

              <div className="text-center mt-6">
                <Button onClick={() => setShowQuote(false)} variant="outline" className="mr-4">
                  Quay lại
                </Button>
                <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700">
                  Đóng
                </Button>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PriceQuoteModal;
