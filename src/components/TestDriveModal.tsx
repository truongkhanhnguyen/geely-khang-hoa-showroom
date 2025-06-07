
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: string;
}

const TestDriveModal = ({ isOpen, onClose, selectedCar }: TestDriveModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    car: selectedCar,
    variant: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.phone) {
      toast({
        title: "Vui lòng điền số điện thoại",
        description: "Số điện thoại là thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Đặt lịch thành công!",
      description: `Chúng tôi sẽ liên hệ với bạn để xác nhận lịch lái thử ${formData.car} ${formData.variant ? `phiên bản ${formData.variant}` : ''}.`
    });

    // Reset form and close modal
    setFormData({
      name: "",
      phone: "",
      car: "",
      variant: ""
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Set selected car when modal opens
  if (selectedCar && formData.car !== selectedCar) {
    setFormData(prev => ({ ...prev, car: selectedCar }));
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Đặt lịch lái thử
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Họ và tên
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nhập họ và tên của bạn"
                className="mt-1"
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

            <div>
              <Label className="flex items-center text-sm font-medium text-gray-700">
                Dòng xe
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
                Phiên bản
              </Label>
              <Select value={formData.variant} onValueChange={(value) => handleInputChange("variant", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Chọn phiên bản" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Flagship">Flagship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Đặt lịch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestDriveModal;
