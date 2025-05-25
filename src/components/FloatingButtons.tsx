
import { Phone, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AdminModal from "./AdminModal";
import AdminPanel from "./AdminPanel";

const FloatingButtons = () => {
  const phoneNumber = "0879890879";
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleZalo = () => {
    window.open(`https://zalo.me/${phoneNumber}`, '_blank');
  };

  const handleAdminLogin = () => {
    setShowAdminPanel(true);
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

      {/* Admin Button - Bottom left */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setShowAdminModal(true)}
          size="sm"
          variant="outline"
          className="bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 shadow-lg"
          title="Admin Login"
        >
          <Settings className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </div>

      <AdminModal 
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onLogin={handleAdminLogin}
      />

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </>
  );
};

export default FloatingButtons;
