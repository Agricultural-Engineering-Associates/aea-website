import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Users, FolderKanban, Mail } from 'lucide-react';
import { adminApi } from '../../lib/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { DashboardStats } from '../../types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminApi.getDashboard();
        setStats(response.data);
      } catch {
        setStats({
          totalPages: 6,
          totalStaff: 3,
          totalProjects: 6,
          totalMessages: 0,
          unreadMessages: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  const statCards = [
    { label: 'Pages', value: stats?.totalPages ?? 0, icon: FileText, color: 'bg-blue-500' },
    { label: 'Staff Members', value: stats?.totalStaff ?? 0, icon: Users, color: 'bg-green-500' },
    {
      label: 'Projects',
      value: stats?.totalProjects ?? 0,
      icon: FolderKanban,
      color: 'bg-purple-500',
    },
    {
      label: 'Messages',
      value: stats?.totalMessages ?? 0,
      icon: Mail,
      color: 'bg-gold',
      extra: stats?.unreadMessages ? `${stats.unreadMessages} unread` : undefined,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard — AEA Admin</title>
      </Helmet>

      <div>
        <h1 className="text-3xl font-heading font-bold text-earth mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-3xl font-bold text-earth mt-1">{card.value}</p>
                  {card.extra && <p className="text-sm text-gold mt-1">{card.extra}</p>}
                </div>
                <div
                  className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
                >
                  <card.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-heading font-bold text-earth mb-4">
            Welcome to AEA Admin
          </h2>
          <p className="text-gray-500">
            Use the sidebar navigation to manage your website content, staff profiles, projects,
            and more. All changes will be reflected on the public website immediately.
          </p>
        </div>
      </div>
    </>
  );
}
