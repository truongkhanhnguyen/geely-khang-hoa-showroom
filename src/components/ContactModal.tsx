import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ContactModal = ({
  isOpen,
  onClose
}: ContactModalProps) => {
  const {
    toast
  } = useToast();
  const {
    t
  } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Cả tên và số điện thoại đều là bắt buộc",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending email to trg.khanhnguyen@gmail.com
    console.log('Gửi thông tin liên hệ đến trg.khanhnguyen@gmail.com:', formData);
    toast({
      title: "Yêu cầu đã được gửi!",
      description: "Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất."
    });
    setFormData({
      name: "",
      phone: ""
    });
    onClose();
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            THÔNG TIN SHOWROOM GEELY NINH THUẬN
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Showroom Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Địa chỉ showroom:</h3>
                <p className="text-gray-600">99 Thống Nhất, Thành Hải
Thành Phố Phan Rang, Ninh Thuận</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Hotline:</h3>
                <p className="text-gray-600">0123 456 789</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Giờ làm việc:</h3>
                <p className="text-gray-600">Thứ 2 - Chủ nhật: 8:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">
              Để lại thông tin để được tư vấn miễn phí
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Họ và tên *
                </Label>
                <Input id="name" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} placeholder="Nhập họ và tên" className="mt-1" required />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Số điện thoại *
                </Label>
                <Input id="phone" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} placeholder="Nhập số điện thoại" className="mt-1" required />
              </div>
            </form>
          </div>

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Đóng
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Gửi thông tin
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default ContactModal;