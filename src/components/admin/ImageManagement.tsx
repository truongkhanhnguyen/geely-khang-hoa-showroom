import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const IMAGE_CATEGORIES = [
  { value: "hero-banner", label: "Banner Chính (Hero)", description: "Hình ảnh banner chính trang chủ" },
  { value: "car-gallery", label: "Thư Viện Xe", description: "Hình ảnh chi tiết của xe" },
  { value: "promotions", label: "Khuyến Mãi", description: "Hình ảnh cho các chương trình khuyến mãi" },
  { value: "news", label: "Tin Tức", description: "Hình ảnh cho bài viết tin tức" },
  { value: "features", label: "Tính Năng", description: "Hình ảnh minh họa tính năng xe" },
  { value: "showroom", label: "Showroom", description: "Hình ảnh showroom và cơ sở vật chất" },
  { value: "logo", label: "Logo", description: "Logo và biểu tượng thương hiệu" },
  { value: "background", label: "Hình Nền", description: "Hình nền cho các section" },
  { value: "other", label: "Khác", description: "Hình ảnh khác" }
];

const CAR_MODELS = [
  { value: "all", label: "Tất Cả Dòng Xe" },
  { value: "coolray", label: "Geely Coolray" },
  { value: "monjaro", label: "Geely Monjaro" },
  { value: "ex5", label: "Geely EX5" },
  { value: "future-models", label: "Dòng Xe Tương Lai" }
];

const RECOMMENDED_SIZES = {
  "hero-banner": "1920x1080px (Desktop), 768x1024px (Mobile)",
  "car-gallery": "1200x800px (Desktop), 600x400px (Mobile)", 
  "promotions": "800x600px",
  "news": "600x400px",
  "features": "400x300px",
  "showroom": "1200x800px",
  "logo": "200x100px (PNG với nền trong suốt)",
  "background": "1920x1080px",
  "other": "Tùy theo mục đích sử dụng"
};

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
  const [carModel, setCarModel] = useState("all");
  const [recommendedSize, setRecommendedSize] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    // Auto-fill recommended size when category changes
    if (category && RECOMMENDED_SIZES[category as keyof typeof RECOMMENDED_SIZES]) {
      setRecommendedSize(RECOMMENDED_SIZES[category as keyof typeof RECOMMENDED_SIZES]);
    }
  }, [category]);

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

  const generateImageName = () => {
    const categoryLabel = IMAGE_CATEGORIES.find(cat => cat.value === category)?.label || category;
    const modelLabel = CAR_MODELS.find(model => model.value === carModel)?.label || carModel;
    
    if (carModel === "all") {
      return `${categoryLabel} - ${Date.now()}`;
    } else {
      return `${categoryLabel} - ${modelLabel} - ${Date.now()}`;
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

    if (!category) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn danh mục hình ảnh",
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

      const finalName = name || generateImageName();
      const categoryWithModel = carModel !== "all" ? `${category}-${carModel}` : category;

      const imageData = {
        name: finalName,
        url: desktopUrl,
        mobile_url: mobileUrl,
        category: categoryWithModel,
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
      resetForm();
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
    
    // Parse category and car model from existing category
    const categoryParts = image.category.split('-');
    if (categoryParts.length > 1 && CAR_MODELS.some(model => model.value === categoryParts[categoryParts.length - 1])) {
      setCarModel(categoryParts[categoryParts.length - 1]);
      setCategory(categoryParts.slice(0, -1).join('-'));
    } else {
      setCategory(image.category);
      setCarModel("all");
    }
    
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
    setCarModel("all");
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
                <Label htmlFor="category">Danh mục hình ảnh *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục hình ảnh" />
                  </SelectTrigger>
                  <SelectContent>
                    {IMAGE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div>
                          <div className="font-medium">{cat.label}</div>
                          <div className="text-xs text-gray-500">{cat.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="carModel">Dòng xe *</Label>
                <Select value={carModel} onValueChange={setCarModel} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dòng xe" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAR_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="name">Tên hình ảnh (tùy chọn)</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Để trống để tự động tạo tên dựa trên danh mục và dòng xe"
              />
              {!name && category && (
                <p className="text-xs text-gray-500 mt-1">
                  Tên sẽ được tạo tự động: {generateImageName()}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="recommendedSize">Kích thước khuyến nghị</Label>
              <Input
                id="recommendedSize"
                value={recommendedSize}
                onChange={(e) => setRecommendedSize(e.target.value)}
                placeholder="Kích thước sẽ được tự động điền theo danh mục"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Mô tả (tùy chọn)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết về hình ảnh này, cách sử dụng..."
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
                    src={image.url}
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
                  <p className="text-sm text-gray-500">
                    {IMAGE_CATEGORIES.find(cat => image.category.includes(cat.value))?.label || image.category}
                  </p>
                  {image.category.includes('-') && (
                    <p className="text-xs text-blue-600">
                      {CAR_MODELS.find(model => image.category.includes(model.value))?.label || 'Dòng xe cụ thể'}
                    </p>
                  )}
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
