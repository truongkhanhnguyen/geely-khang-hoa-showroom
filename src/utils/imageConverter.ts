
export interface ConversionResult {
  convertedFile: File;
  originalSize: number;
  convertedSize: number;
  compressionRatio: number;
}

export const convertToWebP = async (file: File, quality: number = 0.85): Promise<ConversionResult> => {
  return new Promise((resolve, reject) => {
    console.log('🔄 Starting WebP conversion for file:', {
      name: file.name,
      size: file.size,
      type: file.type,
      quality
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      console.log('📐 Image loaded, dimensions:', {
        width: img.width,
        height: img.height
      });

      // Set canvas dimensions to image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image on canvas
      ctx?.drawImage(img, 0, 0);

      // Convert to WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('❌ Failed to convert image to blob');
            reject(new Error('Failed to convert image'));
            return;
          }

          console.log('✅ WebP conversion successful:', {
            originalSize: file.size,
            convertedSize: blob.size,
            compressionRatio: Math.round(((file.size - blob.size) / file.size) * 100)
          });

          // Create new file with WebP extension
          const fileName = file.name.replace(/\.[^/.]+$/, '.webp');
          const convertedFile = new File([blob], fileName, {
            type: 'image/webp',
            lastModified: Date.now()
          });

          const originalSize = file.size;
          const convertedSize = convertedFile.size;
          const compressionRatio = Math.round(((originalSize - convertedSize) / originalSize) * 100);

          resolve({
            convertedFile,
            originalSize,
            convertedSize,
            compressionRatio
          });
        },
        'image/webp',
        quality
      );
    };

    img.onerror = (error) => {
      console.error('❌ Failed to load image:', error);
      reject(new Error('Failed to load image'));
    };

    // Load the image
    img.src = URL.createObjectURL(file);
  });
};

export const shouldConvertToWebP = (file: File | null): boolean => {
  if (!file) {
    console.log('❌ No file provided for WebP check');
    return false;
  }
  
  const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
  const shouldConvert = supportedFormats.includes(file.type.toLowerCase());
  
  console.log('🔍 WebP conversion check:', {
    fileName: file.name,
    fileType: file.type,
    shouldConvert
  });
  
  return shouldConvert;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
