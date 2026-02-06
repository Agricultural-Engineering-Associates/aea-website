import React from 'react';

interface SectionProps {
  title?: string;
  subtitle?: string;
  bgColor?: 'white' | 'cream';
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  title,
  subtitle,
  bgColor = 'white',
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      className={`py-16 md:py-20 ${
        bgColor === 'cream' ? 'bg-cream' : 'bg-white'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-earth mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
