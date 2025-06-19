
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Coffee, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DonationButton = () => {
  const { toast } = useToast();

  const handleDonation = (amount: number) => {
    toast({
      title: "Stripe Integration Required",
      description: "To accept donations, please connect Supabase and set up Stripe payment processing.",
      variant: "default",
    });
    // This would call Stripe checkout when properly set up
    console.log(`Donation amount: $${amount}`);
  };

  return (
    <Card className="mt-16 p-8 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
      <div className="text-center">
        <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Support Tiniest</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Help us keep Tiniest free and fast for everyone. Your support means the world! ❤️
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => handleDonation(3)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white flex items-center gap-2"
          >
            <Coffee className="h-4 w-4" />
            $3 Coffee
          </Button>
          
          <Button
            onClick={() => handleDonation(10)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            $10 Support
          </Button>
          
          <Button
            onClick={() => handleDonation(25)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            $25 Boost
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Secure payments powered by Stripe (setup required)
        </p>
      </div>
    </Card>
  );
};

export default DonationButton;
