import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { adminApi } from '../../lib/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const settingsSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  address: z.string().optional(),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email').or(z.literal('')),
  facebookUrl: z.string().url('Invalid URL').or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      businessName: 'Agricultural Engineering Associates',
      phone: '1-800-499-5893',
      email: '',
      address: '',
      facebookUrl: '',
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await adminApi.getSettings();
        reset(response.data);
      } catch {
        // Use default values
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      await adminApi.updateSettings({
        businessName: data.businessName,
        address: data.address || '',
        phone: data.phone,
        email: data.email || '',
        facebookUrl: data.facebookUrl || '',
      });
      setAlert({ type: 'success', message: 'Settings saved successfully.' });
    } catch {
      setAlert({ type: 'error', message: 'Failed to save settings.' });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Settings — AEA Admin</title>
      </Helmet>

      <div>
        <h1 className="text-3xl font-heading font-bold text-earth mb-8">Site Settings</h1>

        {alert && (
          <div className="mb-6">
            <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Business Name"
              error={errors.businessName?.message}
              {...register('businessName')}
            />
            <Input
              label="Address"
              placeholder="123 Main St, City, State ZIP"
              error={errors.address?.message}
              {...register('address')}
            />
            <Input
              label="Phone"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <Input
              label="Email"
              type="email"
              placeholder="info@aeaengineers.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Facebook URL"
              placeholder="https://facebook.com/..."
              error={errors.facebookUrl?.message}
              {...register('facebookUrl')}
            />

            <Button type="submit" disabled={isSubmitting}>
              <Save size={18} className="mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
