
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LoanCalculatorProps {
  carPrice?: number;
}

const LoanCalculator = ({ carPrice = 0 }: LoanCalculatorProps) => {
  const { t } = useLanguage();
  const [loanAmount, setLoanAmount] = useState(Math.round(carPrice * 0.8));
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [interestRate, setInterestRate] = useState(8.5); // %

  const calculateMonthlyPayment = () => {
    if (!loanAmount || !loanTerm || !interestRate) return 0;
    
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                          (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    return Math.round(monthlyPayment);
  };

  const monthlyPayment = calculateMonthlyPayment();

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Calculator className="w-6 h-6 mr-2 text-green-600" />
        {t('loanCalculator')}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
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
              Tối đa 80% giá trị xe: {formatPrice(Math.round(carPrice * 0.8))}
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
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('monthlyPayment')}</h4>
            <p className="text-3xl font-bold text-green-600 mb-4">
              {formatPrice(monthlyPayment)}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
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
