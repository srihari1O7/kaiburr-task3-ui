import React from 'react';
import { Form, Input, Button, message } from 'antd'; // Import Form components

// Define the props interface, including a function to call after creation
interface CreateTaskFormProps {
  onTaskCreated: () => void; // Function to refresh the task list
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onTaskCreated }) => {
  const [form] = Form.useForm(); // Hook to control the form

  // Function to handle form submission
  const onFinish = async (values: any) => {
    console.log('Form values:', values);
    try {
      const response = await fetch('http://localhost:30083/tasks', { // Use NodePort URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Send form values as JSON
      });

      if (!response.ok) {
        // Try to get error details from the response body
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
            const errorBody = await response.json();
            errorMsg = errorBody.details || errorBody.message || errorMsg;
        } catch (e) { /* Ignore if body isn't JSON */ }
        throw new Error(errorMsg);
      }

      message.success('Task created successfully!'); // Show success message
      form.resetFields(); // Clear the form
      onTaskCreated(); // Trigger the refresh function passed in props
    } catch (error: any) {
      console.error('Failed to create task:', error);
      message.error(`Failed to create task: ${error.message}`); // Show error message
    }
  };

  return (
    <Form
      form={form}
      layout="vertical" // Stack labels above inputs
      onFinish={onFinish} // Function to call on submit
      style={{ marginBottom: '24px' }} // Add some space below the form
    >
      <Title level={4}>Create New Task</Title>
      <Form.Item
        name="name"
        label="Task Name"
        rules={[{ required: true, message: 'Please input the task name!' }]} // Basic validation
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="command"
        label="Command (e.g., echo Hello World)"
        rules={[{ required: true, message: 'Please input the command!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="framework"
        label="Framework"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="assignedTo"
        label="Assigned To"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

// Need Title component from Typography
import { Typography } from 'antd';
const { Title } = Typography;

export default CreateTaskForm;