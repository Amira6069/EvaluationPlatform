import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { 
  MainLayout, 
  PageHeader, 
  Breadcrumb, 
  EmptyState 
} from '../../components/layout';
import { 
  Button, 
  Card, 
  Table, 
  Spinner 
} from '../../components/common';
import { USER_ROLES, ROUTES } from '../../utils/constants';

const MyPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch your data
      // const response = await api.getData();
      // setData(response.data);
      
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData([]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <MainLayout role={USER_ROLES.ORGANIZATION}>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout role={USER_ROLES.ORGANIZATION}>
      <PageHeader 
        title="My Page"
        description="Page description here"
        breadcrumb={
          <Breadcrumb 
            items={[
              { label: 'Dashboard', path: ROUTES.ORG_DASHBOARD },
              { label: 'My Page' }
            ]}
          />
        }
        actions={
          <>
            <Button 
              variant="outline" 
              leftIcon={<Download size={20} />}
            >
              Export
            </Button>
            <Button 
              variant="primary" 
              leftIcon={<Plus size={20} />}
              onClick={() => navigate('/new')}
            >
              Create New
            </Button>
          </>
        }
      />
      
      {data.length === 0 ? (
        <EmptyState 
          title="No data yet"
          description="Get started by creating your first item"
          action={
            <Button variant="primary" onClick={() => navigate('/new')}>
              Create First Item
            </Button>
          }
        />
      ) : (
        <Card>
          {/* Your content here */}
          <Table 
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'status', label: 'Status' }
            ]}
            data={data}
          />
        </Card>
      )}
    </MainLayout>
  );
};

export default MyPage;