import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string>('');

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('http://[PATH_HERE]/api/v1/login', values);
      // handle successful login
      message.success('Logged in successfully!');
    } catch (error) {
      // handle error
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        form={form}
        name="login-form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
