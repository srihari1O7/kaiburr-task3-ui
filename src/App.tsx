import './App.css';
// Combine imports from antd
import { Layout, Typography, Input } from 'antd';
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';
import React, { useState } from 'react';

// Removed duplicate Layout/Typography import

function App() {
  // Removed the const { Header, Content, Footer } = Layout; line
  const { Title } = Typography; // Keep Title destructuring
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const handleTaskCreated = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Use Layout.Header directly */}
      <Layout.Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#001529' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>Kaiburr Task Manager</Title>
      </Layout.Header>
      {/* Use Layout.Content directly */}
      <Layout.Content style={{ padding: '20px 48px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280, borderRadius: 8 }}>
          <CreateTaskForm onTaskCreated={handleTaskCreated} />

          <Input.Search
            placeholder="Search tasks by name..."
            allowClear
            enterButton
            onSearch={(value) => setSearchTerm(value)}
            onChange={(e) => { if (e.target.value === '') setSearchTerm(''); }}
            style={{ marginBottom: '16px', maxWidth: '400px' }}
          />

          {/* Pass searchTerm prop to TaskList */}
          <TaskList key={refreshKey} searchTerm={searchTerm} />
        </div>
      </Layout.Content>
      {/* Use Layout.Footer directly */}
      <Layout.Footer style={{ textAlign: 'center' }}>
        Kaiburr Assessment ©{new Date().getFullYear()} Created by Srihari Kubenteran
      </Layout.Footer>
    </Layout>
  );
}

export default App;