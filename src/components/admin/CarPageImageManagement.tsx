
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Eye, EyeOff, Upload, Smartphone, Monitor } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { convertToWebP, shouldConvertToWebP, formatFileSize } from "@/utils/imageConverter";

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
    mobile_url: string | null;
    category: string;
  };
}

interface WebsiteImage {
  id: string;
  name: string;
  url: string;
  mobile_url: string | null;
  category: string;
}

const CarPageImageManagement = () => {
  const [carPageImages, setCarPageImages] = useState<CarPageImage[]>([]);
  const [availableImages, setAvailableImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCarModel, setSelectedCarModel] = useState<string>('coolray');
  const [selectedImageId, setSelectedImageId] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('hero');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [uploadFiles, setUploadFiles] = useState<{
    desktop: File | null;
    mobile: File | null;
  }>({ desktop: null, mobile: null });
  const [imageName, setImageName] = useState<string>('');
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
            mobile_url,
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
        .select('id, name, url, mobile_url, category')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAvailableImages(data || []);
    } catch (error) {
      console.error('Error fetching available images:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, isMobile: boolean = false): Promise<string> => {
    console.log(`🔄 Starting upload for ${isMobile ? 'mobile' : 'desktop'} image:`, file.name);
    
    let fileToUpload = file;
    
    // Convert to WebP if needed
    if (shouldConvertToWebP(file)) {
      try {
        console.log('🔄 Converting to WebP...');
        const { convertedFile, originalSize, convertedSize, compressionRatio } = await convertToWebP(file, 0.85);
        fileToUpload = convertedFile;
        
        toast({
          title: "Chuyển đổi thành công",
          description: `Đã chuyển đổi sang WebP. Giảm ${compressionRatio}% dung lượng (${formatFileSize(originalSize)} → ${formatFileSize(convertedSize)})`,
        });
      } catch (error) {
        console.error('❌ WebP conversion failed:', error);
        toast({
          title: "Cảnh báo",
          description: "Không thể chuyển đổi sang WebP, sẽ upload file gốc",
          variant: "destructive",
        });
      }
    }

    const fileExt = fileToUpload.name.split('.').pop();
    const fileName = `${Date.now()}_${isMobile ? 'mobile_' : ''}${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `car-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('website-images')
      .upload(filePath, fileToUpload);

    if (uploadError) {
      console.error('❌ Upload error:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('website-images')
      .getPublicUrl(filePath);

    console.log(`✅ Upload successful: ${data.publicUrl}`);
    return data.publicUrl;
  };

  const handleImageUpload = async () => {
    if (!uploadFiles.desktop || !imageName.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ảnh desktop và nhập tên ảnh",
        variant: "destructive",
      });
      return;
    }

    // Check hero section limit
    if (selectedSection === 'hero') {
      const heroImages = carPageImages.filter(img => img.display_section === 'hero');
      if (heroImages.length >= 1) {
        toast({
          title: "Lỗi",
          description: "Hero carousel chỉ được phép có 1 ảnh cho mỗi dòng xe",
          variant: "destructive",
        });
        return;
      }
    }

    setUploading(true);

    try {
      // Upload desktop image
      const desktopUrl = await uploadImage(uploadFiles.desktop, false);
      
      // Upload mobile image if provided
      let mobileUrl: string | null = null;
      if (uploadFiles.mobile) {
        mobileUrl = await uploadImage(uploadFiles.mobile, true);
      }

      // Save to website_images table
      const { data: imageData, error: insertError } = await supabase
        .from('website_images')
        .insert({
          name: imageName.trim(),
          url: desktopUrl,
          mobile_url: mobileUrl,
          category: 'car-page',
          recommended_size: '1920x1080',
          description: `${selectedCarModel}-${selectedSection}`,
          file_size: uploadFiles.desktop.size
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Add to car page images mapping
      const { error: mappingError } = await supabase
        .from('car_page_images')
        .insert({
          car_model: selectedCarModel,
          image_id: imageData.id,
          display_section: selectedSection,
          display_order: selectedSection === 'hero' ? 1 : displayOrder,
          is_active: true
        });

      if (mappingError) throw mappingError;

      toast({
        title: "Thành công",
        description: `Đã upload và thêm ảnh ${uploadFiles.mobile ? '(có ảnh mobile)' : ''} vào ${selectedSection}`,
      });

      // Reset form
      setUploadFiles({ desktop: null, mobile: null });
      setImageName('');
      setDisplayOrder(1);
      fetchCarPageImages();
      fetchAvailableImages();

    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể upload ảnh",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
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

    // Check hero section limit
    if (selectedSection === 'hero') {
      const heroImages = carPageImages.filter(img => img.display_section === 'hero');
      if (heroImages.length >= 1) {
        toast({
          title: "Lỗi",
          description: "Hero carousel chỉ được phép có 1 ảnh cho mỗi dòng xe",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const { error } = await supabase
        .from('car_page_images')
        .insert({
          car_model: selectedCarModel,
          image_id: selectedImageId,
          display_section: selectedSection,
          display_order: selectedSection === 'hero' ? 1 : displayOrder,
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

  const getSectionInfo = (section: string) => {
    switch (section) {
      case 'hero':
        return { title: 'Hero Carousel', maxImages: 1, showOrder: false };
      case 'gallery':
        return { title: 'Gallery', maxImages: null, showOrder: true };
      case 'features':
        return { title: 'Features', maxImages: null, showOrder: true };
      default:
        return { title: section, maxImages: null, showOrder: true };
    }
  };

  if (loading) {
    return <div className="p-4">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quản Lý Ảnh Trang Chi Tiết Xe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

          {/* Upload New Images */}
          <Card className="border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Ảnh Mới (Tự động chuyển PNG → WebP)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image-name">Tên ảnh</Label>
                <Input
                  id="image-name"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  placeholder="Nhập tên ảnh..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Desktop Image */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Ảnh Desktop (Bắt buộc)
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadFiles(prev => ({
                      ...prev,
                      desktop: e.target.files?.[0] || null
                    }))}
                  />
                  {uploadFiles.desktop && (
                    <p className="text-sm text-gray-600">
                      {uploadFiles.desktop.name} ({formatFileSize(uploadFiles.desktop.size)})
                    </p>
                  )}
                </div>

                {/* Mobile Image */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Ảnh Mobile (Tùy chọn)
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadFiles(prev => ({
                      ...prev,
                      mobile: e.target.files?.[0] || null
                    }))}
                  />
                  {uploadFiles.mobile && (
                    <p className="text-sm text-gray-600">
                      {uploadFiles.mobile.name} ({formatFileSize(uploadFiles.mobile.size)})
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="section-select">Vị trí hiển thị</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vị trí" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero Carousel (1 ảnh)</SelectItem>
                      <SelectItem value="gallery">Gallery (nhiều ảnh)</SelectItem>
                      <SelectItem value="features">Features (nhiều ảnh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedSection !== 'hero' && (
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
                )}

                <div className="flex items-end">
                  <Button 
                    onClick={handleImageUpload} 
                    className="w-full"
                    disabled={uploading || !uploadFiles.desktop || !imageName.trim()}
                  >
                    {uploading ? "Đang upload..." : "Upload & Thêm ảnh"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Existing Image Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor="image-select">Chọn ảnh có sẵn</Label>
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
              <Label htmlFor="section-select2">Vị trí hiển thị</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vị trí" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Carousel (1 ảnh)</SelectItem>
                  <SelectItem value="gallery">Gallery</SelectItem>
                  <SelectItem value="features">Features</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedSection !== 'hero' && (
              <div>
                <Label htmlFor="order2">Thứ tự</Label>
                <Input
                  id="order2"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                  min="1"
                />
              </div>
            )}

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
      {Object.entries(groupedImages).map(([section, images]) => {
        const sectionInfo = getSectionInfo(section);
        return (
          <Card key={section}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="capitalize">
                  {sectionInfo.title} - {selectedCarModel}
                </span>
                <span className="text-sm font-normal text-gray-500">
                  {images.length}/{sectionInfo.maxImages || '∞'} ảnh
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((carPageImage) => (
                    <div key={carPageImage.id} className="border rounded-lg p-4 space-y-2">
                      {/* Desktop Image */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                          <Monitor className="h-3 w-3" />
                          Desktop
                        </p>
                        <img
                          src={carPageImage.website_images.url}
                          alt={carPageImage.website_images.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                      
                      {/* Mobile Image */}
                      {carPageImage.website_images.mobile_url && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Smartphone className="h-3 w-3" />
                            Mobile
                          </p>
                          <img
                            src={carPageImage.website_images.mobile_url}
                            alt={`${carPageImage.website_images.name} - Mobile`}
                            className="w-full h-24 object-cover rounded"
                          />
                        </div>
                      )}
                      
                      <p className="text-sm font-medium">{carPageImage.website_images.name}</p>
                      {sectionInfo.showOrder && (
                        <p className="text-xs text-gray-500">Thứ tự: {carPageImage.display_order}</p>
                      )}
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
        );
      })}
    </div>
  );
};

export default CarPageImageManagement;
