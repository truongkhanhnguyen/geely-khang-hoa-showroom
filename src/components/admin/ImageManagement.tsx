
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Trash2, Eye, Monitor, Smartphone, Image } from "lucide-react";
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
    description: "",
    desktopFile: null as File | null,
    mobileFile: null as File | null
  });

  const imageCategories = [
    { value: "hero", label: "Hero Banner", size: "1920x1080 (Mobile: 768x1024)", description: "Hình ảnh banner chính" },
    { value: "car", label: "Xe hơi", size: "800x600", description: "Hình ảnh sản phẩm xe" },
    { value: "promotion", label: "Khuyến mãi", size: "400x250", description: "Hình ảnh khuyến mãi" },
    { value: "news", label: "Tin tức", size: "400x250", description: "Hình ảnh tin tức" },
    { value: "gallery", label: "Thư viện", size: "600x400", description: "Hình ảnh thư viện" },
    { value: "general", label: "Tổng quát", size: "Tùy chỉnh", description: "Hình ảnh khác" }
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

    setUploading(true);
    
    try {
      const timestamp = Date.now();
      const categoryInfo = imageCategories.find(cat => cat.value === uploadForm.category);

      // Upload desktop file
      const desktopFileName = `${uploadForm.category}-${timestamp}-desktop.${uploadForm.desktopFile.name.split('.').pop()}`;
      const desktopUrl = await uploadFileToStorage(uploadForm.desktopFile, desktopFileName);

      // Upload mobile file if provided
      let mobileUrl = null;
      let mobileFileName = null;
      if (uploadForm.mobileFile) {
        mobileFileName = `${uploadForm.category}-${timestamp}-mobile.${uploadForm.mobileFile.name.split('.').pop()}`;
        mobileUrl = await uploadFileToStorage(uploadForm.mobileFile, mobileFileName);
      }

      // Save metadata to database
      const { error } = await supabase
        .from('website_images')
        .insert([{
          name: uploadForm.name,
          url: desktopUrl,
          mobile_url: mobileUrl,
          category: uploadForm.category,
          recommended_size: categoryInfo?.size || "Tùy chỉnh",
          description: uploadForm.description,
          file_name: desktopFileName,
          file_size: uploadForm.desktopFile.size
        }]);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã upload hình ảnh thành công"
      });

      setUploadForm({
        name: "",
        category: "general",
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tên hình ảnh *</Label>
              <Input
                value={uploadForm.name}
                onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ví dụ: Hero Banner Trang Chủ"
              />
            </div>
            <div>
              <Label>Danh mục *</Label>
              <Select 
                value={uploadForm.category} 
                onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}
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
          </div>

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

      {/* Recommended Sizes Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Hướng Dẫn Kích Thước Hình Ảnh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageCategories.map((cat) => (
              <div key={cat.value} className="p-3 border rounded-lg">
                <h4 className="font-semibold">{cat.label}</h4>
                <p className="text-sm text-gray-600">Kích thước: {cat.size}</p>
                <p className="text-xs text-gray-500 mt-1">{cat.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Images List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Hình Ảnh ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tên</TableHead>
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
