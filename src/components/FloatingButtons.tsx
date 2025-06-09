
import { Phone, MessageCircle, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AuthModal from "./AuthModal";
import AdminPanel from "./AdminPanel";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const FloatingButtons = () => {
  const phoneNumber = "0879890879";
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleZalo = () => {
    window.open(`https://zalo.me/${phoneNumber}`, '_blank');
  };

  const handleAdminLogin = () => {
    if (isAdmin) {
      setShowAdminPanel(true);
    } else {
      toast({
        title: "Không có quyền truy cập",
        description: "Bạn không có quyền truy cập vào panel admin.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Lỗi đăng xuất",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Đăng xuất thành công",
        description: "Hẹn gặp lại bạn!",
      });
      setShowAdminPanel(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <Button
          onClick={handleZalo}
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 p-0 shadow-lg"
          title="Chat Zalo"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        <Button
          onClick={handleCall}
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-lg"
          title="Gọi điện"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>

      {/* Admin/Auth Button - Bottom left */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-2">
        {user ? (
          <>
            {isAdmin && (
              <Button
                onClick={() => setShowAdminPanel(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                title="Admin Panel"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Panel
              </Button>
            )}
            <Button
              onClick={handleSignOut}
              size="sm"
              variant="outline"
              className="bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 shadow-lg"
              title="Đăng xuất"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setShowAuthModal(true)}
            size="sm"
            variant="outline"
            className="bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 shadow-lg"
            title="Đăng nhập"
          >
            <Settings className="h-4 w-4 mr-2" />
            Đăng nhập
          </Button>
        )}
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAdminLogin={handleAdminLogin}
      />

      {isAdmin && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </>
  );
};

export default FloatingButtons;
