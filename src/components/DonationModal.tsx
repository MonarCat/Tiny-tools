
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Heart, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DonationModalProps {
  amount: number;
  children: React.ReactNode;
}

const DonationModal = ({ amount, children }: DonationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleDonation = async () => {
    if (!donorName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name for the donation.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-donation', {
        body: {
          amount: amount * 100, // Convert to cents
          donorName: donorName.trim(),
          email: email.trim() || undefined,
          message: message.trim() || undefined,
        },
      });

      if (error) throw error;

      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        setIsOpen(false);
        
        toast({
          title: "Redirecting to Payment",
          description: "Opening Stripe checkout in a new tab...",
        });
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-600" />
            Donate ${amount}
          </DialogTitle>
          <DialogDescription>
            Your support helps keep Tiniest free and fast for everyone!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="donorName">Name *</Label>
            <Input
              id="donorName"
              placeholder="Your name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              placeholder="Leave a message of support..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 resize-none"
              rows={3}
            />
          </div>
          
          <Button
            onClick={handleDonation}
            disabled={isLoading || !donorName.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Donate ${amount}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
