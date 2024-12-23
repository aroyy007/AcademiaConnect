import React from 'react';
import { useAuthStore } from '../store/auth';
import { Navigate } from 'react-router-dom';
import { UserApprovalTable } from '../components/admin/UserApprovalTable';
import { PostManagement } from '../components/admin/PostManagement';
import { RoutineManagement } from '../components/admin/RoutineManagement';
import { NotificationManagement } from '../components/admin/NotificationManagement';
import { DashboardTabs } from '../components/admin/DashboardTabs';

const ADMIN_TABS = [
  { id: 'users', label: 'User Approvals' },
  { id: 'posts', label: 'Post Management' },
  { id: 'routines', label: 'Routine Management' },
  { id: 'notifications', label: 'Notifications' },
] as const;

type TabId = typeof ADMIN_TABS[number]['id'];

export function AdminDashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState<TabId>('users');

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserApprovalTable />;
      case 'posts':
        return <PostManagement />;
      case 'routines':
        return <RoutineManagement />;
      case 'notifications':
        return <NotificationManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Logged in as: <span className="font-medium">{user.email}</span>
        </div>
      </div>

      <DashboardTabs
        tabs={ADMIN_TABS}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as TabId)}
      />

      <div className="space-y-6">
        {renderTabContent()}
      </div>
    </div>
  );
}