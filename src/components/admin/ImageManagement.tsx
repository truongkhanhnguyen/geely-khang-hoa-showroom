
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WebsiteImage {
  id: string;
  name: string;
  url: string;
  category: string;
  recommended_size: string;
  description: string;
  created_at: string;
}

const ImageManagement = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "general",
    url: "",
    description: ""
  });

  const imageCategories = [
    { value: "hero", label: "Hero Banner", size: "1920x1080", description: "Hình ảnh banner chính" },
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
      const { data, error } = await (supabase as any)
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

  const handleUpload = async () => {
    if (!uploadForm.name || !uploadForm.url) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ tên và URL hình ảnh",
        variant: "destructive"
      });
      return;
    }

    try {
      const categoryInfo = imageCategories.find(cat => cat.value === uploadForm.category);
      
      const { error } = await (supabase as any)
        .from('website_images')
        .insert([{
          name: uploadForm.name,
          url: uploadForm.url,
          category: uploadForm.category,
          recommended_size: categoryInfo?.size || "Tùy chỉnh",
          description: uploadForm.description
        }]);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã thêm hình ảnh mới"
      });

      setUploadForm({
        name: "",
        category: "general",
        url: "",
        description: ""
      });

      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm hình ảnh",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await (supabase as any)
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
            Thêm Hình Ảnh Mới
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
                      {cat.label} ({cat.size})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>URL hình ảnh *</Label>
            <Input
              value={uploadForm.url}
              onChange={(e) => setUploadForm(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label>Mô tả</Label>
            <Input
              value={uploadForm.description}
              onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Mô tả ngắn về hình ảnh"
            />
          </div>

          <Button onClick={handleUpload} className="w-full">
            Thêm Hình Ảnh
          </Button>
        </CardContent>
      </Card>

      {/* Recommended Sizes Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Hướng Dẫn Kích Thước Hình Ảnh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <TableHead>Kích thước</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-16 h-16 object-cover rounded"
                    />
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
                  <TableCell>{image.recommended_size}</TableCell>
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
                        onClick={() => handleDelete(image.id)}
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
