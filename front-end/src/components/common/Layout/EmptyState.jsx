import { MainLayout, PageHeader, EmptyState } from '../../components/layout';
import { Button } from '../../components/common';
import { FileText } from 'lucide-react';

const EvaluationsPage = () => {
  const evaluations = []; // Empty array
  
  return (
    <MainLayout role={USER_ROLES.ORGANIZATION}>
      <PageHeader title="My Evaluations" />
      
      {evaluations.length === 0 ? (
        <EmptyState 
          icon={<FileText size={48} className="text-gray-400" />}
          title="No evaluations yet"
          description="Start your first governance evaluation to get insights and recommendations"
          action={
            <Button variant="primary">Start New Evaluation</Button>
          }
        />
      ) : (
        // Show evaluations list
        <div>Evaluations list here</div>
      )}
    </MainLayout>
  );
};