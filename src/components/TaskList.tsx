import React, { useState, useEffect } from 'react';
// Combine imports from antd
import { List, Typography, Spin, Alert, Button, Popconfirm, message, Modal, Space } from 'antd';
import { DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
// Import syntax highlighter (make sure to install it: npm install react-syntax-highlighter @types/react-syntax-highlighter)
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Text } = Typography;

// Interface for Task data
interface Task {
  id: string;
  name: string;
  description: string;
  command: string;
  framework: string;
  assignedTo: string;
  createdAt: string;
}

// Interface for component props
interface TaskListProps {
  searchTerm: string;
}

const TaskList: React.FC<TaskListProps> = ({ searchTerm }) => {
  // State for task list, loading, and errors
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for the execution output modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:30083/tasks'); // Use NodePort URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (e: any) {
        console.error("Failed to fetch tasks:", e);
        setError(`Failed to load tasks: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []); // Empty array: fetch only once on mount

  // --- Handler Functions ---

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:30083/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      message.success('Task deleted successfully!');
      // Remove deleted task from state for immediate UI update
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error: any) {
      console.error('Failed to delete task:', error);
      message.error(`Failed to delete task: ${error.message}`);
    }
  };

  const handleExecute = async (task: Task) => {
    setModalTitle(`Executing Task: ${task.name}`);
    setModalContent('Executing command via Kubernetes pod...'); // Initial message
    setIsModalVisible(true); // Show modal

    try {
      const response = await fetch(`http://localhost:30083/tasks/${task.id}/execute`, {
        method: 'PUT',
      });
      if (!response.ok) {
         let errorMsg = `HTTP error! status: ${response.status}`;
         try {
             const errorBody = await response.json();
             errorMsg = errorBody.details || errorBody.message || errorMsg;
         } catch (e) { /* Ignore */ }
         throw new Error(errorMsg);
      }
      const result = await response.json();
      // Set modal content with formatted result
      setModalContent(`Command: ${result.commandRun}\nSuccess: ${result.success}\nOutput:\n------\n${result.output || '(No output)'}`);
      message.success('Task executed!');
    } catch (error: any) {
      console.error('Failed to execute task:', error);
      setModalContent(`Failed to execute task: ${error.message}`); // Show error in modal
      message.error(`Failed to execute task: ${error.message}`);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalContent('');
    setModalTitle('');
  };

  // --- Render Logic ---

  if (loading) {
    return <Spin tip="Loading tasks..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  // Filter tasks based on searchTerm
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <> {/* Use Fragment to return List and Modal together */}
      <List
        header={<div>Tasks List</div>}
        bordered
        dataSource={filteredTasks}
        renderItem={(item) => (
          <List.Item
            actions={[ // Buttons added here
              <Popconfirm
                title="Delete the task"
                description="Are you sure?"
                onConfirm={() => handleDelete(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger icon={<DeleteOutlined />} aria-label={`Delete task ${item.name}`} />
              </Popconfirm>,
              <Button
                type="link"
                icon={<PlayCircleOutlined />}
                onClick={() => handleExecute(item)}
                aria-label={`Execute task ${item.name}`}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`Command: ${item.command} | Assigned To: ${item.assignedTo || 'N/A'}`}
            />
            <Text type="secondary">{new Date(item.createdAt).toLocaleDateString()}</Text>
          </List.Item>
        )}
        locale={{ emptyText: searchTerm ? 'No tasks match your search.' : 'No tasks found.' }}
      />

      {/* Execution Output Modal */}
      <Modal
        title={modalTitle}
        open={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[ <Button key="close" onClick={handleModalClose}> Close </Button> ]}
        width={800} // Wider for logs
      >
        <SyntaxHighlighter language="bash" style={docco} wrapLongLines={true}>
          {modalContent}
        </SyntaxHighlighter>
      </Modal>
    </>
  );
};

export default TaskList;