
export interface ConversionResult {
  convertedFile: File;
  originalSize: number;
  convertedSize: number;
  compressionRatio: number;
}

export const convertToWebP = async (file: File, quality: number = 0.85): Promise<ConversionResult> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Set canvas dimensions to image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image on canvas
      ctx?.drawImage(img, 0, 0);

      // Convert to WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image'));
            return;
          }

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

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load the image
    img.src = URL.createObjectURL(file);
  });
};

export const shouldConvertToWebP = (file: File | null): boolean => {
  if (!file) return false;
  const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
  return supportedFormats.includes(file.type.toLowerCase());
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
