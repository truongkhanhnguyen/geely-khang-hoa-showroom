
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Trash2, Edit, Eye, EyeOff, Info, Image, MapPin, Sparkles } from "lucide-react";
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
  { 
    value: "hero-banner", 
    label: "🎯 Hero Banner - Trang chủ", 
    description: "Banner carousel chính tự động chuyển đổi",
    location: "Trang chủ - Banner carousel chính (tự động chuyển đổi)",
    usage: "Hiển thị làm hình nền chính, kèm thông tin xe và nút CTA",
    icon: "🎯"
  },
  { 
    value: "car-gallery", 
    label: "🚗 Thư Viện Xe", 
    description: "Hình ảnh chi tiết của xe",
    location: "Trang chi tiết xe - Galley hình ảnh",
    usage: "Hiển thị trong carousel hình ảnh chi tiết của từng dòng xe",
    icon: "🚗"
  },
  { 
    value: "promotions", 
    label: "🎁 Khuyến Mãi", 
    description: "Hình ảnh cho các chương trình khuyến mãi",
    location: "Trang chủ - Section khuyến mãi & Trang khuyến mãi",
    usage: "Hiển thị làm hình nền cho các chương trình khuyến mãi",
    icon: "🎁"
  },
  { 
    value: "news", 
    label: "📰 Tin Tức", 
    description: "Hình ảnh cho bài viết tin tức",
    location: "Trang chủ - Section tin tức & Trang chi tiết tin tức",
    usage: "Hình ảnh đại diện cho bài viết tin tức",
    icon: "📰"
  },
  { 
    value: "features", 
    label: "⭐ Tính Năng", 
    description: "Hình ảnh minh họa tính năng xe",
    location: "Trang chi tiết xe - Section tính năng",
    usage: "Minh họa các tính năng nổi bật của xe",
    icon: "⭐"
  },
  { 
    value: "showroom", 
    label: "🏢 Showroom", 
    description: "Hình ảnh showroom và cơ sở vật chất",
    location: "Trang chủ - Section về chúng tôi",
    usage: "Hiển thị không gian showroom, cơ sở vật chất",
    icon: "🏢"
  },
  { 
    value: "logo", 
    label: "🏷️ Logo", 
    description: "Logo và biểu tượng thương hiệu",
    location: "Header, Footer và toàn bộ website",
    usage: "Logo thương hiệu, biểu tượng",
    icon: "🏷️"
  },
  { 
    value: "background", 
    label: "🖼️ Hình Nền", 
    description: "Hình nền cho các section",
    location: "Background các section trên website",
    usage: "Làm hình nền trang trí cho các phần của website",
    icon: "🖼️"
  },
  { 
    value: "other", 
    label: "📁 Khác", 
    description: "Hình ảnh khác",
    location: "Vị trí khác trên website",
    usage: "Sử dụng cho mục đích khác",
    icon: "📁"
  }
];

const CAR_MODELS = [
  { value: "all", label: "🌟 Tất Cả Dòng Xe", description: "Áp dụng cho tất cả các dòng xe" },
  { value: "coolray", label: "🚙 Geely Coolray", description: "SUV đô thị thông minh" },
  { value: "monjaro", label: "🚗 Geely Monjaro", description: "SUV 7 chỗ cao cấp" },
  { value: "ex5", label: "⚡ Geely EX5", description: "SUV điện thông minh" },
  { value: "future-models", label: "🔮 Dòng Xe Tương Lai", description: "Các mẫu xe sắp ra mắt" }
];

const RECOMMENDED_SIZES = {
  "hero-banner": "1920×1080px (Desktop), 768×1024px (Mobile)",
  "car-gallery": "1200×800px (Desktop), 600×400px (Mobile)", 
  "promotions": "800×600px",
  "news": "600×400px",
  "features": "400×300px",
  "showroom": "1200×800px",
  "logo": "200×100px (PNG với nền trong suốt)",
  "background": "1920×1080px",
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
      console.log('🔍 Fetching images from database...');
      const { data, error } = await supabase
        .from('website_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching images:', error);
        throw error;
      }
      
      console.log('✅ Fetched images:', data);
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
      console.log(`🚀 Starting file upload for ${isDesktop ? 'desktop' : 'mobile'}:`, {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      let fileToUpload = file;
      let conversionInfo = "";

      // Convert to WebP if possible
      if (shouldConvertToWebP(file)) {
        console.log('🔄 Converting to WebP...');
        try {
          const conversion = await convertToWebP(file, 0.85);
          fileToUpload = conversion.convertedFile;
          conversionInfo = ` (Converted to WebP, saved ${conversion.compressionRatio}% - ${formatFileSize(conversion.originalSize)} → ${formatFileSize(conversion.convertedSize)})`;
          
          console.log('✅ WebP conversion successful:', {
            originalSize: conversion.originalSize,
            convertedSize: conversion.convertedSize,
            compressionRatio: conversion.compressionRatio
          });

          toast({
            title: "Chuyển đổi thành công",
            description: `File đã được tối ưu${conversionInfo}`,
          });
        } catch (conversionError) {
          console.warn('⚠️ WebP conversion failed, using original file:', conversionError);
          toast({
            title: "Sử dụng file gốc",
            description: "Không thể chuyển đổi sang WebP, sử dụng file gốc",
          });
        }
      } else {
        console.log('ℹ️ File không cần chuyển đổi WebP:', file.type);
      }

      const fileName = `${Date.now()}-${isDesktop ? 'desktop' : 'mobile'}-${fileToUpload.name}`;
      console.log('📁 Uploading to storage with filename:', fileName);
      
      const { data, error } = await supabase.storage
        .from('website-images')
        .upload(fileName, fileToUpload);

      if (error) {
        console.error('❌ Storage upload error:', error);
        throw error;
      }

      console.log('✅ File uploaded successfully:', data);

      const { data: urlData } = supabase.storage
        .from('website-images')
        .getPublicUrl(data.path);

      console.log('🔗 Generated public URL:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('💥 Error uploading file:', error);
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
    
    console.log('📝 Form submission started:', {
      isAdmin,
      hasFile: !!file,
      isEditing: !!editingImage,
      category,
      carModel,
      name
    });

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
        console.log('📤 Uploading desktop image...');
        desktopUrl = await uploadFileToStorage(file, true) || "";
        fileName = file.name;
        fileSize = file.size;
      }

      // Upload mobile image if provided
      if (mobileFile) {
        console.log('📱 Uploading mobile image...');
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

      console.log('💾 Saving to database:', imageData);

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

      if (result.error) {
        console.error('❌ Database save error:', result.error);
        throw result.error;
      }

      console.log('✅ Database save successful');

      toast({
        title: "Thành công",
        description: editingImage ? "Cập nhật hình ảnh thành công" : "Thêm hình ảnh thành công",
      });

      // Reset form
      resetForm();
      fetchImages();
    } catch (error) {
      console.error('💥 Error saving image:', error);
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

  const selectedCategory = IMAGE_CATEGORIES.find(cat => cat.value === category);
  const selectedCarModel = CAR_MODELS.find(model => model.value === carModel);

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {editingImage ? "Chỉnh sửa hình ảnh" : "Upload Hình Ảnh Mới"}
            <Badge variant="secondary" className="ml-2">
              ✅ Auto WebP
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <Label htmlFor="category" className="text-base font-semibold flex items-center gap-2">
                <Image className="h-4 w-4" />
                Danh mục hình ảnh *
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Chọn danh mục hình ảnh" />
                </SelectTrigger>
                <SelectContent>
                  {IMAGE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className="p-3">
                      <div className="w-full">
                        <div className="font-medium text-left">{cat.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{cat.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Car Model Selection */}
            <div>
              <Label htmlFor="carModel" className="text-base font-semibold flex items-center gap-2">
                🚗 Dòng xe *
              </Label>
              <Select value={carModel} onValueChange={setCarModel} required>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Chọn dòng xe" />
                </SelectTrigger>
                <SelectContent>
                  {CAR_MODELS.map((model) => (
                    <SelectItem key={model.value} value={model.value} className="p-3">
                      <div className="w-full">
                        <div className="font-medium text-left">{model.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{model.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Information Card */}
            {selectedCategory && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                        {selectedCategory.icon} {selectedCategory.label}
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Vị trí hiển thị:</span>
                            <div className="text-blue-700">{selectedCategory.location}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Cách sử dụng:</span>
                            <div className="text-blue-700">{selectedCategory.usage}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">📏</span>
                          <div>
                            <span className="font-medium">Kích thước khuyến nghị:</span>
                            <div className="text-blue-700">{RECOMMENDED_SIZES[category as keyof typeof RECOMMENDED_SIZES]}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <Label htmlFor="name">Tên hình ảnh (tùy chọn)</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Để trống để tự động tạo tên dựa trên danh mục và dòng xe"
                className="h-11"
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
                className="h-11"
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
                <Label htmlFor="desktop-file" className="flex items-center gap-2">
                  <span className="text-blue-600">💻</span>
                  Hình ảnh PC/Desktop {!editingImage && "*"}
                </Label>
                <Input
                  id="desktop-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required={!editingImage}
                  className="h-11"
                />
                <p className="text-xs text-blue-600 mt-1">
                  📱 Hiển thị trên máy tính, laptop, tablet ngang
                </p>
                {file && shouldConvertToWebP(file) && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ File này sẽ được tự động chuyển đổi sang WebP để tối ưu dung lượng
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="mobile-file" className="flex items-center gap-2">
                  <span className="text-purple-600">📱</span>
                  Hình ảnh Mobile (tùy chọn)
                </Label>
                <Input
                  id="mobile-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMobileFile(e.target.files?.[0] || null)}
                  className="h-11"
                />
                <p className="text-xs text-purple-600 mt-1">
                  📱 Hiển thị trên điện thoại, tablet dọc (nếu không có sẽ dùng ảnh PC)
                </p>
                {mobileFile && shouldConvertToWebP(mobileFile) && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ File này sẽ được tự động chuyển đổi sang WebP để tối ưu dung lượng
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={uploading} className="h-11">
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Đang xử lý..." : (editingImage ? "Cập nhật" : "Thêm hình ảnh")}
              </Button>
              
              {editingImage && (
                <Button type="button" variant="outline" onClick={resetForm} className="h-11">
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
