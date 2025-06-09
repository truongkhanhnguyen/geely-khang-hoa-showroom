
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Plus, Trash2 } from "lucide-react";

interface SchemaSectionProps {
  seoSettings: any;
  handleInputChange: (field: string, value: any) => void;
}

const SchemaSection = ({ seoSettings, handleInputChange }: SchemaSectionProps) => {
  const addSchemaService = () => {
    const newService = {
      "@type": "Service",
      "name": "",
      "description": "",
      "provider": seoSettings.schema_name
    };
    
    const updatedServices = [...(seoSettings.schema_services || []), newService];
    handleInputChange("schema_services", updatedServices);
  };

  const updateSchemaService = (index: number, field: string, value: string) => {
    const updatedServices = [...(seoSettings.schema_services || [])];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    handleInputChange("schema_services", updatedServices);
  };

  const removeSchemaService = (index: number) => {
    const updatedServices = seoSettings.schema_services.filter((_: any, i: number) => i !== index);
    handleInputChange("schema_services", updatedServices);
  };

  const addSchemaOffer = () => {
    const newOffer = {
      "@type": "Offer",
      "name": "",
      "description": "",
      "price": "",
      "priceCurrency": "VND"
    };
    
    const updatedOffers = [...(seoSettings.schema_offers || []), newOffer];
    handleInputChange("schema_offers", updatedOffers);
  };

  const updateSchemaOffer = (index: number, field: string, value: string) => {
    const updatedOffers = [...(seoSettings.schema_offers || [])];
    updatedOffers[index] = { ...updatedOffers[index], [field]: value };
    handleInputChange("schema_offers", updatedOffers);
  };

  const removeSchemaOffer = (index: number) => {
    const updatedOffers = seoSettings.schema_offers.filter((_: any, i: number) => i !== index);
    handleInputChange("schema_offers", updatedOffers);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Schema.org Structured Data
        </CardTitle>
        <CardDescription>
          Cấu trúc dữ liệu để Google hiểu rõ hơn về doanh nghiệp
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Schema Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="schema_type">Loại Schema</Label>
            <Select value={seoSettings.schema_type} onValueChange={(value) => handleInputChange("schema_type", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AutoDealer">Auto Dealer</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
                <SelectItem value="LocalBusiness">Local Business</SelectItem>
                <SelectItem value="AutomotiveBusiness">Automotive Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schema_name">Tên doanh nghiệp</Label>
            <Input
              id="schema_name"
              value={seoSettings.schema_name}
              onChange={(e) => handleInputChange("schema_name", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="schema_description">Mô tả doanh nghiệp</Label>
          <Textarea
            id="schema_description"
            value={seoSettings.schema_description}
            onChange={(e) => handleInputChange("schema_description", e.target.value)}
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="schema_url">URL website</Label>
            <Input
              id="schema_url"
              value={seoSettings.schema_url}
              onChange={(e) => handleInputChange("schema_url", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schema_logo">URL Logo</Label>
            <Input
              id="schema_logo"
              value={seoSettings.schema_logo}
              onChange={(e) => handleInputChange("schema_logo", e.target.value)}
            />
          </div>
        </div>

        {/* Schema Services */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Dịch vụ</h4>
            <Button type="button" variant="outline" size="sm" onClick={addSchemaService}>
              <Plus className="h-4 w-4 mr-1" />
              Thêm dịch vụ
            </Button>
          </div>
          
          {seoSettings.schema_services?.map((service: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Dịch vụ {index + 1}</h5>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeSchemaService(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Tên dịch vụ"
                  value={service.name || ''}
                  onChange={(e) => updateSchemaService(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="Mô tả dịch vụ"
                  value={service.description || ''}
                  onChange={(e) => updateSchemaService(index, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Schema Offers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Ưu đãi</h4>
            <Button type="button" variant="outline" size="sm" onClick={addSchemaOffer}>
              <Plus className="h-4 w-4 mr-1" />
              Thêm ưu đãi
            </Button>
          </div>
          
          {seoSettings.schema_offers?.map((offer: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Ưu đãi {index + 1}</h5>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeSchemaOffer(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Tên ưu đãi"
                  value={offer.name || ''}
                  onChange={(e) => updateSchemaOffer(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="Giá"
                  value={offer.price || ''}
                  onChange={(e) => updateSchemaOffer(index, 'price', e.target.value)}
                />
                <Input
                  placeholder="Mô tả"
                  value={offer.description || ''}
                  onChange={(e) => updateSchemaOffer(index, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaSection;
