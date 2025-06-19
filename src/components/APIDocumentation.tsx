
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const APIDocumentation = () => {
  const [copied, setCopied] = useState('');
  const { toast } = useToast();

  const copyCode = async (code: string, type: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy code.",
        variant: "destructive",
      });
    }
  };

  const apiExample = `// JavaScript/Node.js Example
const response = await fetch('https://tiniest.app/api/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-very-long-url.com/path'
  })
});

const data = await response.json();
console.log(data.shortUrl); // https://tiniest.app/abc123`;

  const curlExample = `curl -X POST https://tiniest.app/api/shorten \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://your-very-long-url.com/path"}'`;

  const widgetExample = `<!-- Embed Tiniest Widget -->
<iframe 
  src="https://tiniest.app/widget" 
  width="400" 
  height="200" 
  frameborder="0">
</iframe>`;

  return (
    <div className="mt-16 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <Code className="h-8 w-8 text-green-600" />
          Developer API
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Integrate Tiniest into your applications with our simple REST API. Perfect for SaaS platforms, mobile apps, and automation tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-700">JavaScript SDK</h3>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{apiExample}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={() => copyCode(apiExample, 'js')}
            >
              {copied === 'js' ? 'Copied!' : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-700">cURL Example</h3>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{curlExample}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={() => copyCode(curlExample, 'curl')}
            >
              {copied === 'curl' ? 'Copied!' : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-700">Widget Embed</h3>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{widgetExample}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={() => copyCode(widgetExample, 'widget')}
            >
              {copied === 'widget' ? 'Copied!' : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-green-50 border-green-200">
        <h3 className="text-xl font-semibold mb-4 text-green-800">API Features</h3>
        <div className="grid md:grid-cols-2 gap-4 text-green-700">
          <div>
            <h4 className="font-semibold mb-2">🚀 Fast & Reliable</h4>
            <p className="text-sm">99.9% uptime with global CDN distribution</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📊 Analytics</h4>
            <p className="text-sm">Track clicks, referrers, and geographic data</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🔒 Secure</h4>
            <p className="text-sm">HTTPS everywhere with malware protection</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">💰 Free Tier</h4>
            <p className="text-sm">1000 URLs/month free, then pay-as-you-go</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default APIDocumentation;
