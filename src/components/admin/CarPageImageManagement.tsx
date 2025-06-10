
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CarPageImage {
  id: string;
  car_model: string;
  image_id: string;
  display_section: string;
  display_order: number;
  is_active: boolean;
  website_images: {
    id: string;
    name: string;
    url: string;
    category: string;
  };
}

interface WebsiteImage {
  id: string;
  name: string;
  url: string;
  category: string;
}

const CarPageImageManagement = () => {
  const [carPageImages, setCarPageImages] = useState<CarPageImage[]>([]);
  const [availableImages, setAvailableImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCarModel, setSelectedCarModel] = useState<string>('coolray');
  const [selectedImageId, setSelectedImageId] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('hero');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const { toast } = useToast();

  useEffect(() => {
    fetchCarPageImages();
    fetchAvailableImages();
  }, [selectedCarModel]);

  const fetchCarPageImages = async () => {
    try {
      const { data, error } = await supabase
        .from('car_page_images')
        .select(`
          *,
          website_images:image_id (
            id,
            name,
            url,
            category
          )
        `)
        .eq('car_model', selectedCarModel)
        .order('display_section')
        .order('display_order');

      if (error) throw error;
      setCarPageImages(data || []);
    } catch (error) {
      console.error('Error fetching car page images:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách ảnh xe",
        variant: "destructive",
      });
    }
  };

  const fetchAvailableImages = async () => {
    try {
      const { data, error } = await supabase
        .from('website_images')
        .select('id, name, url, category')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAvailableImages(data || []);
    } catch (error) {
      console.error('Error fetching available images:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCarPageImage = async () => {
    if (!selectedImageId || !selectedSection) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ảnh và vị trí hiển thị",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('car_page_images')
        .insert({
          car_model: selectedCarModel,
          image_id: selectedImageId,
          display_section: selectedSection,
          display_order: displayOrder,
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã thêm ảnh vào trang xe",
      });

      setSelectedImageId('');
      setDisplayOrder(1);
      fetchCarPageImages();
    } catch (error) {
      console.error('Error adding car page image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm ảnh vào trang xe",
        variant: "destructive",
      });
    }
  };

  const toggleImageStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('car_page_images')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: `Đã ${!currentStatus ? 'kích hoạt' : 'tắt'} ảnh`,
      });

      fetchCarPageImages();
    } catch (error) {
      console.error('Error toggling image status:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái ảnh",
        variant: "destructive",
      });
    }
  };

  const deleteCarPageImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('car_page_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã xóa ảnh khỏi trang xe",
      });

      fetchCarPageImages();
    } catch (error) {
      console.error('Error deleting car page image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa ảnh khỏi trang xe",
        variant: "destructive",
      });
    }
  };

  const groupedImages = carPageImages.reduce((acc, image) => {
    if (!acc[image.display_section]) {
      acc[image.display_section] = [];
    }
    acc[image.display_section].push(image);
    return acc;
  }, {} as Record<string, CarPageImage[]>);

  if (loading) {
    return <div className="p-4">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản Lý Ảnh Trang Chi Tiết Xe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Car Model Selection */}
          <div>
            <Label htmlFor="car-model">Dòng xe</Label>
            <Select value={selectedCarModel} onValueChange={setSelectedCarModel}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn dòng xe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coolray">Coolray</SelectItem>
                <SelectItem value="monjaro">Monjaro</SelectItem>
                <SelectItem value="ex5">EX5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add New Image Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor="image-select">Chọn ảnh</Label>
              <Select value={selectedImageId} onValueChange={setSelectedImageId}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ảnh" />
                </SelectTrigger>
                <SelectContent>
                  {availableImages.map((image) => (
                    <SelectItem key={image.id} value={image.id}>
                      {image.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="section-select">Vị trí hiển thị</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vị trí" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Carousel</SelectItem>
                  <SelectItem value="gallery">Gallery</SelectItem>
                  <SelectItem value="features">Features</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="order">Thứ tự</Label>
              <Input
                id="order"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                min="1"
              />
            </div>

            <div className="flex items-end">
              <Button onClick={addCarPageImage} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Thêm ảnh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display grouped images */}
      {Object.entries(groupedImages).map(([section, images]) => (
        <Card key={section}>
          <CardHeader>
            <CardTitle className="capitalize">
              {section === 'hero' ? 'Hero Carousel' : 
               section === 'gallery' ? 'Gallery' : 'Features'} - {selectedCarModel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images
                .sort((a, b) => a.display_order - b.display_order)
                .map((carPageImage) => (
                  <div key={carPageImage.id} className="border rounded-lg p-4 space-y-2">
                    <img
                      src={carPageImage.website_images.url}
                      alt={carPageImage.website_images.name}
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="text-sm font-medium">{carPageImage.website_images.name}</p>
                    <p className="text-xs text-gray-500">Thứ tự: {carPageImage.display_order}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={carPageImage.is_active ? "default" : "secondary"}
                        onClick={() => toggleImageStatus(carPageImage.id, carPageImage.is_active)}
                      >
                        {carPageImage.is_active ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteCarPageImage(carPageImage.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarPageImageManagement;
