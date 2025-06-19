
import { Download, Smartphone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';

const PWAInstallButton = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();

  console.log('PWA Button - isInstalled:', isInstalled, 'isInstallable:', isInstallable);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
        <Smartphone className="h-4 w-4" />
        App Installed
      </div>
    );
  }

  if (isInstallable) {
    return (
      <Button
        onClick={installApp}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
      >
        <Download className="h-4 w-4" />
        Install App
      </Button>
    );
  }

  // Show a message when not installable (for debugging and user info)
  return (
    <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm">
      <AlertCircle className="h-4 w-4" />
      <span>PWA install not available yet</span>
    </div>
  );
};

export default PWAInstallButton;
