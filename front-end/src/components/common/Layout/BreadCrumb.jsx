import { MainLayout, PageHeader, Breadcrumb } from '../../components/layout';

const EvaluationDetailsPage = () => {
  return (
    <MainLayout role={USER_ROLES.ORGANIZATION}>
      <PageHeader 
        title="Q4 2025 Evaluation"
        breadcrumb={
          <Breadcrumb 
            items={[
              { label: 'Dashboard', path: '/organization/dashboard' },
              { label: 'Evaluations', path: '/organization/evaluations' },
              { label: 'Q4 2025 Evaluation' }
            ]}
          />
        }
      />
      
      {/* Page content */}
    </MainLayout>
  );
};