import React from 'react';
import { MainLayout } from '../../components/layout';
import { USER_ROLES } from '../../utils/constants';

const DashboardPage = () => {
  return (
    <MainLayout role={USER_ROLES.ORGANIZATION}>
      {/* Your page content here */}
      <h1>Dashboard</h1>
    </MainLayout>
  );
};

export default DashboardPage;