
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceManagement from "./admin/PriceManagement";
import ImageManagement from "./admin/ImageManagement";
import PromotionsManagement from "./admin/PromotionsManagement";
import NewsManagement from "./admin/NewsManagement";
import CarDetailsManagement from "./admin/CarDetailsManagement";
import HeroLogoManagement from "./admin/HeroLogoManagement";
import SEOManagement from "./admin/SEOManagement";
import CarPageImageManagement from "./admin/CarPageImageManagement";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-600">
            Quản Lý Admin - Geely Ninh Thuận
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Tabs defaultValue="car-details" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
              <TabsTrigger value="car-details" className="text-xs md:text-sm">Chi Tiết Xe</TabsTrigger>
              <TabsTrigger value="car-images" className="text-xs md:text-sm">Ảnh Xe</TabsTrigger>
              <TabsTrigger value="prices" className="text-xs md:text-sm">Giá Xe</TabsTrigger>
              <TabsTrigger value="images" className="text-xs md:text-sm">Hình Ảnh</TabsTrigger>
              <TabsTrigger value="promotions" className="text-xs md:text-sm">Khuyến Mãi</TabsTrigger>
              <TabsTrigger value="news" className="text-xs md:text-sm">Tin Tức</TabsTrigger>
              <TabsTrigger value="hero-logos" className="text-xs md:text-sm">Logo</TabsTrigger>
              <TabsTrigger value="seo" className="text-xs md:text-sm">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="car-details" className="space-y-6">
              <CarDetailsManagement />
            </TabsContent>

            <TabsContent value="car-images" className="space-y-6">
              <CarPageImageManagement />
            </TabsContent>

            <TabsContent value="prices" className="space-y-6">
              <PriceManagement />
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <ImageManagement />
            </TabsContent>

            <TabsContent value="promotions" className="space-y-6">
              <PromotionsManagement />
            </TabsContent>

            <TabsContent value="news" className="space-y-6">
              <NewsManagement />
            </TabsContent>

            <TabsContent value="hero-logos" className="space-y-6">
              <HeroLogoManagement />
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <SEOManagement />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
