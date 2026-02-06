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
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { StaffMember } from '../../types';

const staffSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(1, 'Bio is required'),
  displayOrder: z.coerce.number().min(0, 'Must be 0 or greater'),
});

type StaffFormValues = z.infer<typeof staffSchema>;

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await adminApi.getStaff();
      setStaff(response.data);
    } catch {
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (member?: StaffMember) => {
    if (member) {
      setEditingStaff(member);
      setPhotoUrl(member.photoUrl || '');
      reset({
        name: member.name,
        title: member.title,
        bio: member.bio,
        displayOrder: member.displayOrder,
      });
    } else {
      setEditingStaff(null);
      setPhotoUrl('');
      reset({ name: '', title: '', bio: '', displayOrder: staff.length + 1 });
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data: StaffFormValues) => {
    try {
      const payload = { ...data, photoUrl };
      if (editingStaff) {
        await adminApi.updateStaff(editingStaff.id, payload);
        setAlert({ type: 'success', message: 'Staff member updated.' });
      } else {
        await adminApi.createStaff(payload);
        setAlert({ type: 'success', message: 'Staff member added.' });
      }
      setIsModalOpen(false);
      fetchStaff();
    } catch {
      setAlert({ type: 'error', message: 'Failed to save staff member.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    try {
      await adminApi.deleteStaff(id);
      setAlert({ type: 'success', message: 'Staff member deleted.' });
      fetchStaff();
    } catch {
      setAlert({ type: 'error', message: 'Failed to delete staff member.' });
    }
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      const response = await adminApi.uploadImage(file);
      setPhotoUrl(response.data.url);
    } catch {
      setAlert({ type: 'error', message: 'Failed to upload photo.' });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Staff Management — AEA Admin</title>
      </Helmet>

      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-earth">Staff Management</h1>
          <Button onClick={() => openModal()}>
            <Plus size={18} className="mr-2" />
            Add Staff Member
          </Button>
        </div>

        {alert && (
          <div className="mb-6">
            <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          </div>
        )}

        <div className="space-y-4">
          {staff
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary-green bg-opacity-10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl text-primary-green font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-earth">{member.name}</h3>
                    <p className="text-gold text-sm">{member.title}</p>
                    <p className="text-gray-500 text-sm mt-1 truncate max-w-lg">{member.bio}</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => openModal(member)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-md"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

          {staff.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
              <p>No staff members yet. Click &quot;Add Staff Member&quot; to get started.</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" error={errors.name?.message} {...register('name')} />
          <Input label="Title" error={errors.title?.message} {...register('title')} />
          <Textarea label="Bio" rows={6} error={errors.bio?.message} {...register('bio')} />
          <Input
            label="Display Order"
            type="number"
            error={errors.displayOrder?.message}
            {...register('displayOrder')}
          />

          <div>
            <label className="block text-sm font-medium text-earth mb-2">Photo</label>
            <div className="flex items-center space-x-4">
              {photoUrl && (
                <img src={photoUrl} alt="" className="w-20 h-20 rounded-full object-cover" />
              )}
              <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Upload size={16} className="mr-2" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePhotoUpload(file);
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
