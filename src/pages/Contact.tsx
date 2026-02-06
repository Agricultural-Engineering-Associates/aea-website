import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { publicApi } from '../lib/api';
import { usePageContent } from '../hooks/usePageContent';
import { getSectionImage } from '../lib/content';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { sections } = usePageContent('contact');
  const heroImage = getSectionImage(sections, 'hero');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await publicApi.submitContact(data);
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message. We will get back to you soon.');
      reset();
    } catch {
      setSubmitStatus('error');
      setSubmitMessage(
        'Something went wrong. Please try again or call us directly at (620) 756-1000.'
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — Agricultural Engineering Associates</title>
        <meta
          name="description"
          content="Contact Agricultural Engineering Associates. Call (620) 756-1000 or send us a message."
        />
      </Helmet>

      <Hero
        title="Contact Us"
        subtitle="Get in Touch With Our Engineering Team"
        backgroundImage={heroImage}
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-heading font-bold text-earth mb-6">
              Send Us a Message
            </h2>

            {submitStatus !== 'idle' && (
              <div className="mb-6">
                <Alert
                  type={submitStatus === 'success' ? 'success' : 'error'}
                  message={submitMessage}
                  onClose={() => setSubmitStatus('idle')}
                />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  placeholder="Your full name"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>
              <Input
                label="Subject"
                placeholder="What is this regarding?"
                error={errors.subject?.message}
                {...register('subject')}
              />
              <Textarea
                label="Message"
                placeholder="How can we help you?"
                rows={6}
                error={errors.message?.message}
                {...register('message')}
              />
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-earth mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-green bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary-green" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-earth">Phone</h3>
                  <a
                    href="tel:620-756-1000"
                    className="text-gold hover:text-primary-green transition-colors font-semibold"
                  >
                    (620) 756-1000
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-green bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary-green" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-earth">Email</h3>
                  <span className="text-gray-500">info@aeaengineers.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-green bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary-green" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-earth">Address</h3>
                  <p className="text-gray-500">
                    1000 Promontory Dr
                    <br />
                    Uniontown, KS 66779
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg overflow-hidden border border-gray-200 h-64">
              <iframe
                title="AEA Location"
                src="https://www.google.com/maps?q=1000+Promontory+Dr,+Uniontown,+KS+66779&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
