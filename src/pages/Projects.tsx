import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import ProjectCard from '../components/ui/ProjectCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { publicApi } from '../lib/api';
import { usePageContent } from '../hooks/usePageContent';
import { getSectionImage } from '../lib/content';
import type { Project } from '../types';

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'COPAG Dairy Feedlot',
    description: '',
    category: 'International Livestock Production',
    location: 'Taroudant, Morocco',
  },
  {
    id: '2',
    title: 'Sierra Dairy Sand and Manure Solids Separation System',
    description: '',
    category: 'Domestic Livestock Production',
    location: 'Paris, Texas',
  },
  {
    id: '3',
    title: 'Pioneer Feedlot Irrigation Storage Structure',
    description: '',
    category: 'Domestic Livestock Production',
    location: 'Oakley, Kansas',
  },
  {
    id: '4',
    title: 'Tribute Farms',
    description: '',
    category: 'Domestic Livestock Production',
    location: 'Benton, Missouri',
  },
  {
    id: '5',
    title: 'Marmaton C-2 Watershed Dam',
    description: '',
    category: 'Natural Resources Development',
    location: 'Bourbon County, KS',
  },
  {
    id: '6',
    title: 'Rural Water District #2 Standpipe',
    description: '',
    category: 'Rural Development',
    location: 'Bourbon County, KS',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const { sections } = usePageContent('projects');
  const heroImage = getSectionImage(sections, 'hero');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await publicApi.getProjects();
        if (response.data?.length > 0) {
          setProjects(response.data);
        }
      } catch {
        // Use fallback projects
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <>
      <Helmet>
        <title>Projects — Agricultural Engineering Associates</title>
        <meta
          name="description"
          content="View our portfolio of agricultural engineering projects across domestic and international locations."
        />
      </Helmet>

      <Hero
        title="Projects"
        subtitle="Our Portfolio of Agricultural Engineering Excellence"
        backgroundImage={heroImage}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        categories.map((category, idx) => (
          <Section
            key={category}
            title={category}
            bgColor={idx % 2 === 0 ? 'white' : 'cream'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((p) => p.category === category)
                .map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
            </div>
          </Section>
        ))
      )}
    </>
  );
}
