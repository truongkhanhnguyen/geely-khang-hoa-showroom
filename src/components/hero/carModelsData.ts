
import { CarModelMapping } from './types';

export const carModelsMapping: Record<string, CarModelMapping> = {
  "coolray": {
    name: "Geely Coolray",
    tagline: "Urban. Dynamic. Smart.",
    description: "SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.",
    features: ["Động cơ 1.5L Turbo", "Hệ thống GKUI 19", "6 túi khí an toàn", "Phanh ABS + EBD"],
    priority: 1
  },
  "monjaro": {
    name: "Geely Monjaro", 
    tagline: "Premium. Powerful. Refined.",
    description: "SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.",
    features: ["Động cơ 2.0L Turbo", "Hệ thống giải trí 12.3''", "Cruise Control thích ứng", "Cửa sổ trời toàn cảnh"],
    priority: 2
  },
  "ex5": {
    name: "Geely EX5",
    tagline: "Electric. Efficient. Future.", 
    description: "SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.",
    features: ["100% động cơ điện", "Phạm vi 400km", "Sạc nhanh 30 phút", "Hệ thống tự lái L2"],
    priority: 3
  }
};
