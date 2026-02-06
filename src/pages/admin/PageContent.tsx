import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';
import { adminApi } from '../../lib/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Alert from '../../components/ui/Alert';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { Section } from '../../types';

const pageNames = ['home', 'services', 'projects', 'staff', 'about', 'contact'];

export default function PageContentManager() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  useEffect(() => {
    fetchPageContent();
  }, [selectedPage]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getPage(selectedPage);
      const data = response.data;
      setSections(Array.isArray(data?.sections) ? data.sections : []);
    } catch {
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updatePage(selectedPage, { sections });
      setAlert({ type: 'success', message: 'Page content saved successfully.' });
    } catch {
      setAlert({ type: 'error', message: 'Failed to save page content.' });
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (index: number, field: keyof Section, value: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: `new-${Date.now()}`,
        name: '',
        title: '',
        content: '',
        order: sections.length,
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (index: number, file: File) => {
    try {
      const response = await adminApi.uploadImage(file);
      updateSection(index, 'imageUrl', response.data.url);
    } catch {
      setAlert({ type: 'error', message: 'Failed to upload image.' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Page Content — AEA Admin</title>
      </Helmet>

      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-earth">Page Content</h1>
          <Button onClick={handleSave} disabled={saving}>
            <Save size={18} className="mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {alert && (
          <div className="mb-6">
            <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          </div>
        )}

        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {pageNames.map((page) => (
            <button
              key={page}
              onClick={() => setSelectedPage(page)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                selectedPage === page
                  ? 'bg-primary-green text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            {(Array.isArray(sections) ? sections : []).map((section, index) => (
              <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-earth">Section {index + 1}</h3>
                  <button
                    onClick={() => removeSection(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Section Name (key)"
                    value={section.name}
                    onChange={(e) => updateSection(index, 'name', e.target.value)}
                    placeholder="e.g., hero, our-work, cta"
                  />
                  <Input
                    label="Section Title"
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="Display title"
                  />
                </div>

                <Textarea
                  label="Content"
                  value={section.content}
                  onChange={(e) => updateSection(index, 'content', e.target.value)}
                  rows={4}
                  placeholder="Section content..."
                />

                <div className="mt-4">
                  <label className="block text-sm font-medium text-earth mb-2">
                    Section Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {section.imageUrl && (
                      <img
                        src={section.imageUrl}
                        alt=""
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    )}
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Upload size={16} className="mr-2" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(index, file);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addSection}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-green hover:text-primary-green transition-colors flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Section</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
