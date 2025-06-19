
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, Github, Mail, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  content: string;
  type: 'url' | 'image' | 'document';
  filename?: string;
}

const ShareButton = ({ content, type, filename }: ShareButtonProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareText = `Check out this ${type} I optimized with Tiny-Tools! ${content}`;
  const siteUrl = 'https://tiny-tools.app';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}&summary=${encodeURIComponent(shareText)}`,
    github: `https://github.com`,
    email: `mailto:?subject=Check out Tiny-Tools&body=${encodeURIComponent(shareText + '\n\nVisit: ' + siteUrl)}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>

      {showShareMenu && (
        <Card className="absolute top-full mt-2 right-0 p-4 bg-white shadow-lg border z-50 min-w-[200px]">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800 mb-3">Share your {type}</h4>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="w-full justify-start gap-2 hover:bg-gray-50"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="w-full justify-start gap-2 hover:bg-blue-50"
            >
              <Twitter className="h-4 w-4 text-blue-500" />
              Twitter
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="w-full justify-start gap-2 hover:bg-blue-50"
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              Facebook
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="w-full justify-start gap-2 hover:bg-blue-50"
            >
              <Linkedin className="h-4 w-4 text-blue-700" />
              LinkedIn
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('github')}
              className="w-full justify-start gap-2 hover:bg-gray-50"
            >
              <Github className="h-4 w-4 text-gray-800" />
              GitHub
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('email')}
              className="w-full justify-start gap-2 hover:bg-gray-50"
            >
              <Mail className="h-4 w-4 text-gray-600" />
              Email
            </Button>
          </div>
          
          <button
            onClick={() => setShowShareMenu(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </Card>
      )}
    </div>
  );
};

export default ShareButton;
