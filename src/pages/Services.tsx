import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import { usePageContent } from '../hooks/usePageContent';
import { getSectionImage } from '../lib/content';

export default function Services() {
  const { sections } = usePageContent('services');
  const heroImage = getSectionImage(sections, 'hero');

  return (
    <>
      <Helmet>
        <title>Services — Agricultural Engineering Associates</title>
        <meta
          name="description"
          content="Agricultural engineering services including livestock production, natural resource development, and expert witness services."
        />
      </Helmet>

      <Hero
        title="Services"
        subtitle="Comprehensive Agricultural Engineering Solutions"
        backgroundImage={heroImage}
      />

      {/* Livestock Production */}
      <Section title="Livestock Production">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-green">
            <h3 className="text-xl font-heading font-bold text-primary-green mb-4">
              Facility Design
            </h3>
            <ul className="space-y-3 text-gray-500">
              <li className="flex items-start">
                <span className="text-gold mr-3 mt-1 font-bold">&bull;</span>
                <span>New State of the Art Production, Research, and Test Facilities</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3 mt-1 font-bold">&bull;</span>
                <span>Troubleshooting / Remodeling</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-green">
            <h3 className="text-xl font-heading font-bold text-primary-green mb-4">
              Animal Environment
            </h3>
            <ul className="space-y-3 text-gray-500">
              {[
                'Ventilation and Cooling',
                'Animal Handling Environmental Permitting',
                'Manure and Runoff Treatment, Storage, and Handling',
                'Earthen Manure and Runoff Storages',
                'Manure Solids Separation',
                'Vegetated Treatment Areas (VTAs)',
                'Anaerobic Digesters',
                'Land Application Systems',
                'Whole Pond Seepage Analysis',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <span className="text-gold mr-3 mt-1 font-bold">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary-green">
            <h3 className="text-xl font-heading font-bold text-primary-green mb-4">
              Site Development
            </h3>
            <ul className="space-y-3 text-gray-500">
              {[
                'Geotechnical Investigations',
                'Site Surveying',
                'Construction Quality Control',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <span className="text-gold mr-3 mt-1 font-bold">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gold bg-opacity-10 border border-gold rounded-lg p-6">
          <p className="text-earth font-semibold text-center text-lg">
            Comprehensive Nutrient Management Plans (CNMPs)
          </p>
        </div>
      </Section>

      {/* Natural Resource & Rural Development */}
      <Section title="Natural Resource &amp; Rural Development" bgColor="cream">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            'Water Resources Development',
            'Watershed Dam Design',
            'Watershed Restoration & Protection Strategy (WRAPS) Leadership',
            'Water Supply',
            'Municipal Infrastructure',
            'Irrigation Systems',
            'Regulatory Compliance Assistance & Permitting',
            'Geotechnical Investigations & Construction Testing',
            'Boundary & Topographic Survey',
            'Phase I & II Environmental Site Assessments',
            'Abandoned Well Plugging',
          ].map((service) => (
            <div
              key={service}
              className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-gold mr-3 mt-0.5 font-bold text-lg">&bull;</span>
              <span className="text-gray-600">{service}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Expert Witness Services */}
      <Section title="Expert Witness Services">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            'Agricultural Environmental Cases',
            'Agricultural Safety',
            'Structural Failures',
            'Weather and Natural Disaster Damage',
            'Agricultural Patents',
            'Environmental Policy Testimony and Advice',
          ].map((service) => (
            <div
              key={service}
              className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-gold mr-3 mt-0.5 font-bold text-lg">&bull;</span>
              <span className="text-gray-600">{service}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
