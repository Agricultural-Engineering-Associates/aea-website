import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export default function Hero({ title, subtitle, backgroundImage, children }: HeroProps) {
  return (
    <section
      className="relative bg-primary-green text-white py-24 md:py-32"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(45, 95, 43, 0.85), rgba(45, 95, 43, 0.85)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
