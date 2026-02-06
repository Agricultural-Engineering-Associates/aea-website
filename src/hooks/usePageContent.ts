import { useState, useEffect } from 'react';
import { publicApi } from '../lib/api';
import type { Section } from '../types';

interface UsePageContentReturn {
  sections: Section[];
  loading: boolean;
  error: string | null;
}

export function usePageContent(pageName: string): UsePageContentReturn {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getPageContent(pageName);
        setSections(response.data.sections || []);
      } catch {
        setError('Failed to load content');
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName]);

  return { sections, loading, error };
}
