
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, BarChart3, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ShareButton from './ShareButton';

interface ShortenedURLProps {
  original: string;
  shortened: string;
  clicks: number;
  createdAt: Date;
}

const ShortenedURL = ({ original, shortened, clicks, createdAt }: ShortenedURLProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortened);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleVisit = () => {
    window.open(original, '_blank');
  };

  const truncateUrl = (url: string, maxLength: number) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="font-mono text-lg font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
              {shortened}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BarChart3 className="h-4 w-4" />
              <span>{clicks} clicks</span>
              <span>•</span>
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
          <div className="text-gray-600 text-sm">
            <span className="font-medium">Original:</span>{' '}
            <span className="break-all">{truncateUrl(original, 80)}</span>
          </div>
        </div>
        
        <div className="flex gap-2 lg:flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleVisit}
            className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Visit
          </Button>

          <ShareButton content={shortened} type="url" />
        </div>
      </div>
    </Card>
  );
};

export default ShortenedURL;
