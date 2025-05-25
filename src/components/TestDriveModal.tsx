
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from "lucide-react";
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
    email: "",
    car: selectedCar,
    date: "",
    time: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.car || !formData.date || !formData.time) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Các trường có dấu * là bắt buộc",
        variant: "destructive"
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Đặt lịch thành công!",
      description: `Chúng tôi sẽ liên hệ với bạn để xác nhận lịch lái thử ${formData.car} vào ${formData.date} lúc ${formData.time}.`
    });

    // Reset form and close modal
    setFormData({
      name: "",
      phone: "",
      email: "",
      car: "",
      date: "",
      time: "",
      notes: ""
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
                Họ và tên *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nhập họ và tên của bạn"
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

            <div>
              <Label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
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
              <Label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Ngày lái thử *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="mt-1"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <Label htmlFor="time" className="flex items-center text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 mr-2" />
                Giờ lái thử *
              </Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Chọn giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00">08:00</SelectItem>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
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
