
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import PriceManagement from "./admin/PriceManagement";
import ImageManagement from "./admin/ImageManagement";
import PromotionsManagement from "./admin/PromotionsManagement";
import NewsManagement from "./admin/NewsManagement";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-2xl font-bold text-blue-600">
            Quản Lý Admin - Geely Ninh Thuận
          </DialogTitle>
          <Button
            variant="outline"
            size="icon"
            className="absolute -top-2 -right-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6">
          <Tabs defaultValue="prices" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="prices">Quản Lý Giá Xe</TabsTrigger>
              <TabsTrigger value="images">Quản Lý Hình Ảnh</TabsTrigger>
              <TabsTrigger value="promotions">Quản Lý Khuyến Mãi</TabsTrigger>
              <TabsTrigger value="news">Quản Lý Tin Tức</TabsTrigger>
            </TabsList>

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
