
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface PriceQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar?: string;
}

type CarModel = "Geely Coolray" | "Geely Monjaro" | "Geely EX5";
type CarVariant = "Standard" | "Premium" | "Flagship";

const PriceQuoteModal = ({ isOpen, onClose, selectedCar }: PriceQuoteModalProps) => {
  const [showQuote, setShowQuote] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
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

  const variants: CarVariant[] = ["Standard", "Premium", "Flagship"];

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
  const currentVariant = variants[selectedVariantIndex];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-200/50">
        <DialogHeader className="border-b border-gray-200/50 pb-6">
          <DialogTitle className="text-center text-2xl md:text-3xl font-light text-gray-900 mb-2">
            BÁO GIÁ XE <span className="font-semibold text-blue-600">GEELY</span>
          </DialogTitle>
          <div className="text-center space-y-1">
            <p className="text-sm text-gray-600 font-medium">CHI NHÁNH NINH THUẬN</p>
            <p className="text-xs text-gray-500">99 Thống Nhất, Thành Hải, Thành phố Phan Rang, Tỉnh Ninh Thuận</p>
            <p className="text-sm font-semibold text-gray-900">HOTLINE: 0879890879</p>
          </div>
        </DialogHeader>

        {!showQuote ? (
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-light text-gray-900 mb-2">Thông tin yêu cầu báo giá</h3>
              <p className="text-gray-600">Vui lòng điền thông tin để nhận báo giá chi tiết</p>
            </div>

            <div className="space-y-6 max-w-md mx-auto">
              <div>
                <Label htmlFor="carModel" className="text-gray-700 font-medium">Dòng xe quan tâm *</Label>
                <Select 
                  value={formData.carModel} 
                  onValueChange={(value) => setFormData({...formData, carModel: value})}
                >
                  <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600">
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
                <Label htmlFor="name" className="text-gray-700 font-medium">Họ và tên *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nhập họ và tên"
                  className="mt-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">Số điện thoại *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Nhập số điện thoại"
                  className="mt-2 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full max-w-md mx-auto block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-md transition-all duration-300">
              Gửi yêu cầu báo giá
            </Button>
          </form>
        ) : (
          selectedCarData && (
            <div className="p-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
                  <span className="font-semibold text-blue-600">{formData.carModel.toUpperCase()}</span>
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
              </div>

              {/* Mobile View with Slider */}
              <div className="md:hidden mb-8">
                <div className="mb-6">
                  <Label className="text-base font-semibold text-gray-900 block mb-3">
                    Chọn phiên bản: <span className="text-blue-600">{currentVariant}</span>
                  </Label>
                  <Slider
                    value={[selectedVariantIndex]}
                    onValueChange={(value) => setSelectedVariantIndex(value[0])}
                    max={2}
                    step={1}
                    className="mt-3"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Standard</span>
                    <span>Premium</span>
                    <span>Flagship</span>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-lg">
                  <h4 className="text-lg font-semibold text-center mb-6 text-gray-900">{currentVariant}</h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-2">
                      <span className="font-medium text-gray-700">Giá bán niêm yết:</span>
                      <span className="font-semibold text-gray-900">{formatPrice(selectedCarData[currentVariant].basePrice)}</span>
                    </div>
                    <div className="flex justify-between py-2 text-red-600">
                      <span className="font-medium">CSKM tháng 05.2025:</span>
                      <span className="font-semibold">-{formatPrice(selectedCarData[currentVariant].promotion)}</span>
                    </div>
                    <div className="flex justify-between py-3 font-bold border-t border-gray-200 text-lg">
                      <span className="text-gray-900">Giá HĐMB:</span>
                      <span className="text-blue-600">{formatPrice(selectedCarData[currentVariant].finalPrice)}</span>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h5 className="font-semibold mb-4 text-gray-900">Chi phí đăng ký biển số:</h5>
                      {(() => {
                        const fees = calculateRegistrationFees(currentVariant, selectedCarData[currentVariant].basePrice);
                        return (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Thuế trước bạ (10%):</span>
                              <span className="text-gray-900">{formatPrice(fees.registrationTax)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Phí biển số:</span>
                              <span className="text-gray-900">1,000,000</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Phí đăng kiểm:</span>
                              <span className="text-gray-900">{formatPrice(fees.inspection)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Phí đường bộ 12 tháng:</span>
                              <span className="text-gray-900">1,560,000</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Bảo hiểm TNDS:</span>
                              <span className="text-gray-900">550,000</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Phí dịch vụ đăng ký xe:</span>
                              <span className="text-gray-900">5,000,000</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t border-gray-200 pt-3 mt-3">
                              <span className="text-gray-900">Tổng phí đăng ký:</span>
                              <span className="text-gray-900">{formatPrice(fees.totalRegistration)}</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg mt-6">
                      <div className="flex justify-between font-bold text-blue-600 text-lg">
                        <span>TỔNG GIÁ LĂN BÁNH:</span>
                        <span>{formatPrice(selectedCarData[currentVariant].finalPrice + calculateRegistrationFees(currentVariant, selectedCarData[currentVariant].basePrice).totalRegistration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop View - Full Table */}
              <div className="hidden md:block">
                {/* Main Price Table */}
                <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <th className="border border-gray-300 p-4 text-left font-medium">STT</th>
                        <th className="border border-gray-300 p-4 text-left font-medium">CÁC KHOẢN CHI PHÍ</th>
                        <th className="border border-gray-300 p-4 text-center font-medium">STANDARD</th>
                        <th className="border border-gray-300 p-4 text-center font-medium">PREMIUM</th>
                        <th className="border border-gray-300 p-4 text-center font-medium">FLAGSHIP</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-300 p-4 text-gray-700">1</td>
                        <td className="border border-gray-300 p-4 font-semibold text-gray-900">GIÁ BÁN NIÊM YẾT</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-900">{formatPrice(selectedCarData.Standard.basePrice)}</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-900">{formatPrice(selectedCarData.Premium.basePrice)}</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-900">{formatPrice(selectedCarData.Flagship.basePrice)}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-300 p-4 text-gray-700">2</td>
                        <td className="border border-gray-300 p-4 font-semibold text-gray-900">CSKM THÁNG 05.2025</td>
                        <td className="border border-gray-300 p-4 text-center text-red-600 font-semibold">{formatPrice(selectedCarData.Standard.promotion)}</td>
                        <td className="border border-gray-300 p-4 text-center text-red-600 font-semibold">{formatPrice(selectedCarData.Premium.promotion)}</td>
                        <td className="border border-gray-300 p-4 text-center text-red-600 font-semibold">{formatPrice(selectedCarData.Flagship.promotion)}</td>
                      </tr>
                      <tr className="bg-blue-50 hover:bg-blue-100 transition-colors">
                        <td className="border border-gray-300 p-4 text-gray-700">3</td>
                        <td className="border border-gray-300 p-4 font-semibold text-gray-900">GIÁ HĐMB XHĐ</td>
                        <td className="border border-gray-300 p-4 text-center font-bold text-blue-600">{formatPrice(selectedCarData.Standard.finalPrice)}</td>
                        <td className="border border-gray-300 p-4 text-center font-bold text-blue-600">{formatPrice(selectedCarData.Premium.finalPrice)}</td>
                        <td className="border border-gray-300 p-4 text-center font-bold text-blue-600">{formatPrice(selectedCarData.Flagship.finalPrice)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Registration Fees Table */}
                <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <th className="border border-gray-300 p-4 text-left font-medium">STT</th>
                        <th className="border border-gray-300 p-4 text-left font-medium">CÁC KHOẢN CHI PHÍ ĐĂNG KÝ BIỂN SỐ</th>
                        <th className="border border-gray-300 p-4 text-center font-medium">STANDARD</th>
                        <th className="border border-gray-300 p-4 text-center font-medium">PREMIUM</th>
                        <th className="border border-gray-300 p-4 text-center font-medium">FLAGSHIP</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {(["Standard", "Premium", "Flagship"] as CarVariant[]).map((variant, index) => {
                        const fees = calculateRegistrationFees(variant, selectedCarData[variant].basePrice);
                        return index === 0 ? (
                          <>
                            <tr key="tax" className="hover:bg-gray-50 transition-colors">
                              <td className="border border-gray-300 p-3" rowSpan={7}>4</td>
                              <td className="border border-gray-300 p-3 text-gray-900">THUẾ TRƯỚC BẠ (TẠM TÍNH 10%)</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">{formatPrice(calculateRegistrationFees("Standard", selectedCarData.Standard.basePrice).registrationTax)}</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">{formatPrice(calculateRegistrationFees("Premium", selectedCarData.Premium.basePrice).registrationTax)}</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">{formatPrice(calculateRegistrationFees("Flagship", selectedCarData.Flagship.basePrice).registrationTax)}</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="border border-gray-300 p-3 text-gray-900">PHÍ BIỂN SỐ</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">1,000,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">1,000,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">1,000,000</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="border border-gray-300 p-3 text-gray-900">PHÍ ĐĂNG KIỂM</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">95,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">150,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">150,000</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="border border-gray-300 p-3 text-gray-900">PHÍ ĐƯỜNG BỘ 12 THÁNG</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">1,560,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">1,560,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">1,560,000</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="border border-gray-300 p-3 text-gray-900">BẢO HIỂM TNDS</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">550,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">550,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">550,000</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="border border-gray-300 p-3 text-gray-900">PHÍ DỊCH VỤ ĐĂNG KÝ XE</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">5,000,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">5,000,000</td>
                              <td className="border border-gray-300 p-3 text-center text-gray-900">5,000,000</td>
                            </tr>
                            <tr className="bg-gray-100 hover:bg-gray-200 transition-colors">
                              <td className="border border-gray-300 p-3 font-semibold text-gray-900">TỔNG PHÍ ĐĂNG KÝ BIỂN SỐ</td>
                              <td className="border border-gray-300 p-3 text-center font-semibold text-gray-900">{formatPrice(calculateRegistrationFees("Standard", selectedCarData.Standard.basePrice).totalRegistration)}</td>
                              <td className="border border-gray-300 p-3 text-center font-semibold text-gray-900">{formatPrice(calculateRegistrationFees("Premium", selectedCarData.Premium.basePrice).totalRegistration)}</td>
                              <td className="border border-gray-300 p-3 text-center font-semibold text-gray-900">{formatPrice(calculateRegistrationFees("Flagship", selectedCarData.Flagship.basePrice).totalRegistration)}</td>
                            </tr>
                          </>
                        ) : null;
                      })}
                      <tr className="bg-gradient-to-r from-blue-100 to-indigo-100">
                        <td className="border border-gray-300 p-4 font-bold text-gray-900" colSpan={2}>TỔNG GIÁ TRỊ XE LĂN BÁNH</td>
                        <td className="border border-gray-300 p-4 text-center font-bold text-blue-600 text-lg">
                          {formatPrice(selectedCarData.Standard.finalPrice + calculateRegistrationFees("Standard", selectedCarData.Standard.basePrice).totalRegistration)}
                        </td>
                        <td className="border border-gray-300 p-4 text-center font-bold text-blue-600 text-lg">
                          {formatPrice(selectedCarData.Premium.finalPrice + calculateRegistrationFees("Premium", selectedCarData.Premium.basePrice).totalRegistration)}
                        </td>
                        <td className="border border-gray-300 p-4 text-center font-bold text-blue-600 text-lg">
                          {formatPrice(selectedCarData.Flagship.finalPrice + calculateRegistrationFees("Flagship", selectedCarData.Flagship.basePrice).totalRegistration)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-2 mb-8 bg-gray-50 p-4 rounded-lg">
                <p className="text-center">(*) Đặc biệt: Bảo hành chính hãng 05 năm hoặc 150.000km (tùy điều kiện nào đến trước)</p>
                <p className="text-center font-semibold text-gray-900">Trân trọng Cảm ơn Quý khách hàng đã quan tâm đến sản phẩm của Geely!</p>
              </div>

              <div className="text-center space-x-4">
                <Button 
                  onClick={() => setShowQuote(false)} 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
                >
                  Quay lại
                </Button>
                <Button 
                  onClick={handleClose} 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2"
                >
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
