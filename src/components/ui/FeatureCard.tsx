import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export default function FeatureCard({ icon: Icon, title, description, link }: FeatureCardProps) {
  return (
    <Link to={link} className="block group">
      <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-green bg-opacity-10 text-primary-green mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
          <Icon size={32} />
        </div>
        <h3 className="text-xl font-heading font-bold text-earth mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
