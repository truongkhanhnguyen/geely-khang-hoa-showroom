
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const ContactFooter = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <footer className="bg-white text-gray-900 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/53460547-efd5-41cc-9b2d-92f168c32983.png" 
                alt="Geely Logo" 
                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              />
              <span className="text-xl font-semibold text-gray-900">Geely Ninh Thuận</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Đại lý chính thức của Geely tại Ninh Thuận, mang đến những chiếc xe chất lượng cao với công nghệ tiên tiến và dịch vụ chuyên nghiệp.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('contactUs')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">
                    99 Thống Nhất, Thành Hải<br />
                    Thành Phố Phan Rang, Ninh Thuận
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600" />
                <a href="tel:0879890879" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  0879 89 0879
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500" />
                <a href="mailto:info@geelyninhthuan.vn" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  info@geelyninhthuan.vn
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Giờ làm việc</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div className="text-sm text-gray-600">
                  <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                  <p>Thứ 7 - Chủ nhật: 8:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Dịch vụ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Bán xe mới</li>
              <li>• Lái thử miễn phí</li>
              <li>• Bảo hành chính hãng</li>
              <li>• Bảo dưỡng định kỳ</li>
              <li>• Hỗ trợ vay vốn</li>
              <li>• Tư vấn bảo hiểm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 Geely Ninh Thuận. {t('allRightsReserved')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
