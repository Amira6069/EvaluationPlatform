import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  Award,
  Plus,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('gov_user') || '{}');

  // Stats Data
  const stats = [
    { label: 'Current Status', value: 'DRAFT', subtitle: '65% Complete', icon: FileText, bgColor: 'bg-slate-700', trend: null },
    { label: 'Pending Actions', value: '3', subtitle: 'Items to complete', icon: AlertCircle, bgColor: 'bg-slate-600', trend: null },
    { label: 'Latest Score', value: '85', subtitle: 'Last evaluation', icon: Award, bgColor: 'bg-slate-700', trend: '+5' },
    { label: 'Completed', value: '12', subtitle: 'Total evaluations', icon: TrendingUp, bgColor: 'bg-slate-600', trend: '+2' },
  ];

  // Recent Activity
  const recentActivity = [
    { id: 1, action: 'Evaluation submitted', time: '2 days ago', icon: CheckCircle2, iconBg: 'bg-slate-100', iconColor: 'text-slate-700' },
    { id: 2, action: 'Draft saved', time: '5 days ago', icon: FileText, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
    { id: 3, action: 'Criterion completed', time: '1 week ago', icon: CheckCircle2, iconBg: 'bg-slate-100', iconColor: 'text-slate-700' },
    { id: 4, action: 'Evidence uploaded', time: '1 week ago', icon: FileText, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' }
  ];

  const handleStartEvaluation = () => {
    navigate('/organization/evaluation/new');
  };

  const handleViewResults = () => {
    navigate('/organization/results'); // implement later
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, <span className="font-semibold text-slate-700">{user.name || 'User'}</span>
            </p>
          </div>
          <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-300 hover:border-gray-400 transition-all hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                    <div className="flex items-center gap-2">
                      <h2 className="text-4xl font-bold text-gray-900">{stat.value}</h2>
                      {stat.trend && <span className="text-sm font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded">{stat.trend}</span>}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-lg flex items-center justify-center text-white`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Evaluation Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">15 of 23 criteria completed</p>
              <p className="text-xl font-bold text-slate-700">65%</p>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-slate-600 rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <a href="/organization/evaluations" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
              View all →
            </a>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-300">
            <div className="space-y-4">
              {recentActivity.map(activity => {
                const ActivityIcon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 ${activity.iconBg} rounded-lg flex items-center justify-center ${activity.iconColor} flex-shrink-0`}>
                      <ActivityIcon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={handleStartEvaluation} className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all hover:shadow-md">
              <Plus size={20} />
              <span>Start New Evaluation</span>
            </button>
            <button onClick={handleViewResults} className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-slate-700 text-slate-700 rounded-lg font-semibold hover:bg-slate-700 hover:text-white transition-all">
              <BarChart3 size={20} />
              <span>View Results</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
