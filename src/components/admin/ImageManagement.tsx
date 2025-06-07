import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Trash2, Eye, Monitor, Smartphone, Image, Info, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WebsiteImage {
  id: string;
  name: string;
  url: string;
  mobile_url?: string;
  category: string;
  recommended_size: string;
  description: string;
  file_name?: string;
  file_size?: number;
  created_at: string;
}

const ImageManagement = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "general",
    carModel: "", // New field for car model
    description: "",
    desktopFile: null as File | null,
    mobileFile: null as File | null
  });

  const carModels = [
    { value: "coolray", label: "Geely Coolray" },
    { value: "monjaro", label: "Geely Monjaro" },
    { value: "ex5", label: "Geely EX5" },
    { value: "general", label: "Chung (tất cả xe)" }
  ];

  const imageCategories = [
    { 
      value: "hero", 
      label: "🎯 Hero Banner - Trang chủ", 
      size: "1920x1080 (Mobile: 768x1024)", 
      description: "Hình ảnh banner chính trang chủ - hiển thị ở carousel đầu trang",
      position: "Trang chủ - Banner carousel chính (tự động chuyển đổi)",
      usage: "Hiển thị làm hình nền chính, kèm thông tin xe và nút CTA",
      requiresCar: true
    },
    { 
      value: "car", 
      label: "🚗 Thư viện xe", 
      size: "1920x1080", 
      description: "Hình ảnh chi tiết sản phẩm xe cho trang chi tiết",
      position: "Trang chi tiết xe - Gallery carousel",
      usage: "Hiển thị trong gallery chi tiết từng dòng xe",
      requiresCar: true
    },
    { 
      value: "promotion", 
      label: "🎁 Khuyến mãi", 
      size: "400x250", 
      description: "Hình ảnh khuyến mãi, ưu đãi",
      position: "Trang chủ - Phần khuyến mãi, trang khuyến mãi riêng",
      usage: "Hiển thị trong card khuyến mãi",
      requiresCar: false
    },
    { 
      value: "news", 
      label: "📰 Tin tức", 
      size: "400x250", 
      description: "Hình ảnh tin tức, blog",
      position: "Trang chủ - Phần tin tức, trang tin tức riêng",
      usage: "Hiển thị làm thumbnail cho bài viết",
      requiresCar: false
    },
    { 
      value: "gallery", 
      label: "🖼️ Thư viện chung", 
      size: "600x400", 
      description: "Hình ảnh thư viện, album",
      position: "Trang gallery, album hình ảnh",
      usage: "Hiển thị trong bộ sưu tập hình ảnh",
      requiresCar: false
    },
    { 
      value: "general", 
      label: "📎 Tổng quát", 
      size: "Tùy chỉnh", 
      description: "Hình ảnh khác",
      position: "Các vị trí khác trên website",
      usage: "Sử dụng cho mục đích chung",
      requiresCar: false
    }
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('website_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách hình ảnh",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFileToStorage = async (file: File, fileName: string): Promise<string> => {
    const { data, error } = await supabase.storage
      .from('website-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('website-images')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const handleUpload = async () => {
    if (!uploadForm.name || !uploadForm.desktopFile) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ tên và chọn file hình ảnh PC",
        variant: "destructive"
      });
      return;
    }

    const selectedCategory = imageCategories.find(cat => cat.value === uploadForm.category);
    if (selectedCategory?.requiresCar && !uploadForm.carModel) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng chọn dòng xe cho danh mục này",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      const timestamp = Date.now();
      const categoryInfo = imageCategories.find(cat => cat.value === uploadForm.category);

      // Create filename with car model if applicable
      const carModelPrefix = uploadForm.carModel && uploadForm.carModel !== 'general' ? `-${uploadForm.carModel}` : '';
      
      // Upload desktop file
      const desktopFileName = `${uploadForm.category}${carModelPrefix}-${timestamp}-desktop.${uploadForm.desktopFile.name.split('.').pop()}`;
      const desktopUrl = await uploadFileToStorage(uploadForm.desktopFile, desktopFileName);

      // Upload mobile file if provided
      let mobileUrl = null;
      let mobileFileName = null;
      if (uploadForm.mobileFile) {
        mobileFileName = `${uploadForm.category}${carModelPrefix}-${timestamp}-mobile.${uploadForm.mobileFile.name.split('.').pop()}`;
        mobileUrl = await uploadFileToStorage(uploadForm.mobileFile, mobileFileName);
      }

      // Create comprehensive description
      const carModelLabel = carModels.find(car => car.value === uploadForm.carModel)?.label || '';
      const fullDescription = `${uploadForm.description}${carModelLabel ? ` - ${carModelLabel}` : ''}`;

      // Save metadata to database
      const { error } = await supabase
        .from('website_images')
        .insert([{
          name: `${uploadForm.name}${carModelLabel ? ` - ${carModelLabel}` : ''}`,
          url: desktopUrl,
          mobile_url: mobileUrl,
          category: uploadForm.category,
          recommended_size: categoryInfo?.size || "Tùy chỉnh",
          description: fullDescription,
          file_name: desktopFileName,
          file_size: uploadForm.desktopFile.size
        }]);

      if (error) throw error;

      toast({
        title: "✅ Upload thành công!",
        description: `Đã upload hình ảnh cho ${categoryInfo?.label}${carModelLabel ? ` - ${carModelLabel}` : ''}`
      });

      // Reset form
      setUploadForm({
        name: "",
        category: "general",
        carModel: "",
        description: "",
        desktopFile: null,
        mobileFile: null
      });

      // Reset file inputs
      const desktopInput = document.getElementById('desktop-file') as HTMLInputElement;
      const mobileInput = document.getElementById('mobile-file') as HTMLInputElement;
      if (desktopInput) desktopInput.value = '';
      if (mobileInput) mobileInput.value = '';

      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể upload hình ảnh. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, fileName?: string, mobileFileName?: string) => {
    try {
      // Delete files from storage
      if (fileName) {
        await supabase.storage
          .from('website-images')
          .remove([fileName]);
      }
      
      if (mobileFileName) {
        // Extract mobile file name from URL if needed
        const mobileUrl = images.find(img => img.id === id)?.mobile_url;
        if (mobileUrl) {
          const mobilePath = mobileUrl.split('/').pop();
          if (mobilePath) {
            await supabase.storage
              .from('website-images')
              .remove([mobilePath]);
          }
        }
      }

      // Delete record from database
      const { error } = await supabase
        .from('website_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã xóa hình ảnh"
      });

      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa hình ảnh",
        variant: "destructive"
      });
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      hero: "bg-purple-100 text-purple-800",
      car: "bg-blue-100 text-blue-800",
      promotion: "bg-green-100 text-green-800",
      news: "bg-orange-100 text-orange-800",
      gallery: "bg-pink-100 text-pink-800",
      general: "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors.general;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const selectedCategory = imageCategories.find(cat => cat.value === uploadForm.category);

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload Hình Ảnh Mới
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Tên hình ảnh *</Label>
              <Input
                value={uploadForm.name}
                onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ví dụ: Hero Banner Coolray"
              />
            </div>
            <div>
              <Label>Danh mục *</Label>
              <Select 
                value={uploadForm.category} 
                onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value, carModel: "" }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {imageCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedCategory?.requiresCar && (
              <div>
                <Label className="flex items-center">
                  <Car className="w-4 h-4 mr-1" />
                  Dòng xe *
                </Label>
                <Select 
                  value={uploadForm.carModel} 
                  onValueChange={(value) => setUploadForm(prev => ({ ...prev, carModel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dòng xe" />
                  </SelectTrigger>
                  <SelectContent>
                    {carModels.map((car) => (
                      <SelectItem key={car.value} value={car.value}>
                        {car.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Category Information Display */}
          {selectedCategory && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-900">
                      📍 {selectedCategory.label}
                      {selectedCategory.requiresCar && uploadForm.carModel && (
                        <span className="ml-2 text-green-700">
                          → {carModels.find(car => car.value === uploadForm.carModel)?.label}
                        </span>
                      )}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-blue-800">📏 Kích thước khuyến nghị:</span>
                        <p className="text-blue-700">{selectedCategory.size}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-800">📍 Vị trí hiển thị:</span>
                        <p className="text-blue-700">{selectedCategory.position}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium text-blue-800">🎯 Cách sử dụng:</span>
                        <p className="text-blue-700">{selectedCategory.usage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center">
                <Monitor className="w-4 h-4 mr-1" />
                Hình ảnh PC/Desktop *
              </Label>
              <Input
                id="desktop-file"
                type="file"
                accept="image/*"
                onChange={(e) => setUploadForm(prev => ({ 
                  ...prev, 
                  desktopFile: e.target.files?.[0] || null 
                }))}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {uploadForm.desktopFile && (
                <p className="text-sm text-gray-500 mt-1">
                  {uploadForm.desktopFile.name} ({formatFileSize(uploadForm.desktopFile.size)})
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                💻 Hiển thị trên máy tính, laptop, tablet ngang
              </p>
            </div>
            <div>
              <Label className="flex items-center">
                <Smartphone className="w-4 h-4 mr-1" />
                Hình ảnh Mobile (tùy chọn)
              </Label>
              <Input
                id="mobile-file"
                type="file"
                accept="image/*"
                onChange={(e) => setUploadForm(prev => ({ 
                  ...prev, 
                  mobileFile: e.target.files?.[0] || null 
                }))}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {uploadForm.mobileFile && (
                <p className="text-sm text-gray-500 mt-1">
                  {uploadForm.mobileFile.name} ({formatFileSize(uploadForm.mobileFile.size)})
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                📱 Hiển thị trên điện thoại, tablet dọc (nếu không có sẽ dùng ảnh PC)
              </p>
            </div>
          </div>

          <div>
            <Label>Mô tả</Label>
            <Input
              value={uploadForm.description}
              onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Mô tả ngắn về hình ảnh"
            />
          </div>

          <Button 
            onClick={handleUpload} 
            className="w-full" 
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Đang upload...
              </>
            ) : (
              <>
                <Image className="w-4 h-4 mr-2" />
                Upload Hình Ảnh
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Detailed Sizes Guide */}
      <Card>
        <CardHeader>
          <CardTitle>📐 Hướng Dẫn Chi Tiết Vị Trí & Dòng Xe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {imageCategories.map((cat) => (
              <div key={cat.value} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryBadgeColor(cat.value)}>
                    {cat.label}
                  </Badge>
                  {cat.requiresCar && (
                    <Badge variant="outline" className="text-xs">
                      🚗 Cần chọn dòng xe
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">📏 Kích thước:</span>
                    <p className="text-gray-600">{cat.size}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">📍 Vị trí hiển thị:</span>
                    <p className="text-gray-600">{cat.position}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">🎯 Cách sử dụng:</span>
                    <p className="text-gray-600">{cat.usage}</p>
                  </div>
                  
                  {cat.requiresCar && (
                    <div>
                      <span className="font-semibold text-gray-700">🚗 Dòng xe:</span>
                      <p className="text-gray-600">Coolray, Monjaro, EX5, hoặc Chung (tất cả xe)</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Lưu ý quan trọng:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>Hero Banner</strong>: Phải chọn dòng xe cụ thể để hiển thị đúng thông tin trên trang chủ</li>
              <li>• <strong>Thư viện xe</strong>: Phải chọn dòng xe để hiển thị trong gallery chi tiết từng xe</li>
              <li>• <strong>Khuyến mãi/Tin tức</strong>: Không cần chọn dòng xe, áp dụng chung</li>
              <li>• Hình Mobile chỉ cần thiết cho Hero Banner để tối ưu hiển thị trên điện thoại</li>
              <li>• Kích thước file nên dưới 5MB để tăng tốc độ tải</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Images List */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Danh Sách Hình Ảnh ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tên & Dòng xe</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Kích thước file</TableHead>
                <TableHead>Thiết bị</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="flex space-x-2">
                      <div className="text-center">
                        <img 
                          src={image.url} 
                          alt={`${image.name} - Desktop`}
                          className="w-16 h-12 object-cover rounded border"
                        />
                        <div className="flex items-center justify-center mt-1">
                          <Monitor className="w-3 h-3" />
                        </div>
                      </div>
                      {image.mobile_url && (
                        <div className="text-center">
                          <img 
                            src={image.mobile_url} 
                            alt={`${image.name} - Mobile`}
                            className="w-12 h-16 object-cover rounded border"
                          />
                          <div className="flex items-center justify-center mt-1">
                            <Smartphone className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{image.name}</p>
                      {image.description && (
                        <p className="text-sm text-gray-500">{image.description}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryBadgeColor(image.category)}>
                      {imageCategories.find(cat => cat.value === image.category)?.label || image.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{formatFileSize(image.file_size)}</p>
                    {image.file_name && (
                      <p className="text-xs text-gray-500">{image.file_name}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Badge variant="outline" className="text-xs">
                        <Monitor className="w-3 h-3 mr-1" />
                        PC
                      </Badge>
                      {image.mobile_url && (
                        <Badge variant="outline" className="text-xs">
                          <Smartphone className="w-3 h-3 mr-1" />
                          Mobile
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(image.url, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(image.id, image.file_name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageManagement;
