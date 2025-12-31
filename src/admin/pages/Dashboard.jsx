import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { supabase } from '../../config/firebase';
import { Folder, Film, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    folders: 0,
    videos: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: foldersCount } = await supabase
          .from('folders')
          .select('*', { count: 'exact', head: true });

        const { count: videosCount } = await supabase
          .from('videos')
          .select('*', { count: 'exact', head: true });
        
        setStats({
          folders: foldersCount || 0,
          videos: videosCount || 0,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({ folders: 0, videos: 0, loading: false });
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { icon: Folder, label: 'Total Folders', value: stats.folders, color: 'from-blue-500 to-purple-500' },
    { icon: Film, label: 'Total Videos', value: stats.videos, color: 'from-pink-500 to-orange-500' },
    { icon: TrendingUp, label: 'Avg per Folder', value: stats.folders > 0 ? Math.round(stats.videos / stats.folders) : 0, color: 'from-green-500 to-teal-500' },
  ];

  return (
    <div>
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">Welcome back! Here's your portfolio overview.</p>
      </Motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-3xl p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-4xl font-black text-white">
                {stats.loading ? '...' : stat.value}
              </p>
            </Motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Motion.a
            href="/admin/folders"
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
          >
            <Folder size={24} className="text-white mb-2" />
            <h3 className="text-white font-bold mb-1">Manage Folders</h3>
            <p className="text-gray-400 text-sm">Add, edit, or delete folders</p>
          </Motion.a>
          <Motion.a
            href="/"
            target="_blank"
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
          >
            <TrendingUp size={24} className="text-white mb-2" />
            <h3 className="text-white font-bold mb-1">View Portfolio</h3>
            <p className="text-gray-400 text-sm">See your live portfolio</p>
          </Motion.a>
        </div>
      </Motion.div>
    </div>
  );
};

export default Dashboard;
