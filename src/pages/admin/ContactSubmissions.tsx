import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Eye, Trash2, Mail, MailOpen, X } from 'lucide-react';
import { adminApi } from '../../lib/api';
import Alert from '../../components/ui/Alert';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { ContactSubmission } from '../../types';

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await adminApi.getContacts();
      setContacts(response.data);
    } catch {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await adminApi.markContactRead(id);
      fetchContacts();
    } catch {
      setAlert({ type: 'error', message: 'Failed to update message.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await adminApi.deleteContact(id);
      setAlert({ type: 'success', message: 'Message deleted.' });
      if (selectedContact?.id === id) setSelectedContact(null);
      fetchContacts();
    } catch {
      setAlert({ type: 'error', message: 'Failed to delete message.' });
    }
  };

  const viewContact = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    if (!contact.read) {
      handleMarkRead(contact.id);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Messages — AEA Admin</title>
      </Helmet>

      <div>
        <h1 className="text-3xl font-heading font-bold text-earth mb-8">Contact Submissions</h1>

        {alert && (
          <div className="mb-6">
            <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {contacts.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No messages yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between ${
                        !contact.read ? 'bg-blue-50' : ''
                      } ${selectedContact?.id === contact.id ? 'ring-2 ring-inset ring-primary-green' : ''}`}
                      onClick={() => viewContact(contact)}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {contact.read ? (
                          <MailOpen size={20} className="text-gray-400 flex-shrink-0" />
                        ) : (
                          <Mail size={20} className="text-primary-green flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p
                            className={`text-sm truncate ${
                              !contact.read ? 'font-bold text-earth' : 'text-gray-600'
                            }`}
                          >
                            {contact.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {contact.subject || 'No subject'}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(contact.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-2 flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            viewContact(contact);
                          }}
                          className="p-1.5 text-blue-500 hover:bg-blue-100 rounded"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact.id);
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-100 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div>
            {selectedContact ? (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-heading font-bold text-earth">Message Detail</h3>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-gray-400 hover:text-earth"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">From</label>
                    <p className="text-earth font-medium">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                    <p className="text-earth">
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-primary-green hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Subject
                    </label>
                    <p className="text-earth">{selectedContact.subject || 'No subject'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Date</label>
                    <p className="text-earth text-sm">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">
                      Message
                    </label>
                    <p className="text-earth mt-1 whitespace-pre-wrap leading-relaxed">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your inquiry'}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-green text-white rounded-md hover:bg-opacity-90 transition-colors text-sm font-medium"
                  >
                    <Mail size={16} className="mr-2" />
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-400">
                <Eye size={48} className="mx-auto mb-4" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
