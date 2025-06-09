
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, Calendar, TrendingUp, Info, CheckCircle } from 'lucide-react';

interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  monthlyIncome: number;
  debtToIncomeRatio: number;
}

const EnhancedLoanCalculator = () => {
  const [carPrice, setCarPrice] = useState(600000000); // 600 triệu VND mặc định
  const [downPayment, setDownPayment] = useState(120000000); // 20% mặc định
  const [loanTerm, setLoanTerm] = useState(60); // 5 năm mặc định
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% mặc định
  const [monthlyIncome, setMonthlyIncome] = useState(20000000); // 20 triệu mặc định
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

  const downPaymentPercentage = (downPayment / carPrice) * 100;
  const loanAmount = carPrice - downPayment;

  const interestRateOptions = [
    { value: 6.5, label: "6.5% - Khuyến mãi đặc biệt", color: "text-green-600" },
    { value: 7.5, label: "7.5% - Ưu đãi cho khách hàng VIP", color: "text-blue-600" },
    { value: 8.5, label: "8.5% - Lãi suất tiêu chuẩn", color: "text-gray-600" },
    { value: 9.5, label: "9.5% - Lãi suất thông thường", color: "text-orange-600" },
  ];

  const loanTermOptions = [
    { value: 12, label: "1 năm" },
    { value: 24, label: "2 năm" },
    { value: 36, label: "3 năm" },
    { value: 48, label: "4 năm" },
    { value: 60, label: "5 năm" },
    { value: 72, label: "6 năm" },
    { value: 84, label: "7 năm" },
  ];

  useEffect(() => {
    calculateLoan();
  }, [carPrice, downPayment, loanTerm, interestRate, monthlyIncome]);

  const calculateLoan = () => {
    if (loanAmount <= 0) return;

    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                          (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    const debtToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;

    setCalculation({
      monthlyPayment,
      totalPayment,
      totalInterest,
      monthlyIncome,
      debtToIncomeRatio
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const getAffordabilityStatus = () => {
    if (!calculation) return { status: 'unknown', message: '', color: 'gray' };
    
    if (calculation.debtToIncomeRatio <= 30) {
      return { 
        status: 'excellent', 
        message: 'Tuyệt vời! Khả năng chi trả rất tốt', 
        color: 'green' 
      };
    } else if (calculation.debtToIncomeRatio <= 40) {
      return { 
        status: 'good', 
        message: 'Tốt! Khả năng chi trả ổn định', 
        color: 'blue' 
      };
    } else if (calculation.debtToIncomeRatio <= 50) {
      return { 
        status: 'fair', 
        message: 'Chấp nhận được nhưng nên cân nhắc', 
        color: 'yellow' 
      };
    } else {
      return { 
        status: 'poor', 
        message: 'Khuyến nghị giảm khoản vay hoặc tăng thu nhập', 
        color: 'red' 
      };
    }
  };

  const affordability = getAffordabilityStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-900">
            <Calculator className="h-6 w-6" />
            Máy Tính Vay Xe Chuyên Nghiệp
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Miễn phí
            </Badge>
          </CardTitle>
          <p className="text-blue-700">
            Tính toán chính xác khả năng tài chính và lập kế hoạch mua xe thông minh
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thông tin khoản vay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Car Price */}
            <div>
              <Label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Giá xe
              </Label>
              <Input
                type="number"
                value={carPrice}
                onChange={(e) => setCarPrice(Number(e.target.value))}
                className="text-lg font-semibold"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(carPrice)}
              </p>
            </div>

            {/* Down Payment */}
            <div>
              <Label className="text-sm font-medium">
                Trả trước: {downPaymentPercentage.toFixed(1)}%
              </Label>
              <Slider
                value={[downPayment]}
                onValueChange={(value) => setDownPayment(value[0])}
                min={carPrice * 0.1}
                max={carPrice * 0.5}
                step={carPrice * 0.01}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10% ({formatCurrency(carPrice * 0.1)})</span>
                <span className="font-semibold">{formatCurrency(downPayment)}</span>
                <span>50% ({formatCurrency(carPrice * 0.5)})</span>
              </div>
            </div>

            {/* Loan Amount Display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm text-gray-600">Số tiền vay</Label>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(loanAmount)}
              </p>
            </div>

            {/* Interest Rate */}
            <div>
              <Label className="text-sm font-medium">Lãi suất (%/năm)</Label>
              <Select value={interestRate.toString()} onValueChange={(value) => setInterestRate(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {interestRateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      <span className={option.color}>{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Loan Term */}
            <div>
              <Label className="text-sm font-medium">Thời hạn vay</Label>
              <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {loanTermOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label} ({option.value} tháng)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Income */}
            <div>
              <Label className="text-sm font-medium">Thu nhập hàng tháng</Label>
              <Input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(monthlyIncome)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <div className="space-y-4">
          {/* Monthly Payment */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">Trả góp hàng tháng</p>
                  <p className="text-3xl font-bold text-green-900">
                    {calculation ? formatCurrency(calculation.monthlyPayment) : '---'}
                  </p>
                </div>
                <Calendar className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          {/* Affordability Check */}
          {calculation && (
            <Card className={`border-${affordability.color}-200 bg-${affordability.color}-50`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-8 w-8 text-${affordability.color}-600`} />
                  <div>
                    <p className={`text-sm font-medium text-${affordability.color}-700`}>
                      Khả năng chi trả
                    </p>
                    <p className={`text-lg font-semibold text-${affordability.color}-900`}>
                      {calculation.debtToIncomeRatio.toFixed(1)}% thu nhập
                    </p>
                    <p className={`text-xs text-${affordability.color}-600`}>
                      {affordability.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary */}
          {calculation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tổng quan khoản vay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tổng tiền trả</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(calculation.totalPayment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng lãi phải trả</p>
                    <p className="text-lg font-semibold text-orange-600">
                      {formatCurrency(calculation.totalInterest)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Giá xe:</span>
                      <span className="font-semibold">{formatCurrency(carPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trả trước:</span>
                      <span className="font-semibold text-green-600">
                        -{formatCurrency(downPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Tổng chi phí:</span>
                      <span className="font-bold text-lg">
                        {formatCurrency(downPayment + calculation.totalPayment)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-2">Lưu ý quan trọng:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Tỷ lệ nợ/thu nhập dưới 30% được coi là an toàn</li>
                    <li>• Lãi suất có thể thay đổi theo chính sách ngân hàng</li>
                    <li>• Cần có thêm các chi phí phụ: bảo hiểm, phí trước bạ, đăng ký...</li>
                    <li>• Kết quả chỉ mang tính chất tham khảo</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3">
            Liên hệ tư vấn chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLoanCalculator;
