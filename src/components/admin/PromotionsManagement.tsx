
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  valid_until: string;
  type: string;
  image_url: string;
  bg_color: string;
  created_at: string;
}

const PromotionsManagement = () => {
  const { toast } = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    valid_until: "",
    type: "Giảm giá",
    image_url: "",
    bg_color: "from-blue-500 to-indigo-600"
  });

  const promotionTypes = [
    "Giảm giá",
    "Tài chính",
    "Quà tặng",
    "Ưu đãi đặc biệt",
    "Khuyến mãi mùa"
  ];

  const bgColorOptions = [
    { value: "from-blue-500 to-indigo-600", label: "Xanh dương", preview: "bg-gradient-to-r from-blue-500 to-indigo-600" },
    { value: "from-red-500 to-pink-600", label: "Đỏ", preview: "bg-gradient-to-r from-red-500 to-pink-600" },
    { value: "from-green-500 to-emerald-600", label: "Xanh lá", preview: "bg-gradient-to-r from-green-500 to-emerald-600" },
    { value: "from-purple-500 to-violet-600", label: "Tím", preview: "bg-gradient-to-r from-purple-500 to-violet-600" },
    { value: "from-orange-500 to-amber-600", label: "Cam", preview: "bg-gradient-to-r from-orange-500 to-amber-600" }
  ];

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPromotions(data || []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách khuyến mãi",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.discount || !formData.valid_until) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingId) {
        // Update existing promotion
        const { error } = await (supabase as any)
          .from('promotions')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: "Thành công",
          description: "Đã cập nhật khuyến mãi"
        });
      } else {
        // Create new promotion
        const { error } = await (supabase as any)
          .from('promotions')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Thành công",
          description: "Đã thêm khuyến mãi mới"
        });
      }

      setFormData({
        title: "",
        description: "",
        discount: "",
        valid_until: "",
        type: "Giảm giá",
        image_url: "",
        bg_color: "from-blue-500 to-indigo-600"
      });
      setEditingId(null);
      setShowAddForm(false);
      fetchPromotions();
    } catch (error) {
      console.error('Error saving promotion:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu khuyến mãi",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setFormData({
      title: promotion.title,
      description: promotion.description,
      discount: promotion.discount,
      valid_until: promotion.valid_until,
      type: promotion.type,
      image_url: promotion.image_url || "",
      bg_color: promotion.bg_color
    });
    setEditingId(promotion.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) return;

    try {
      const { error } = await (supabase as any)
        .from('promotions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã xóa khuyến mãi"
      });

      fetchPromotions();
    } catch (error) {
      console.error('Error deleting promotion:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa khuyến mãi",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      discount: "",
      valid_until: "",
      type: "Giảm giá",
      image_url: "",
      bg_color: "from-blue-500 to-indigo-600"
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                {editingId ? "Chỉnh Sửa Khuyến Mãi" : "Thêm Khuyến Mãi Mới"}
              </span>
              <Button variant="outline" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tiêu đề *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ví dụ: Ưu đãi cuối năm"
                />
              </div>
              <div>
                <Label>Loại khuyến mãi *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {promotionTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Mô tả *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả chi tiết về chương trình khuyến mãi"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Giá trị khuyến mãi *</Label>
                <Input
                  value={formData.discount}
                  onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="Ví dụ: 50,000,000 VNĐ hoặc 0% lãi suất"
                />
              </div>
              <div>
                <Label>Hạn sử dụng *</Label>
                <Input
                  value={formData.valid_until}
                  onChange={(e) => setFormData(prev => ({ ...prev, valid_until: e.target.value }))}
                  placeholder="Ví dụ: 31/12/2024"
                />
              </div>
            </div>

            <div>
              <Label>URL hình ảnh</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/image.jpg (Kích thước khuyến nghị: 400x250)"
              />
            </div>

            <div>
              <Label>Màu nền</Label>
              <Select 
                value={formData.bg_color} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, bg_color: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bgColorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded mr-2 ${option.preview}`}></div>
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSubmit} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingId ? "Cập nhật" : "Thêm mới"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {!showAddForm && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Danh Sách Khuyến Mãi ({promotions.length})</h3>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm Khuyến Mãi
          </Button>
        </div>
      )}

      {/* Promotions List */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Hạn sử dụng</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    {promotion.image_url ? (
                      <img 
                        src={promotion.image_url} 
                        alt={promotion.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className={`w-16 h-10 rounded bg-gradient-to-r ${promotion.bg_color}`}></div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{promotion.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{promotion.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{promotion.type}</Badge>
                  </TableCell>
                  <TableCell>{promotion.discount}</TableCell>
                  <TableCell>{promotion.valid_until}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(promotion)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(promotion.id)}
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

export default PromotionsManagement;
