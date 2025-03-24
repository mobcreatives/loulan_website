
import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageTitle from '@/components/ui/PageTitle';
import { useToast } from '@/hooks/use-toast';

// Mock settings data
const mockSettings = {
  restaurantName: 'Golden Bistro',
  address: '123 Gourmet Street, Foodville, CA 90210',
  phone: '+1 (555) 123-4567',
  email: 'contact@goldenbistro.com',
  openingHours: 'Mon-Fri: 11:00 - 22:00\nSat-Sun: 10:00 - 23:00',
  socialMedia: {
    facebook: 'https://facebook.com/goldenbistro',
    instagram: 'https://instagram.com/goldenbistro',
    twitter: 'https://twitter.com/goldenbistro',
  },
  features: {
    enableOnlineReservations: true,
    enableOnlineOrdering: true,
    showReviews: true,
    enablePopups: true,
  }
};

const Settings = () => {
  const [settings, setSettings] = useState(mockSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, key] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [key]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSwitchChange = (name: string) => {
    const [section, key] = name.split('.');
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: !prev[section as keyof typeof prev][key as keyof typeof prev[typeof section]]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Settings updated",
        description: "Your restaurant settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <PageTitle
        title="Restaurant Settings"
        description="Manage your restaurant information and preferences"
      />

      <form onSubmit={handleSubmit}>
        <div className="space-y-6 mt-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="restaurantName">Restaurant Name</Label>
                <Input 
                  id="restaurantName" 
                  name="restaurantName" 
                  value={settings.restaurantName} 
                  onChange={handleChange}
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={settings.address} 
                  onChange={handleChange}
                  className="mt-1" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={settings.phone} 
                    onChange={handleChange}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={settings.email} 
                    onChange={handleChange}
                    className="mt-1" 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="openingHours">Opening Hours</Label>
                <Textarea 
                  id="openingHours" 
                  name="openingHours" 
                  value={settings.openingHours} 
                  onChange={handleChange}
                  className="mt-1 h-24" 
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Social Media</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="socialMedia.facebook">Facebook</Label>
                <Input 
                  id="socialMedia.facebook" 
                  name="socialMedia.facebook" 
                  value={settings.socialMedia.facebook} 
                  onChange={handleChange}
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="socialMedia.instagram">Instagram</Label>
                <Input 
                  id="socialMedia.instagram" 
                  name="socialMedia.instagram" 
                  value={settings.socialMedia.instagram} 
                  onChange={handleChange}
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="socialMedia.twitter">Twitter</Label>
                <Input 
                  id="socialMedia.twitter" 
                  name="socialMedia.twitter" 
                  value={settings.socialMedia.twitter} 
                  onChange={handleChange}
                  className="mt-1" 
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="features.enableOnlineReservations">Enable Online Reservations</Label>
                <Switch 
                  id="features.enableOnlineReservations" 
                  checked={settings.features.enableOnlineReservations}
                  onCheckedChange={() => handleSwitchChange('features.enableOnlineReservations')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="features.enableOnlineOrdering">Enable Online Ordering</Label>
                <Switch 
                  id="features.enableOnlineOrdering" 
                  checked={settings.features.enableOnlineOrdering}
                  onCheckedChange={() => handleSwitchChange('features.enableOnlineOrdering')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="features.showReviews">Show Customer Reviews</Label>
                <Switch 
                  id="features.showReviews" 
                  checked={settings.features.showReviews}
                  onCheckedChange={() => handleSwitchChange('features.showReviews')}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="features.enablePopups">Enable Popup Products</Label>
                <Switch 
                  id="features.enablePopups" 
                  checked={settings.features.enablePopups}
                  onCheckedChange={() => handleSwitchChange('features.enablePopups')}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="btn-gold" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Settings'}
              {!isSubmitting && <Save size={16} className="ml-2" />}
            </Button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default Settings;
