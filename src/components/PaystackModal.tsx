
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

declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface PaystackModalProps {
  amount: number;
  children: React.ReactNode;
}

const PaystackModal = ({ amount, children }: PaystackModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleDonation = () => {
    if (!donorName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name for the donation.",
        variant: "destructive",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Initialize Paystack
    const handler = window.PaystackPop.setup({
      key: 'pk_test_your_public_key_here', // Replace with your Paystack public key
      email: email.trim(),
      amount: amount * 100, // Paystack expects amount in kobo (NGN cents)
      currency: 'NGN',
      ref: 'tiniest_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        donor_name: donorName.trim(),
        message: message.trim() || '',
      },
      callback: function(response: any) {
        toast({
          title: "Payment Successful! 🎉",
          description: "Thank you for supporting Tiniest!",
        });
        setIsOpen(false);
        setIsLoading(false);
        
        // Reset form
        setDonorName('');
        setEmail('');
        setMessage('');
      },
      onClose: function() {
        setIsLoading(false);
        toast({
          title: "Payment Cancelled",
          description: "Payment was cancelled.",
          variant: "destructive",
        });
      }
    });

    handler.openIframe();
  };

  return (
    <>
      {/* Load Paystack script */}
      <script src="https://js.paystack.co/v1/inline.js"></script>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Donate ₦{amount.toLocaleString()}
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
              <Label htmlFor="email">Email *</Label>
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
              disabled={isLoading || !donorName.trim() || !email.trim()}
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
                  Donate ₦{amount.toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaystackModal;
