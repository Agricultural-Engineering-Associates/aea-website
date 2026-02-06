import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { usePageContent } from '../hooks/usePageContent';
import { getSectionContent, getSectionImage } from '../lib/content';

const fallbackParagraphs = [
  'Modern production agriculture and agribusiness brings a dizzying array of engineering problems, enough to baffle even the most astute manager. Faced with tough capital improvement decisions, tight budgets, deadlines, confusing claims by suppliers, rapidly changing technology, and government regulations, its little wonder farmers, stockmen, and agribusinessmen clench their fists and ask, "Who can help me make the right decisions?"',
  "We can. Agricultural Engineering Associates. That's our business. Our company was formed to fill the void for independent, objective, technical engineering services at the production agriculture grassroots as well as sophisticated research, demonstration, or test facilities. We've defined the services most needed and beneficial to our clientele, and geared our company to provide them.",
  "We're a staff of graduate agricultural engineers, most with advanced degrees, and equally important, we have solid ag production backgrounds. We grew up, and still live, on farms. That means we can provide good communication and common sense about agriculture, which are both critical in efficiently solving your ag engineering problems.",
  "Confidence. You must have confidence in us. We must have confidence in ourselves. That's why we keep current on technical knowledge and engineering tools, attend research and educational seminars, read pertinent publications, and routinely confer with other professional ag consultants and engineers.",
  'Both of us must work with government agencies and trade organizations. So, we maintain routine working relationships with the USDA Extension, Natural Resources Conservation Service, Environmental Protection Agency, state regulatory agencies, and trade organizations. To help you make wiser decisions, we maintain a working knowledge of agricultural and construction equipment and suppliers \u2014 at the same time keeping an independent and objective posture.',
  "Our list of satisfied clients is over a quarter century long \u2014 and growing. Our commitment, credentials, and dedication to service are unique and unexcelled in American agriculture. But, action speaks louder than words. We want an opportunity to prove our expertise to you \u2014 before your agricultural engineering problems push you to exasperation and before an incorrect decision costs you needless time, worry, and money.",
  'You have enough to concern yourself within our industry. Leave the details to us. We offer you engineering expertise and dedicated service to ensure efficient agricultural production. No project is too large or small for us.',
  'Call today to speak with one of our engineers.',
];

export default function About() {
  const { sections } = usePageContent('about');
  const heroImage = getSectionImage(sections, 'hero');
  const aboutContent = getSectionContent(sections, 'about-text', '');
  const paragraphs = aboutContent ? aboutContent.split('\n\n') : fallbackParagraphs;

  return (
    <>
      <Helmet>
        <title>About — Agricultural Engineering Associates</title>
        <meta
          name="description"
          content="Learn about Agricultural Engineering Associates, providing independent agricultural engineering services since 1974."
        />
      </Helmet>

      <Hero
        title="About Us"
        subtitle="Broad-Based Agricultural Engineers Since 1974"
        backgroundImage={heroImage}
      />

      <Section>
        <div className="max-w-4xl mx-auto">
          {paragraphs.map((paragraph, index) => {
            if (index === paragraphs.length - 1) {
              return (
                <div
                  key={index}
                  className="text-center mt-12 pt-8 border-t border-gray-200"
                >
                  <p className="text-2xl font-heading font-bold text-earth mb-6">
                    {paragraph}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="tel:1-800-499-5893"
                      className="flex items-center space-x-2 text-xl font-bold text-gold hover:text-primary-green transition-colors"
                    >
                      <Phone size={24} />
                      <span>1-800-499-5893</span>
                    </a>
                    <Link to="/contact">
                      <Button>Contact Us</Button>
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <p key={index} className="text-gray-500 leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            );
          })}
        </div>
      </Section>

      <Section title="Our Work in Action" bgColor="cream">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => {
            const galleryImage = getSectionImage(sections, `gallery-${i}`);
            return galleryImage ? (
              <div key={i} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={galleryImage}
                  alt={`Project gallery ${i}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ) : (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200"
              >
                <p className="text-center p-4">
                  Gallery images managed
                  <br />
                  through admin panel
                </p>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
