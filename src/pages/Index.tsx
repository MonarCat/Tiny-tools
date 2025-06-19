
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import URLShortener from '@/components/URLShortener';
import ImageOptimizer from '@/components/ImageOptimizer';
import DocumentMinifier from '@/components/DocumentMinifier';
import TinyToolsLogo from '@/components/TinyToolsLogo';
import { Link, Image, FileText, Shield, Globe, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <TinyToolsLogo size="lg" />
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Tiny-Tools
          </h1>
          <p className="text-2xl text-gray-700 font-medium mb-4">
            Make Everything Smaller, Faster, Better
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            The ultimate free toolkit for digital optimization. Shorten URLs, compress images, and minify documents - all in one powerful platform that's completely free and lightning fast.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-gray-700 font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <TinyToolsLogo size="sm" />
              <span className="text-gray-700 font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Globe className="h-5 w-5 text-purple-500" />
              <span className="text-gray-700 font-medium">No Registration</span>
            </div>
          </div>
        </div>
        
        {/* Main Tools Section */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="urls" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm shadow-lg border-0 h-14">
              <TabsTrigger 
                value="urls" 
                className="flex items-center gap-3 text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Link className="h-5 w-5" />
                URL Shortener
              </TabsTrigger>
              <TabsTrigger 
                value="images" 
                className="flex items-center gap-3 text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Image className="h-5 w-5" />
                Image Optimizer
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="flex items-center gap-3 text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
              >
                <FileText className="h-5 w-5" />
                Document Minifier
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="urls" className="mt-8">
              <URLShortener />
            </TabsContent>
            
            <TabsContent value="images" className="mt-8">
              <ImageOptimizer />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-8">
              <DocumentMinifier />
            </TabsContent>
          </Tabs>
        </div>

        {/* Why Choose Tiny-Tools Section */}
        <div className="mt-20 mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Tiny-Tools?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <TinyToolsLogo size="md" className="mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Process your files in seconds with our optimized algorithms. No waiting, no delays.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Secure & Private</h3>
                <p className="text-gray-600">
                  Your files are processed securely and never stored on our servers. Complete privacy guaranteed.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Always Free</h3>
                <p className="text-gray-600">
                  All tools are completely free with no hidden costs, limits, or premium tiers. Forever.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <TinyToolsLogo size="md" className="text-white" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Tiny-Tools</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Making the web smaller, faster, and better - one tool at a time.
            </p>
            
            <div className="flex justify-center items-center gap-2 mb-6">
              <Mail className="h-5 w-5 text-green-400" />
              <a 
                href="mailto:iammwombe@gmail.com" 
                className="text-green-400 hover:text-green-300 transition-colors font-medium"
              >
                iammwombe@gmail.com
              </a>
            </div>
            
            <div className="border-t border-gray-700 pt-6 mt-6">
              <p className="text-gray-400 text-sm">
                © 2025 Tiny-Tools. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
