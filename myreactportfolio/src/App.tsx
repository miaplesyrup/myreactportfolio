import React from 'react';
import { Layout, Typography } from 'antd';
import LoginForm from './components/Login';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout>
      <Header style={{ background: '#fff', textAlign: 'center' }}>
        <Title level={2}>Welcome to our app</Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <LoginForm />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
