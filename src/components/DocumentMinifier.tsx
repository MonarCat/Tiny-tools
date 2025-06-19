
import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PayPalButton from './PayPalButton';
import ShareButton from './ShareButton';

interface MinifiedDocument {
  original: File;
  minified: string;
  originalSize: number;
  minifiedSize: number;
  compressionRatio: number;
}

const DocumentMinifier = () => {
  const [documents, setDocuments] = useState<MinifiedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const minifyCSS = (css: string): string => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
      .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
      .replace(/;\s*/g, ';') // Remove spaces after semicolons
      .replace(/,\s*/g, ',') // Remove spaces after commas
      .trim();
  };

  const minifyJS = (js: string): string => {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around operators
      .trim();
  };

  const minifyHTML = (html: string): string => {
    return html
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .trim();
  };

  const minifyJSON = (json: string): string => {
    try {
      return JSON.stringify(JSON.parse(json));
    } catch {
      return json.replace(/\s+/g, ' ').trim();
    }
  };

  const minifyDocument = useCallback(async (file: File): Promise<MinifiedDocument> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        let minified = '';
        
        const extension = file.name.split('.').pop()?.toLowerCase();
        
        switch (extension) {
          case 'css':
            minified = minifyCSS(content);
            break;
          case 'js':
          case 'jsx':
          case 'ts':
          case 'tsx':
            minified = minifyJS(content);
            break;
          case 'html':
          case 'htm':
            minified = minifyHTML(content);
            break;
          case 'json':
            minified = minifyJSON(content);
            break;
          default:
            minified = content.replace(/\s+/g, ' ').trim();
        }
        
        const originalSize = new Blob([content]).size;
        const minifiedSize = new Blob([minified]).size;
        const compressionRatio = ((originalSize - minifiedSize) / originalSize) * 100;
        
        resolve({
          original: file,
          minified,
          originalSize,
          minifiedSize,
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
    const validDocuments = Array.from(files).filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['css', 'js', 'jsx', 'ts', 'tsx', 'html', 'htm', 'json', 'xml', 'svg'].includes(extension || '');
    });

    if (validDocuments.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select valid document files (CSS, JS, HTML, JSON, etc.).",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const minifiedDocuments = await Promise.all(
        validDocuments.map(file => minifyDocument(file))
      );

      setDocuments(prev => [...minifiedDocuments, ...prev.slice(0, 5)]);
      
      toast({
        title: "Documents minified!",
        description: `Successfully minified ${minifiedDocuments.length} document(s).`,
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

  const downloadMinified = (document: MinifiedDocument) => {
    const blob = new Blob([document.minified], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    const nameWithoutExt = document.original.name.replace(/\.[^/.]+$/, '');
    const extension = document.original.name.split('.').pop();
    a.download = `${nameWithoutExt}.min.${extension}`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
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
              Minify and compress your code files. Supports CSS, JavaScript, HTML, JSON, and more.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-400 transition-colors">
            <input
              type="file"
              multiple
              accept=".css,.js,.jsx,.ts,.tsx,.html,.htm,.json,.xml,.svg"
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
                    Supports CSS, JS, HTML, JSON, XML, SVG • Multiple files allowed
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
            {documents.map((document, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-2">{document.original.name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Original:</span> {formatFileSize(document.originalSize)}
                      </div>
                      <div>
                        <span className="font-medium">Minified:</span> {formatFileSize(document.minifiedSize)}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Saved:</span>{' '}
                        <span className="text-green-600 font-semibold">
                          {document.compressionRatio.toFixed(1)}% ({formatFileSize(document.originalSize - document.minifiedSize)})
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => downloadMinified(document)}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <ShareButton 
                      content={`Minified ${document.original.name} - saved ${document.compressionRatio.toFixed(1)}% with Tiny-Tools!`} 
                      type="document"
                      filename={document.original.name}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <PayPalButton />
    </div>
  );
};

export default DocumentMinifier;
