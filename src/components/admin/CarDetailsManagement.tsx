import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CarDetail {
  id: string;
  car_model: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  specifications: any;
  detailed_features: any[];
  gallery_images: string[];
  specifications_data: any[];
  detailed_features_data: any[];
  cta_section: any;
  priority: number;
  is_active: boolean;
}

const CarDetailsManagement = () => {
  const [cars, setCars] = useState<CarDetail[]>([]);
  const [editingCar, setEditingCar] = useState<CarDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('car_details')
        .select('*')
        .order('priority');

      if (error) throw error;
      
      const transformedData = data?.map((item: any) => ({
        id: item.id,
        car_model: item.car_model,
        name: item.name,
        tagline: item.tagline,
        description: item.description,
        features: item.features || [],
        specifications: item.specifications || {},
        detailed_features: Array.isArray(item.detailed_features) 
          ? item.detailed_features 
          : (typeof item.detailed_features === 'string' 
              ? JSON.parse(item.detailed_features) 
              : []),
        gallery_images: item.gallery_images || [],
        specifications_data: item.specifications_data || [],
        detailed_features_data: item.detailed_features_data || [],
        cta_section: item.cta_section || {
          title: "Sẵn sàng trải nghiệm?",
          description: "Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt",
          accent_color: "blue-600"
        },
        priority: item.priority || 1,
        is_active: item.is_active ?? true
      })) || [];
      
      setCars(transformedData);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách xe",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveCar = async (car: CarDetail) => {
    try {
      const { error } = await supabase
        .from('car_details')
        .update({
          name: car.name,
          tagline: car.tagline,
          description: car.description,
          features: car.features,
          specifications: car.specifications,
          detailed_features: car.detailed_features,
          gallery_images: car.gallery_images,
          specifications_data: car.specifications_data,
          detailed_features_data: car.detailed_features_data,
          cta_section: car.cta_section,
          priority: car.priority,
          is_active: car.is_active
        })
        .eq('id', car.id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin xe",
      });

      setEditingCar(null);
      fetchCars();
    } catch (error) {
      console.error('Error saving car:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu thông tin xe",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (!editingCar) return;
    setEditingCar({ ...editingCar, [field]: value });
  };

  const handleFeaturesChange = (features: string) => {
    if (!editingCar) return;
    const featuresArray = features.split('\n').filter(f => f.trim() !== '');
    setEditingCar({ ...editingCar, features: featuresArray });
  };

  const handleSpecificationsChange = (specs: string) => {
    if (!editingCar) return;
    try {
      const specsObject = JSON.parse(specs);
      setEditingCar({ ...editingCar, specifications: specsObject });
    } catch (error) {
      console.error('Invalid JSON for specifications');
    }
  };

  const handleDetailedFeaturesChange = (features: string) => {
    if (!editingCar) return;
    try {
      const featuresArray = JSON.parse(features);
      setEditingCar({ ...editingCar, detailed_features: featuresArray });
    } catch (error) {
      console.error('Invalid JSON for detailed features');
    }
  };

  const handleGalleryImagesChange = (images: string) => {
    if (!editingCar) return;
    const imagesArray = images.split('\n').filter(img => img.trim() !== '');
    setEditingCar({ ...editingCar, gallery_images: imagesArray });
  };

  const handleSpecificationsDataChange = (specs: string) => {
    if (!editingCar) return;
    try {
      const specsArray = JSON.parse(specs);
      setEditingCar({ ...editingCar, specifications_data: specsArray });
    } catch (error) {
      console.error('Invalid JSON for specifications data');
    }
  };

  const handleDetailedFeaturesDataChange = (features: string) => {
    if (!editingCar) return;
    try {
      const featuresArray = JSON.parse(features);
      setEditingCar({ ...editingCar, detailed_features_data: featuresArray });
    } catch (error) {
      console.error('Invalid JSON for detailed features data');
    }
  };

  const handleCTASectionChange = (cta: string) => {
    if (!editingCar) return;
    try {
      const ctaObject = JSON.parse(cta);
      setEditingCar({ ...editingCar, cta_section: ctaObject });
    } catch (error) {
      console.error('Invalid JSON for CTA section');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản Lý Chi Tiết Xe</h2>
          <p className="text-sm text-gray-600 mt-1">
            Chỉnh sửa toàn bộ thông tin chi tiết xe. Ảnh Hero được quản lý trong tab "Quản Lý Hình Ảnh"
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-3">
                {car.name}
                <Badge variant={car.is_active ? "default" : "secondary"}>
                  {car.is_active ? "Hoạt động" : "Tạm dừng"}
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingCar(car)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {editingCar?.id === car.id ? (
              <CardContent className="space-y-4">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="basic">Cơ bản</TabsTrigger>
                    <TabsTrigger value="specs">Thông số</TabsTrigger>
                    <TabsTrigger value="features">Tính năng</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="cta">CTA</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Tên xe</label>
                        <Input
                          value={editingCar.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Tagline</label>
                        <Input
                          value={editingCar.tagline}
                          onChange={(e) => handleInputChange('tagline', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Mô tả</label>
                      <Textarea
                        value={editingCar.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Thứ tự ưu tiên</label>
                        <Input
                          type="number"
                          value={editingCar.priority}
                          onChange={(e) => handleInputChange('priority', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editingCar.is_active}
                          onChange={(e) => handleInputChange('is_active', e.target.checked)}
                          className="rounded"
                        />
                        <label className="text-sm font-medium">Hiển thị trên website</label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Tính năng cơ bản (mỗi dòng một tính năng)</label>
                      <Textarea
                        value={editingCar.features.join('\n')}
                        onChange={(e) => handleFeaturesChange(e.target.value)}
                        rows={4}
                        placeholder="Động cơ 1.5L Turbo&#10;Hệ thống GKUI 19&#10;6 túi khí an toàn"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="specs" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Thông số kỹ thuật hiển thị (JSON)</label>
                      <Textarea
                        value={JSON.stringify(editingCar.specifications_data, null, 2)}
                        onChange={(e) => handleSpecificationsDataChange(e.target.value)}
                        rows={10}
                        placeholder='[{"icon": "Gauge", "label": "Động cơ", "value": "1.5L Turbo"}, {"icon": "Zap", "label": "Công suất", "value": "177 HP"}]'
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Icon có thể dùng: Gauge, Zap, Fuel, Shield, Cog, Eye, Calendar, Calculator
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Thông số kỹ thuật chi tiết (JSON)</label>
                      <Textarea
                        value={JSON.stringify(editingCar.specifications, null, 2)}
                        onChange={(e) => handleSpecificationsChange(e.target.value)}
                        rows={4}
                        placeholder='{"engine": "1.5L Turbo", "power": "177 HP"}'
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tính năng chi tiết hiển thị (JSON)</label>
                      <Textarea
                        value={JSON.stringify(editingCar.detailed_features_data, null, 2)}
                        onChange={(e) => handleDetailedFeaturesDataChange(e.target.value)}
                        rows={15}
                        placeholder='[{"id": "luxury", "title": "Nội thất cao cấp", "description": "Mô tả chi tiết...", "image": "URL ảnh"}]'
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Tính năng chi tiết cũ (JSON)</label>
                      <Textarea
                        value={JSON.stringify(editingCar.detailed_features, null, 2)}
                        onChange={(e) => handleDetailedFeaturesChange(e.target.value)}
                        rows={6}
                        placeholder='[{"id": "feature1", "title": "Tiêu đề", "description": "Mô tả", "image": "URL"}]'
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ảnh gallery (mỗi dòng một URL)</label>
                      <Textarea
                        value={editingCar.gallery_images.join('\n')}
                        onChange={(e) => handleGalleryImagesChange(e.target.value)}
                        rows={6}
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="cta" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Cấu hình CTA Section (JSON)</label>
                      <Textarea
                        value={JSON.stringify(editingCar.cta_section, null, 2)}
                        onChange={(e) => handleCTASectionChange(e.target.value)}
                        rows={6}
                        placeholder='{"title": "Sẵn sàng trải nghiệm?", "description": "Đặt lịch lái thử ngay...", "accent_color": "blue-600"}'
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => saveCar(editingCar)}>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu
                  </Button>
                  <Button variant="outline" onClick={() => setEditingCar(null)}>
                    <X className="h-4 w-4 mr-2" />
                    Hủy
                  </Button>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Tagline:</strong> {car.tagline}</p>
                  <p><strong>Mô tả:</strong> {car.description}</p>
                  <p><strong>Số tính năng:</strong> {car.features.length}</p>
                  <p><strong>Thông số hiển thị:</strong> {car.specifications_data?.length || 0}</p>
                  <p><strong>Tính năng chi tiết:</strong> {car.detailed_features_data?.length || 0}</p>
                  <p><strong>Thứ tự:</strong> {car.priority}</p>
                  <p className="text-blue-600"><strong>Ảnh Hero:</strong> Được quản lý qua tab "Quản Lý Hình Ảnh"</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarDetailsManagement;
