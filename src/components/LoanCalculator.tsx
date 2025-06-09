
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface LoanCalculatorProps {
  carPrice?: number;
}

const LoanCalculator = ({ carPrice = 0 }: LoanCalculatorProps) => {
  const { t } = useLanguage();
  
  const carPrices = {
    "Geely Coolray": 699000000,
    "Geely Monjaro": 1469000000,
    "Geely EX5": 769000000
  };
  
  const [selectedCar, setSelectedCar] = useState("Geely Coolray");
  const [loanAmount, setLoanAmount] = useState(Math.round(carPrices["Geely Coolray"] * 0.8));
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [interestRate, setInterestRate] = useState(8.5); // %
  const [loanInsurance, setLoanInsurance] = useState(0); // %
  const [isPriceAvailable, setIsPriceAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkPriceAvailability();
  }, [selectedCar]);

  const checkPriceAvailability = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('car_prices')
        .select('price_available')
        .eq('car_model', selectedCar);

      if (error) throw error;

      // If any variant has price available, show the calculator
      const hasAvailablePrice = data?.some(item => item.price_available) ?? true;
      setIsPriceAvailable(hasAvailablePrice);
      
      console.log(`Price availability for ${selectedCar}:`, hasAvailablePrice);
    } catch (error) {
      console.error('Error checking price availability:', error);
      // Default to showing calculator if there's an error
      setIsPriceAvailable(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCarChange = (carName: string) => {
    setSelectedCar(carName);
    const newCarPrice = carPrices[carName as keyof typeof carPrices];
    setLoanAmount(Math.round(newCarPrice * 0.8));
  };

  const calculateMonthlyPayment = () => {
    if (!loanAmount || !loanTerm || !interestRate) return 0;
    
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                          (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    // Thêm bảo hiểm khoản vay
    const insuranceCost = (loanAmount * loanInsurance / 100) / loanTerm;
    
    return Math.round(monthlyPayment + insuranceCost);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const currentCarPrice = carPrices[selectedCar as keyof typeof carPrices];

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!isPriceAvailable) {
    return (
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Calculator className="w-6 h-6 mr-2 text-orange-600" />
          {t('loanCalculator')}
        </h3>
        
        <div className="text-center py-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-200">
            <h4 className="text-lg font-semibold text-orange-800 mb-4">
              Thông tin tính toán vay sẽ sớm được cập nhật
            </h4>
            <p className="text-gray-600 mb-4">
              Hiện tại thông tin giá xe {selectedCar} chưa được công bố. 
              Chúng tôi sẽ cập nhật công cụ tính toán vay trả góp ngay khi có thông tin chính thức.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => window.location.href = 'tel:0123456789'}
              >
                Liên hệ tư vấn
              </Button>
              <Button 
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-50"
                onClick={() => window.location.href = 'mailto:contact@geelyninhthuan.com'}
              >
                Gửi email
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Calculator className="w-6 h-6 mr-2 text-green-600" />
        {t('loanCalculator')}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Chọn dòng xe</Label>
            <Select value={selectedCar} onValueChange={handleCarChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Geely Coolray">Geely Coolray</SelectItem>
                <SelectItem value="Geely Monjaro">Geely Monjaro</SelectItem>
                <SelectItem value="Geely EX5">Geely EX5</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              Giá xe: {formatPrice(currentCarPrice)}
            </p>
          </div>

          <div>
            <Label htmlFor="loanAmount">{t('loanAmount')}</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              placeholder="Số tiền vay"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Tối đa 80% giá trị xe: {formatPrice(Math.round(currentCarPrice * 0.8))}
            </p>
          </div>

          <div>
            <Label>{t('loanTerm')}</Label>
            <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 tháng</SelectItem>
                <SelectItem value="24">24 tháng</SelectItem>
                <SelectItem value="36">36 tháng</SelectItem>
                <SelectItem value="48">48 tháng</SelectItem>
                <SelectItem value="60">60 tháng</SelectItem>
                <SelectItem value="72">72 tháng</SelectItem>
                <SelectItem value="84">84 tháng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="interestRate">{t('interestRate')} (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              placeholder="Lãi suất"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="loanInsurance">{t('loanInsurance')} (%)</Label>
            <Input
              id="loanInsurance"
              type="number"
              step="0.1"
              value={loanInsurance}
              onChange={(e) => setLoanInsurance(Number(e.target.value))}
              placeholder="Bảo hiểm khoản vay"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Mặc định 0%, có thể điều chỉnh theo yêu cầu
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('monthlyPayment')}</h4>
            <p className="text-3xl font-bold text-green-600 mb-4">
              {formatPrice(monthlyPayment)}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Dòng xe:</span>
                <span>{selectedCar}</span>
              </div>
              <div className="flex justify-between">
                <span>Số tiền vay:</span>
                <span>{formatPrice(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Thời hạn:</span>
                <span>{loanTerm} tháng</span>
              </div>
              <div className="flex justify-between">
                <span>Lãi suất:</span>
                <span>{interestRate}%/năm</span>
              </div>
              <div className="flex justify-between">
                <span>Bảo hiểm:</span>
                <span>{loanInsurance}%</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Tổng thanh toán:</span>
                <span>{formatPrice(monthlyPayment * loanTerm)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        * Đây chỉ là tính toán ước tính. Lãi suất và điều kiện vay thực tế có thể khác.
      </p>
    </Card>
  );
};

export default LoanCalculator;
