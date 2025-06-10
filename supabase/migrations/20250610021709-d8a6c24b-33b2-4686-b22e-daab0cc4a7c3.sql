
-- Create table to manage car page images mapping
CREATE TABLE public.car_page_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  car_model TEXT NOT NULL CHECK (car_model IN ('coolray', 'monjaro', 'ex5')),
  image_id UUID REFERENCES public.website_images(id) ON DELETE CASCADE,
  display_section TEXT NOT NULL CHECK (display_section IN ('hero', 'gallery', 'features')),
  display_order INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(car_model, image_id, display_section)
);

-- Add RLS policies
ALTER TABLE public.car_page_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view car page images" 
  ON public.car_page_images 
  FOR SELECT 
  USING (true);

-- Create policy for admin write access (you'll need to adjust based on your admin role system)
CREATE POLICY "Admins can manage car page images" 
  ON public.car_page_images 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create trigger to update updated_at
CREATE TRIGGER update_car_page_images_updated_at
  BEFORE UPDATE ON public.car_page_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_car_page_images_car_model ON public.car_page_images(car_model);
CREATE INDEX idx_car_page_images_section_order ON public.car_page_images(display_section, display_order);
