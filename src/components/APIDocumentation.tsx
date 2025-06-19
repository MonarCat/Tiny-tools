
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Link, Image, FileText } from 'lucide-react';

const APIDocumentation = () => {
  return (
    <div className="mt-16">
      <Card className="p-8 bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Code className="h-12 w-12 text-indigo-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Developer API</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Integrate Tiniest's powerful compression tools into your applications with our simple REST API.
          </p>
        </div>

        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              URL API
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image API
            </TabsTrigger>
            <TabsTrigger value="document" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Shorten URL</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="text-blue-400">POST</div>
                  <div>https://tiniest.app/api/shorten</div>
                  <br />
                  <div className="text-yellow-400">// Request body</div>
                  <div>{`{`}</div>
                  <div>&nbsp;&nbsp;"url": "https://example.com/very-long-url"</div>
                  <div>{`}`}</div>
                  <br />
                  <div className="text-yellow-400">// Response</div>
                  <div>{`{`}</div>
                  <div>&nbsp;&nbsp;"short_url": "https://tiniest.app/abc123",</div>
                  <div>&nbsp;&nbsp;"original_url": "https://example.com/very-long-url",</div>
                  <div>&nbsp;&nbsp;"created_at": "2024-01-01T12:00:00Z"</div>
                  <div>{`}`}</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="image" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Optimize Image</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="text-blue-400">POST</div>
                  <div>https://tiniest.app/api/optimize-image</div>
                  <br />
                  <div className="text-yellow-400">// Form data</div>
                  <div>Content-Type: multipart/form-data</div>
                  <div>image: [file]</div>
                  <div>quality: 0.8 (optional, 0.1-1.0)</div>
                  <div>max_width: 1920 (optional)</div>
                  <div>max_height: 1080 (optional)</div>
                  <br />
                  <div className="text-yellow-400">// Response</div>
                  <div>Content-Type: image/jpeg</div>
                  <div>[optimized image binary data]</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="document" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Minify Document</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="text-blue-400">POST</div>
                  <div>https://tiniest.app/api/minify-document</div>
                  <br />
                  <div className="text-yellow-400">// Form data</div>
                  <div>Content-Type: multipart/form-data</div>
                  <div>document: [file]</div>
                  <div>type: "css" | "js" | "html" | "json" | "text"</div>
                  <br />
                  <div className="text-yellow-400">// Response</div>
                  <div>{`{`}</div>
                  <div>&nbsp;&nbsp;"minified_content": "...",</div>
                  <div>&nbsp;&nbsp;"original_size": 1024,</div>
                  <div>&nbsp;&nbsp;"minified_size": 512,</div>
                  <div>&nbsp;&nbsp;"compression_ratio": 50.0</div>
                  <div>{`}`}</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Getting Started</h4>
          <p className="text-blue-700 text-sm">
            All API endpoints are free to use with rate limiting. For higher limits and premium features, 
            consider supporting us with a donation. No API key required for basic usage.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default APIDocumentation;
