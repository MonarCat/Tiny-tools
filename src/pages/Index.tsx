
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import URLShortener from '@/components/URLShortener';
import ImageOptimizer from '@/components/ImageOptimizer';
import DocumentMinifier from '@/components/DocumentMinifier';
import { Link, Image, FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Tiniest
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            The ultimate toolkit for making everything smaller. Tinify URLs, optimize images, and compress documents - all in one place, completely free.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="urls" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="urls" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                URL Shortener
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Image Optimizer
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Document Minifier
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="urls">
              <URLShortener />
            </TabsContent>
            
            <TabsContent value="images">
              <ImageOptimizer />
            </TabsContent>
            
            <TabsContent value="documents">
              <DocumentMinifier />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
