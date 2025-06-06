
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

interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  date: string;
  created_at: string;
}

const NewsManagement = () => {
  const { toast } = useToast();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "Tin tức",
    date: new Date().toISOString().split('T')[0]
  });

  const newsCategories = [
    "Tin tức",
    "Công nghệ",
    "Khuyến mãi",
    "An toàn",
    "Sự kiện",
    "Đánh giá",
    "Thông báo"
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách tin tức",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ tiêu đề, tóm tắt và nội dung",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingId) {
        // Update existing news
        const { error } = await supabase
          .from('news')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: "Thành công",
          description: "Đã cập nhật tin tức"
        });
      } else {
        // Create new news
        const { error } = await supabase
          .from('news')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Thành công",
          description: "Đã thêm tin tức mới"
        });
      }

      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image_url: "",
        category: "Tin tức",
        date: new Date().toISOString().split('T')[0]
      });
      setEditingId(null);
      setShowAddForm(false);
      fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu tin tức",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (newsItem: News) => {
    setFormData({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content || "",
      image_url: newsItem.image_url || "",
      category: newsItem.category,
      date: newsItem.date
    });
    setEditingId(newsItem.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tin tức này?")) return;

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã xóa tin tức"
      });

      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa tin tức",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "Tin tức",
      date: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      "Tin tức": "bg-blue-100 text-blue-800",
      "Công nghệ": "bg-purple-100 text-purple-800",
      "Khuyến mãi": "bg-green-100 text-green-800",
      "An toàn": "bg-red-100 text-red-800",
      "Sự kiện": "bg-orange-100 text-orange-800",
      "Đánh giá": "bg-pink-100 text-pink-800",
      "Thông báo": "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors["Tin tức"];
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
                {editingId ? "Chỉnh Sửa Tin Tức" : "Thêm Tin Tức Mới"}
              </span>
              <Button variant="outline" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tiêu đề *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Tiêu đề tin tức"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Danh mục *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {newsCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ngày đăng *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label>Tóm tắt *</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Tóm tắt ngắn gọn về tin tức"
                rows={2}
              />
            </div>

            <div>
              <Label>Nội dung chi tiết *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Nội dung đầy đủ của tin tức"
                rows={5}
              />
            </div>

            <div>
              <Label>URL hình ảnh</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/image.jpg (Kích thước khuyến nghị: 400x250)"
              />
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
          <h3 className="text-lg font-semibold">Danh Sách Tin Tức ({news.length})</h3>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm Tin Tức
          </Button>
        </div>
      )}

      {/* News List */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Ngày đăng</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((newsItem) => (
                <TableRow key={newsItem.id}>
                  <TableCell>
                    {newsItem.image_url ? (
                      <img 
                        src={newsItem.image_url} 
                        alt={newsItem.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        Không có ảnh
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{newsItem.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{newsItem.excerpt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryBadgeColor(newsItem.category)}>
                      {newsItem.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(newsItem.date).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(newsItem)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(newsItem.id)}
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

export default NewsManagement;
