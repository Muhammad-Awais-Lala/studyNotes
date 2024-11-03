import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom'; // Assuming you are using react-router
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

// Define the new sidebar items with nav links
const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: <Link to="/dashboard">Add Message</Link>,
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: <Link to="/dashboard/myNotes">MY NOTES</Link>,
  },
  {
    key: '3',
    icon: <UserOutlined />,
    label: <Link to="/dashboard/queries">User Queries</Link>,
  },
];

export default function Sidebar({ Page }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={items} defaultSelectedKeys={['1']}/> {/* New Sidebar Menu with links */}
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        
        {/* {console.log(Page)} */}
        {<Page />}
        
      </Layout>
    </Layout>
  );
}
