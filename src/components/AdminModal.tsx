
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AdminModal = ({ isOpen, onClose, onLogin }: AdminModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "200323") {
      onLogin();
      setPassword("");
      setError("");
      onClose();
    } else {
      setError("Mật khẩu không đúng");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Đăng nhập Admin
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu admin"
              className="mt-1"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
