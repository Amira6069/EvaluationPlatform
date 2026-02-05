import { MainLayout, PageHeader } from '../../components/layout';
import { Button } from '../../components/common';

const EvaluationsPage = () => {
  return (
    <MainLayout role={USER_ROLES.ORGANIZATION}>
      <PageHeader 
        title="My Evaluations"
        description="View and manage all your governance evaluations"
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button variant="primary">New Evaluation</Button>
          </>
        }
      />
      
      {/* Page content */}
    </MainLayout>
  );
};