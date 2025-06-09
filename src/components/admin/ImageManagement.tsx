
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { convertToWebP, shouldConvertToWebP, formatFileSize } from "@/utils/imageConverter";
import { useAuth } from "@/contexts/AuthContext";

interface WebsiteImage {
  id: string;
  name: string;
  url: string;
  mobile_url: string | null;
  category: string;
  recommended_size: string;
  description: string | null;
  file_name: string | null;
  file_size: number | null;
}

const ImageManagement = () => {
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<WebsiteImage | null>(null);
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [recommendedSize, setRecommendedSize] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);

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
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFileToStorage = async (file: File, isDesktop: boolean = true): Promise<string | null> => {
    try {
      let fileToUpload = file;
      let conversionInfo = "";

      // Convert to WebP if possible
      if (shouldConvertToWebP(file)) {
        try {
          const conversion = await convertToWebP(file, 0.85);
          fileToUpload = conversion.convertedFile;
          conversionInfo = ` (Converted to WebP, saved ${conversion.compressionRatio}% - ${formatFileSize(conversion.originalSize)} → ${formatFileSize(conversion.convertedSize)})`;
          
          toast({
            title: "Chuyển đổi thành công",
            description: `File đã được tối ưu${conversionInfo}`,
          });
        } catch (conversionError) {
          console.warn('WebP conversion failed, using original file:', conversionError);
          toast({
            title: "Sử dụng file gốc",
            description: "Không thể chuyển đổi sang WebP, sử dụng file gốc",
          });
        }
      }

      const fileName = `${Date.now()}-${isDesktop ? 'desktop' : 'mobile'}-${fileToUpload.name}`;
      
      const { data, error } = await supabase.storage
        .from('website-images')
        .upload(fileName, fileToUpload);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('website-images')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAdmin) {
      toast({
        title: "Không có quyền",
        description: "Chỉ admin mới có thể thực hiện thao tác này",
        variant: "destructive",
      });
      return;
    }

    if (!file && !editingImage) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn file hình ảnh",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      let desktopUrl = editingImage?.url || "";
      let mobileUrl = editingImage?.mobile_url || null;
      let fileName = editingImage?.file_name || "";
      let fileSize = editingImage?.file_size || 0;

      // Upload desktop image if new file selected
      if (file) {
        desktopUrl = await uploadFileToStorage(file, true) || "";
        fileName = file.name;
        fileSize = file.size;
      }

      // Upload mobile image if provided
      if (mobileFile) {
        mobileUrl = await uploadFileToStorage(mobileFile, false);
      }

      const imageData = {
        name,
        url: desktopUrl,
        mobile_url: mobileUrl,
        category,
        recommended_size: recommendedSize,
        description: description || null,
        file_name: fileName,
        file_size: fileSize,
      };

      let result;
      if (editingImage) {
        result = await supabase
          .from('website_images')
          .update(imageData)
          .eq('id', editingImage.id);
      } else {
        result = await supabase
          .from('website_images')
          .insert([imageData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Thành công",
        description: editingImage ? "Cập nhật hình ảnh thành công" : "Thêm hình ảnh thành công",
      });

      // Reset form
      setName("");
      setCategory("");
      setRecommendedSize("");
      setDescription("");
      setFile(null);
      setMobileFile(null);
      setEditingImage(null);
      
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu hình ảnh",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (image: WebsiteImage) => {
    setEditingImage(image);
    setName(image.name);
    setCategory(image.category);
    setRecommendedSize(image.recommended_size);
    setDescription(image.description || "");
  };

  const handleDelete = async (image: WebsiteImage) => {
    if (!isAdmin) {
      toast({
        title: "Không có quyền",
        description: "Chỉ admin mới có thể thực hiện thao tác này",
        variant: "destructive",
      });
      return;
    }

    if (!confirm("Bạn có chắc chắn muốn xóa hình ảnh này?")) return;

    try {
      const { error } = await supabase
        .from('website_images')
        .delete()
        .eq('id', image.id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Xóa hình ảnh thành công",
      });
      
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa hình ảnh",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingImage(null);
    setName("");
    setCategory("");
    setRecommendedSize("");
    setDescription("");
    setFile(null);
    setMobileFile(null);
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Bạn không có quyền truy cập vào tính năng này.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center">Đang tải...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingImage ? "Chỉnh sửa hình ảnh" : "Thêm hình ảnh mới"}
            <Badge variant="secondary" className="ml-2">
              Auto WebP
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Tên hình ảnh</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Hero Banner Desktop"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Danh mục</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="VD: hero, car-images, promotions"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="recommendedSize">Kích thước khuyến nghị</Label>
              <Input
                id="recommendedSize"
                value={recommendedSize}
                onChange={(e) => setRecommendedSize(e.target.value)}
                placeholder="VD: 1920x1080px"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Mô tả (tùy chọn)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết về hình ảnh này..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="desktop-file">
                  Hình ảnh Desktop {!editingImage && "*"}
                </Label>
                <Input
                  id="desktop-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required={!editingImage}
                />
                {file && shouldConvertToWebP(file) && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ File này sẽ được tự động chuyển đổi sang WebP để tối ưu dung lượng
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="mobile-file">Hình ảnh Mobile (tùy chọn)</Label>
                <Input
                  id="mobile-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMobileFile(e.target.files?.[0] || null)}
                />
                {mobileFile && shouldConvertToWebP(mobileFile) && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ File này sẽ được tự động chuyển đổi sang WebP để tối ưu dung lượng
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={uploading}>
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Đang xử lý..." : (editingImage ? "Cập nhật" : "Thêm hình ảnh")}
              </Button>
              
              {editingImage && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Hủy
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Images List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách hình ảnh ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border rounded-lg p-4 space-y-3">
                <div className="relative">
                  <img
                    src={showPreview === image.id ? image.url : image.url}
                    alt={image.name}
                    className="w-full h-40 object-cover rounded cursor-pointer"
                    onClick={() => setShowPreview(showPreview === image.id ? null : image.id)}
                  />
                  {image.mobile_url && (
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Mobile: ✓
                    </Badge>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium truncate">{image.name}</h4>
                  <p className="text-sm text-gray-500">{image.category}</p>
                  <p className="text-xs text-gray-400">{image.recommended_size}</p>
                  {image.file_size && (
                    <p className="text-xs text-gray-400">
                      {formatFileSize(image.file_size)}
                    </p>
                  )}
                </div>
                
                {image.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {image.description}
                  </p>
                )}
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowPreview(showPreview === image.id ? null : image.id)}
                  >
                    {showPreview === image.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(image)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(image)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {images.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Chưa có hình ảnh nào. Hãy thêm hình ảnh đầu tiên!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageManagement;
