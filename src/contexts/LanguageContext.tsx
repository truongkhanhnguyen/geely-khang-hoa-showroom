
import React, { createContext, useContext, useState } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    // Header
    products: "Sản phẩm",
    services: "Dịch vụ", 
    news: "Tin tức",
    contact: "Liên hệ",
    
    // Hero
    heroTitle: "Khám phá thế giới Geely",
    heroSubtitle: "Công nghệ tiên tiến. Thiết kế hiện đại. Trải nghiệm vượt trội.",
    exploreNow: "Khám phá ngay",
    
    // Cars
    outstandingCars: "Dòng xe nổi bật", 
    perfectChoice: "Lựa chọn hoàn hảo cho mọi nhu cầu và phong cách sống",
    scheduleTestDrive: "Đặt lịch lái thử",
    viewQuote: "Xem báo giá",
    features: "Tính năng nổi bật:",
    
    // Services
    professionalServices: "Dịch vụ chuyên nghiệp",
    testDriveTitle: "Đặt lịch lái thử",
    testDriveDesc: "Trải nghiệm thực tế các dòng xe Geely với lịch hẹn linh hoạt",
    priceQuoteTitle: "Báo giá lăn bánh", 
    priceQuoteDesc: "Nhận báo giá chi tiết và tư vấn các gói tài chính ưu đãi",
    scheduleNow: "Đặt lịch ngay",
    
    // News
    latestNews: "Tin tức mới nhất",
    newsSubtitle: "Cập nhật thông tin về Geely và ngành ô tô",
    
    // Contact
    contactUs: "Liên hệ với chúng tôi",
    showroom: "Showroom",
    hotline: "Hotline", 
    email: "Email",
    
    // Contact Form
    contactBack: "Yêu cầu liên hệ lại",
    contactBackDesc: "Để lại thông tin, chúng tôi sẽ liên hệ lại với bạn",
    fullName: "Họ và tên",
    phoneNumber: "Số điện thoại",
    submitContact: "Gửi yêu cầu",
    
    // Loan Calculator
    loanCalculator: "Tính toán vay trả góp",
    loanAmount: "Số tiền vay",
    loanTerm: "Thời hạn vay",
    interestRate: "Lãi suất",
    monthlyPayment: "Số tiền trả hàng tháng",
    
    // Footer
    allRightsReserved: "Tất cả quyền được bảo lưu."
  },
  en: {
    // Header
    products: "Products",
    services: "Services",
    news: "News", 
    contact: "Contact",
    
    // Hero
    heroTitle: "Discover the world of Geely",
    heroSubtitle: "Advanced technology. Modern design. Superior experience.",
    exploreNow: "Explore now",
    
    // Cars
    outstandingCars: "Outstanding vehicles",
    perfectChoice: "Perfect choice for all needs and lifestyles", 
    scheduleTestDrive: "Schedule test drive",
    viewQuote: "View quote",
    features: "Key features:",
    
    // Services
    professionalServices: "Professional services",
    testDriveTitle: "Schedule test drive",
    testDriveDesc: "Experience Geely vehicles with flexible appointments",
    priceQuoteTitle: "Price quote",
    priceQuoteDesc: "Get detailed quotes and financial package consultation",
    scheduleNow: "Schedule now",
    
    // News
    latestNews: "Latest news",
    newsSubtitle: "Stay updated with Geely and automotive industry",
    
    // Contact
    contactUs: "Contact us",
    showroom: "Showroom",
    hotline: "Hotline",
    email: "Email",
    
    // Contact Form
    contactBack: "Request callback",
    contactBackDesc: "Leave your info, we'll contact you back",
    fullName: "Full name",
    phoneNumber: "Phone number", 
    submitContact: "Submit request",
    
    // Loan Calculator
    loanCalculator: "Loan calculator",
    loanAmount: "Loan amount",
    loanTerm: "Loan term",
    interestRate: "Interest rate",
    monthlyPayment: "Monthly payment",
    
    // Footer
    allRightsReserved: "All rights reserved."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
