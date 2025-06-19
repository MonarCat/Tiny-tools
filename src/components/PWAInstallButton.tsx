
import { Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';

const PWAInstallButton = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
        <Smartphone className="h-4 w-4" />
        App Installed
      </div>
    );
  }

  if (!isInstallable) {
    return null;
  }

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
};

export default PWAInstallButton;
