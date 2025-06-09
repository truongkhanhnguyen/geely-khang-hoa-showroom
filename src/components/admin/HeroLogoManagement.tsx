
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeroLogo {
  id: string;
  name: string;
  url: string;
  car_model: string;
  file_name?: string;
}

const HeroLogoManagement = () => {
  const [logos, setLogos] = useState<HeroLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState<string | null>(null);
  const { toast } = useToast();

  const carModels = [
    { key: 'coolray', name: 'Geely Coolray' },
    { key: 'monjaro', name: 'Geely Monjaro' },
    { key: 'ex5', name: 'Geely EX5' }
  ];

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const { data, error } = await supabase
        .from('website_images')
        .select('*')
        .eq('category', 'hero-logo')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const logoData = data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        url: item.url,
        car_model: item.description || '',
        file_name: item.file_name
      })) || [];

      setLogos(logoData);
    } catch (error) {
      console.error('Error fetching logos:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách logo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File, carModel: string) => {
    if (!file) return;

    setUploadingLogo(carModel);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to a file hosting service or handle locally
      // For now, we'll create a local URL and save the file info
      const imageUrl = URL.createObjectURL(file);

      // Save logo info to database
      const { error } = await supabase
        .from('website_images')
        .insert({
          name: `${carModel.charAt(0).toUpperCase() + carModel.slice(1)} Logo`,
          description: carModel,
          category: 'hero-logo',
          url: imageUrl,
          file_name: file.name,
          file_size: file.size,
          recommended_size: '400x100px'
        });

      if (error) throw error;

      toast({
        title: "Thành công",
        description: `Đã upload logo cho ${carModel}`,
      });

      fetchLogos();
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Lỗi",
        description: "Không thể upload logo",
        variant: "destructive",
      });
    } finally {
      setUploadingLogo(null);
    }
  };

  const deleteLogo = async (logoId: string) => {
    try {
      const { error } = await supabase
        .from('website_images')
        .delete()
        .eq('id', logoId);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã xóa logo",
      });

      fetchLogos();
    } catch (error) {
      console.error('Error deleting logo:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa logo",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Quản Lý Logo Hero</h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload và quản lý logo hiển thị trên Hero Carousel
        </p>
      </div>

      <div className="grid gap-6">
        {carModels.map((model) => {
          const existingLogo = logos.find(logo => logo.car_model === model.key);
          
          return (
            <Card key={model.key} className="p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">{model.name}</CardTitle>
              </CardHeader>

              <CardContent>
                {existingLogo ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={existingLogo.url}
                        alt={existingLogo.name}
                        className="h-12 w-auto object-contain border border-gray-200 rounded"
                      />
                      <div>
                        <p className="font-medium">{existingLogo.name}</p>
                        <p className="text-sm text-gray-500">{existingLogo.file_name}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteLogo(existingLogo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-4">
                      Chưa có logo cho {model.name}
                    </p>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, model.key);
                          }
                        }}
                        disabled={uploadingLogo === model.key}
                      />
                      <Button
                        variant="outline"
                        disabled={uploadingLogo === model.key}
                      >
                        {uploadingLogo === model.key ? "Đang upload..." : "Chọn file logo"}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Khuyến nghị: 400x100px, định dạng PNG có nền trong suốt
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Hướng dẫn:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Logo sẽ tự động hiển thị trên Hero Carousel thay vì text tên xe</li>
          <li>• Khuyến nghị sử dụng file PNG có nền trong suốt</li>
          <li>• Kích thước tối ưu: 400x100px (tỷ lệ 4:1)</li>
          <li>• Logo sẽ tự động scale theo kích thước màn hình</li>
        </ul>
      </div>
    </div>
  );
};

export default HeroLogoManagement;
