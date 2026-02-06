import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Warehouse, TreePine, Scale, Phone } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import FeatureCard from '../components/ui/FeatureCard';
import Button from '../components/ui/Button';
import { usePageContent } from '../hooks/usePageContent';
import { getSectionContent, getSectionImage } from '../lib/content';

export default function Home() {
  const { sections } = usePageContent('home');

  const heroImage = getSectionImage(sections, 'hero');

  const ourWorkText = getSectionContent(
    sections,
    'our-work',
    'Agricultural Engineering Associates provides independent, objective, technical engineering services at the production agriculture grassroots as well as sophisticated research, demonstration, or test facilities, in both domestic and international projects. Our firm also completes design for natural resource and infrastructure projects. We strive to maintain technical knowledge which allows us to meet our client\'s needs in all areas of design, permitting, and construction management of agricultural operations.'
  );

  return (
    <>
      <Helmet>
        <title>Agricultural Engineering Associates — Broad-Based Agricultural Engineers</title>
        <meta
          name="description"
          content="Agricultural Engineering Associates provides independent, objective, technical engineering services for production agriculture since 1974."
        />
      </Helmet>

      <Hero
        title="Agricultural Engineering Associates"
        subtitle="Independent, Objective, Technical Engineering Services"
        backgroundImage={heroImage}
      >
        <Link to="/contact">
          <Button variant="secondary" size="lg">
            Contact Our Engineers
          </Button>
        </Link>
      </Hero>

      <Section title="Our Work">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-500 leading-relaxed text-center">{ourWorkText}</p>
        </div>
      </Section>

      <Section title="Our Services" bgColor="cream">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Warehouse}
            title="Livestock Production"
            description="Facility design, animal environment systems, manure management, and comprehensive nutrient management plans."
            link="/services"
          />
          <FeatureCard
            icon={TreePine}
            title="Natural Resource & Rural Development"
            description="Water resources, watershed management, municipal infrastructure, irrigation, and environmental assessments."
            link="/services"
          />
          <FeatureCard
            icon={Scale}
            title="Expert Witness Services"
            description="Agricultural environmental cases, safety, structural failures, and environmental policy testimony."
            link="/services"
          />
        </div>
      </Section>

      <section className="bg-primary-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Call today to speak with one of our engineers.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a
              href="tel:620-756-1000"
              className="flex items-center space-x-2 text-2xl font-bold text-gold hover:text-white transition-colors"
            >
              <Phone size={28} />
              <span>(620) 756-1000</span>
            </a>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Send Us a Message
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
