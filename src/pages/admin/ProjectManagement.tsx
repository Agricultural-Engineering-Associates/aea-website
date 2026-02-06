import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit2, Trash2, Upload } from 'lucide-react';
import { adminApi } from '../../lib/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { Project } from '../../types';

const categoryOptions = [
  { value: 'International Livestock Production', label: 'International Livestock Production' },
  { value: 'Domestic Livestock Production', label: 'Domestic Livestock Production' },
  { value: 'Natural Resources Development', label: 'Natural Resources Development' },
  { value: 'Rural Development', label: 'Rural Development' },
];

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await adminApi.getProjects();
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setImageUrl(project.imageUrl || '');
      reset({
        title: project.title,
        description: project.description,
        category: project.category,
        location: project.location,
      });
    } else {
      setEditingProject(null);
      setImageUrl('');
      reset({ title: '', description: '', category: '', location: '' });
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      const payload = { ...data, description: data.description || '', imageUrl };
      if (editingProject) {
        await adminApi.updateProject(editingProject.id, payload);
        setAlert({ type: 'success', message: 'Project updated.' });
      } else {
        await adminApi.createProject(payload);
        setAlert({ type: 'success', message: 'Project added.' });
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch {
      setAlert({ type: 'error', message: 'Failed to save project.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await adminApi.deleteProject(id);
      setAlert({ type: 'success', message: 'Project deleted.' });
      fetchProjects();
    } catch {
      setAlert({ type: 'error', message: 'Failed to delete project.' });
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const response = await adminApi.uploadImage(file);
      setImageUrl(response.data.url);
    } catch {
      setAlert({ type: 'error', message: 'Failed to upload image.' });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Projects — AEA Admin</title>
      </Helmet>

      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-earth">Project Management</h1>
          <Button onClick={() => openModal()}>
            <Plus size={18} className="mr-2" />
            Add Project
          </Button>
        </div>

        {alert && (
          <div className="mb-6">
            <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Array.isArray(projects) ? projects : []).map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-primary-green bg-opacity-10 flex items-center justify-center">
                  <span className="text-primary-green font-heading font-bold text-sm text-center px-4">
                    {project.category}
                  </span>
                </div>
              )}
              <div className="p-4">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-primary-green bg-primary-green bg-opacity-10 rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="font-semibold text-earth mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{project.location}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(project)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-md"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
            <p>No projects yet. Click &quot;Add Project&quot; to get started.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add Project'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" error={errors.title?.message} {...register('title')} />
          <Textarea
            label="Description"
            rows={3}
            error={errors.description?.message}
            {...register('description')}
          />
          <Select
            label="Category"
            options={categoryOptions}
            error={errors.category?.message}
            {...register('category')}
          />
          <Input label="Location" error={errors.location?.message} {...register('location')} />

          <div>
            <label className="block text-sm font-medium text-earth mb-2">Project Image</label>
            <div className="flex items-center space-x-4">
              {imageUrl && (
                <img src={imageUrl} alt="" className="w-24 h-24 object-cover rounded-md" />
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
                    if (file) handleImageUpload(file);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
