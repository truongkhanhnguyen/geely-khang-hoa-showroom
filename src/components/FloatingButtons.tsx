
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingButtons = () => {
  const phoneNumber = "0879890879";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleZalo = () => {
    window.open(`https://zalo.me/${phoneNumber}`, '_blank');
  };

  return (
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
  );
};

export default FloatingButtons;
