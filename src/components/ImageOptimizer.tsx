import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaystackButton from './PaystackButton';

interface OptimizedImage {
  original: File;
  optimized: Blob;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
}

const ImageOptimizer = () => {
  const [images, setImages] = useState<OptimizedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const optimizeImage = useCallback(async (file: File): Promise<OptimizedImage> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 1920x1080 while maintaining aspect ratio)
        const maxWidth = 1920;
        const maxHeight = 1080;
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressionRatio = ((file.size - blob.size) / file.size) * 100;
              resolve({
                original: file,
                optimized: blob,
                originalSize: file.size,
                optimizedSize: blob.size,
                compressionRatio: Math.max(0, compressionRatio)
              });
            }
          },
          'image/jpeg',
          0.8
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const validImages = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );

    if (validImages.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select valid image files.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const optimizedImages = await Promise.all(
        validImages.map(file => optimizeImage(file))
      );

      setImages(prev => [...optimizedImages, ...prev.slice(0, 5)]);
      
      toast({
        title: "Images optimized!",
        description: `Successfully optimized ${optimizedImages.length} image(s).`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadOptimized = (image: OptimizedImage) => {
    const url = URL.createObjectURL(image.optimized);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized_${image.original.name.replace(/\.[^/.]+$/, '')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="p-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <ImageIcon className="h-16 w-16 text-blue-500" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Image Optimizer</h2>
            <p className="text-gray-600">
              Compress and optimize your images while maintaining quality. Supports JPEG, PNG, and WebP formats.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="image-upload"
              disabled={isProcessing}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Drop images here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PNG, JPEG, WebP • Multiple files allowed
                  </p>
                </div>
              </div>
            </label>
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Optimizing images...</span>
            </div>
          )}
        </div>
      </Card>

      {images.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 text-center">
            Optimized Images
          </h3>
          <div className="grid gap-4">
            {images.map((image, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-2">{image.original.name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Original:</span> {formatFileSize(image.originalSize)}
                      </div>
                      <div>
                        <span className="font-medium">Optimized:</span> {formatFileSize(image.optimizedSize)}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Saved:</span>{' '}
                        <span className="text-green-600 font-semibold">
                          {image.compressionRatio.toFixed(1)}% ({formatFileSize(image.originalSize - image.optimizedSize)})
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => downloadOptimized(image)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <PaystackButton />
    </div>
  );
};

export default ImageOptimizer;
