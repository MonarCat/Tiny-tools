import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaystackButton from './PaystackButton';

interface MinifiedDocument {
  original: File;
  minified: Blob;
  originalSize: number;
  minifiedSize: number;
  compressionRatio: number;
}

const DocumentMinifier = () => {
  const [documents, setDocuments] = useState<MinifiedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const minifyText = (text: string): string => {
    return text
      // Remove multiple spaces and replace with single space
      .replace(/\s+/g, ' ')
      // Remove spaces around punctuation
      .replace(/\s*([.,;:!?])\s*/g, '$1 ')
      // Remove trailing spaces
      .replace(/\s+$/gm, '')
      // Remove leading spaces
      .replace(/^\s+/gm, '')
      // Remove empty lines
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  const minifyCSS = (css: string): string => {
    return css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove spaces around special characters
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      // Remove trailing semicolons before }
      .replace(/;}/g, '}')
      // Remove unnecessary spaces
      .replace(/\s+/g, ' ')
      .trim();
  };

  const minifyJS = (js: string): string => {
    return js
      // Remove single-line comments (basic)
      .replace(/\/\/.*$/gm, '')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      // Remove spaces around operators and punctuation
      .replace(/\s*([=+\-*/<>!&|{}();,])\s*/g, '$1')
      .trim();
  };

  const minifyDocument = useCallback(async (file: File): Promise<MinifiedDocument> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        let minifiedContent: string;

        // Determine file type and apply appropriate minification
        const extension = file.name.split('.').pop()?.toLowerCase();
        
        switch (extension) {
          case 'css':
            minifiedContent = minifyCSS(content);
            break;
          case 'js':
          case 'javascript':
            minifiedContent = minifyJS(content);
            break;
          case 'json':
            try {
              // Parse and stringify JSON to remove formatting
              minifiedContent = JSON.stringify(JSON.parse(content));
            } catch {
              minifiedContent = minifyText(content);
            }
            break;
          case 'html':
          case 'htm':
            minifiedContent = content
              .replace(/\s+/g, ' ')
              .replace(/>\s+</g, '><')
              .replace(/<!--[\s\S]*?-->/g, '')
              .trim();
            break;
          default:
            minifiedContent = minifyText(content);
        }

        const blob = new Blob([minifiedContent], { type: file.type });
        const compressionRatio = ((file.size - blob.size) / file.size) * 100;

        resolve({
          original: file,
          minified: blob,
          originalSize: file.size,
          minifiedSize: blob.size,
          compressionRatio: Math.max(0, compressionRatio)
        });
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const validFiles = Array.from(files).filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['txt', 'css', 'js', 'json', 'html', 'htm', 'xml', 'csv'].includes(extension || '');
    });

    if (validFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select valid text-based files (TXT, CSS, JS, JSON, HTML, XML, CSV).",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const minifiedDocs = await Promise.all(
        validFiles.map(file => minifyDocument(file))
      );

      setDocuments(prev => [...minifiedDocs, ...prev.slice(0, 5)]);
      
      toast({
        title: "Documents minified!",
        description: `Successfully minified ${minifiedDocs.length} document(s).`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to minify documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadMinified = (doc: MinifiedDocument) => {
    const url = URL.createObjectURL(doc.minified);
    const a = document.createElement('a');
    a.href = url;
    const nameWithoutExt = doc.original.name.replace(/\.[^/.]+$/, '');
    const extension = doc.original.name.split('.').pop();
    a.download = `${nameWithoutExt}.min.${extension}`;
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
            <FileText className="h-16 w-16 text-purple-500" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Document Minifier</h2>
            <p className="text-gray-600">
              Compress text-based files by removing unnecessary whitespace and comments. Perfect for CSS, JS, JSON, HTML, and more.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-400 transition-colors">
            <input
              type="file"
              multiple
              accept=".txt,.css,.js,.json,.html,.htm,.xml,.csv"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="document-upload"
              disabled={isProcessing}
            />
            <label htmlFor="document-upload" className="cursor-pointer">
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Drop documents here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports TXT, CSS, JS, JSON, HTML, XML, CSV • Multiple files allowed
                  </p>
                </div>
              </div>
            </label>
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Minifying documents...</span>
            </div>
          )}
        </div>
      </Card>

      {documents.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 text-center">
            Minified Documents
          </h3>
          <div className="grid gap-4">
            {documents.map((doc, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-2">{doc.original.name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Original:</span> {formatFileSize(doc.originalSize)}
                      </div>
                      <div>
                        <span className="font-medium">Minified:</span> {formatFileSize(doc.minifiedSize)}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Saved:</span>{' '}
                        <span className="text-green-600 font-semibold">
                          {doc.compressionRatio.toFixed(1)}% ({formatFileSize(doc.originalSize - doc.minifiedSize)})
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => downloadMinified(doc)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
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

export default DocumentMinifier;
