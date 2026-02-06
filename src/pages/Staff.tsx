import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import StaffCard from '../components/ui/StaffCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { publicApi } from '../lib/api';
import { usePageContent } from '../hooks/usePageContent';
import { getSectionImage } from '../lib/content';
import type { StaffMember } from '../types';

const fallbackStaff: StaffMember[] = [
  {
    id: '1',
    name: 'John A. George, P.E.',
    title: 'President & Chief Engineer',
    bio: 'John founded the firm in 1974 after four years with the U.S. EPA where he developed the first short course training program on agricultural pollution control as well as helping develop the feedlot permitting program. He has B.S. and M.S. degrees in agricultural engineering from Kansas State University. His specialties include trouble shooting and design of animal environments for production and research facilities; automated manure collection, treatment, and odor control; and consulting on environmental regulations domestically and internationally. John has been involved as an expert witness in over fifty court cases, most dealing with odors or environmental issues. He has authored numerous papers on various technical issues dealing with agriculture and technology and is a popular speaker on subjects related to animal environments and regulatory management and issues. John volunteers his expertise serving on environmental committees for the National Pork Producers Council and the National Cattlemen\'s Beef Association.',
    displayOrder: 1,
  },
  {
    id: '2',
    name: 'L. Frank Young, P.E.',
    title: 'Senior Staff Engineer',
    bio: 'Frank Young rejoined the staff of AEA in April of 2006 after being employed as Neosho County Engineer for 17 years. Frank previously worked for AEA from 1977 to 1989 as a Staff Engineer and Surveyor. He has B.S. and M.S. degrees in Agricultural Engineering from Kansas State University. His specialties include soil and water resource design, surveying, water quality and flood protection, environmental protection design and permitting, public works projects, project management and transportation related projects.',
    displayOrder: 2,
  },
  {
    id: '3',
    name: 'Kara Niemeir, P.E.',
    title: 'Staff Engineer',
    bio: 'After completing her B.S. in Biological Systems Engineering and her M.S. in Environmental Engineering at the University of Nebraska-Lincoln, Kara Niemeir joined the staff of AEA in the fall of 2007. Kara\'s responsibilities have included developing comprehensive nutrient management plans for livestock facilities and performing soil testing for site assessments. She also coordinates meetings, tracks in-kind funds and writes project reports for the Development Phase of the Marmaton River Watershed Restoration and Protection Strategy (WRAPS).',
    displayOrder: 3,
  },
];

export default function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { sections } = usePageContent('staff');
  const heroImage = getSectionImage(sections, 'hero');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await publicApi.getStaff();
        if (Array.isArray(response.data) && response.data.length > 0) {
          setStaff(response.data);
        } else {
          setStaff(fallbackStaff);
        }
      } catch {
        setStaff(fallbackStaff);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  return (
    <>
      <Helmet>
        <title>Staff — Agricultural Engineering Associates</title>
        <meta
          name="description"
          content="Meet our team of experienced agricultural engineers at AEA."
        />
      </Helmet>

      <Hero
        title="Our Staff"
        subtitle="Experienced Agricultural Engineers"
        backgroundImage={heroImage}
      />

      <Section>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            {Array.isArray(staff)
              ? [...staff]
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((member) => (
                    <StaffCard key={member.id} {...member} />
                  ))
              : null}
          </div>
        )}
      </Section>
    </>
  );
}
