
import React, { createContext, useContext, useState } from 'react';

type Language = 'vi' | 'en' | 'ru' | 'zh';

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
    promotions: "Khuyến mãi",
    
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
    
    // Promotions
    currentPromotions: "Chương trình khuyến mãi hiện tại",
    promotionsSubtitle: "Những ưu đãi hấp dẫn dành cho khách hàng",
    
    // News
    latestNews: "Tin tức mới nhất",
    newsSubtitle: "Cập nhật thông tin về Geely và ngành ô tô",
    
    // Contact
    contactUs: "Liên hệ với chúng tôi",
    showroom: "Showroom",
    hotline: "Hotline", 
    email: "Email",
    address: "Địa chỉ",
    
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
    loanInsurance: "Bảo hiểm khoản vay",
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
    promotions: "Promotions",
    
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
    
    // Promotions
    currentPromotions: "Current Promotions",
    promotionsSubtitle: "Attractive offers for our customers",
    
    // News
    latestNews: "Latest news",
    newsSubtitle: "Stay updated with Geely and automotive industry",
    
    // Contact
    contactUs: "Contact us",
    showroom: "Showroom",
    hotline: "Hotline",
    email: "Email",
    address: "Address",
    
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
    loanInsurance: "Loan insurance",
    monthlyPayment: "Monthly payment",
    
    // Footer
    allRightsReserved: "All rights reserved."
  },
  ru: {
    // Header
    products: "Продукты",
    services: "Услуги",
    news: "Новости",
    contact: "Контакты",
    promotions: "Акции",
    
    // Hero
    heroTitle: "Откройте мир Geely",
    heroSubtitle: "Передовые технологии. Современный дизайн. Превосходный опыт.",
    exploreNow: "Исследовать сейчас",
    
    // Cars
    outstandingCars: "Выдающиеся автомобили",
    perfectChoice: "Идеальный выбор для любых потребностей и образа жизни",
    scheduleTestDrive: "Записаться на тест-драйв",
    viewQuote: "Посмотреть цену",
    features: "Ключевые особенности:",
    
    // Services
    professionalServices: "Профессиональные услуги",
    testDriveTitle: "Записаться на тест-драйв",
    testDriveDesc: "Испытайте автомобили Geely с гибким расписанием",
    priceQuoteTitle: "Расчет цены",
    priceQuoteDesc: "Получите подробные расчеты и консультации по финансовым пакетам",
    scheduleNow: "Записаться сейчас",
    
    // Promotions
    currentPromotions: "Текущие акции",
    promotionsSubtitle: "Привлекательные предложения для наших клиентов",
    
    // News
    latestNews: "Последние новости",
    newsSubtitle: "Будьте в курсе Geely и автомобильной индустрии",
    
    // Contact
    contactUs: "Свяжитесь с нами",
    showroom: "Шоурум",
    hotline: "Горячая линия",
    email: "Электронная почта",
    address: "Адрес",
    
    // Contact Form
    contactBack: "Запросить обратный звонок",
    contactBackDesc: "Оставьте информацию, мы свяжемся с вами",
    fullName: "Полное имя",
    phoneNumber: "Номер телефона",
    submitContact: "Отправить запрос",
    
    // Loan Calculator
    loanCalculator: "Кредитный калькулятор",
    loanAmount: "Сумма кредита",
    loanTerm: "Срок кредита",
    interestRate: "Процентная ставка",
    loanInsurance: "Страхование кредита",
    monthlyPayment: "Ежемесячный платеж",
    
    // Footer
    allRightsReserved: "Все права защищены."
  },
  zh: {
    // Header
    products: "产品",
    services: "服务",
    news: "新闻",
    contact: "联系",
    promotions: "促销",
    
    // Hero
    heroTitle: "探索吉利世界",
    heroSubtitle: "先进技术。现代设计。卓越体验。",
    exploreNow: "立即探索",
    
    // Cars
    outstandingCars: "杰出车型",
    perfectChoice: "适合所有需求和生活方式的完美选择",
    scheduleTestDrive: "预约试驾",
    viewQuote: "查看报价",
    features: "主要特点：",
    
    // Services
    professionalServices: "专业服务",
    testDriveTitle: "预约试驾",
    testDriveDesc: "灵活预约体验吉利汽车",
    priceQuoteTitle: "价格报价",
    priceQuoteDesc: "获得详细报价和金融方案咨询",
    scheduleNow: "立即预约",
    
    // Promotions
    currentPromotions: "当前促销",
    promotionsSubtitle: "为客户提供的优惠活动",
    
    // News
    latestNews: "最新消息",
    newsSubtitle: "了解吉利和汽车行业的最新信息",
    
    // Contact
    contactUs: "联系我们",
    showroom: "展厅",
    hotline: "热线",
    email: "邮箱",
    address: "地址",
    
    // Contact Form
    contactBack: "请求回电",
    contactBackDesc: "留下信息，我们会联系您",
    fullName: "全名",
    phoneNumber: "电话号码",
    submitContact: "提交请求",
    
    // Loan Calculator
    loanCalculator: "贷款计算器",
    loanAmount: "贷款金额",
    loanTerm: "贷款期限",
    interestRate: "利率",
    loanInsurance: "贷款保险",
    monthlyPayment: "月付金额",
    
    // Footer
    allRightsReserved: "版权所有。"
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
