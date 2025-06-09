
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceManagement from "./admin/PriceManagement";
import ImageManagement from "./admin/ImageManagement";
import PromotionsManagement from "./admin/PromotionsManagement";
import NewsManagement from "./admin/NewsManagement";
import CarDetailsManagement from "./admin/CarDetailsManagement";

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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="car-details">Chi Tiết Xe</TabsTrigger>
              <TabsTrigger value="prices">Quản Lý Giá Xe</TabsTrigger>
              <TabsTrigger value="images">Quản Lý Hình Ảnh</TabsTrigger>
              <TabsTrigger value="promotions">Quản Lý Khuyến Mãi</TabsTrigger>
              <TabsTrigger value="news">Quản Lý Tin Tức</TabsTrigger>
            </TabsList>

            <TabsContent value="car-details" className="space-y-6">
              <CarDetailsManagement />
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
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
