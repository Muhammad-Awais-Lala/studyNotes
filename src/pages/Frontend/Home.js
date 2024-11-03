import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title, Paragraph } = Typography;

const Home= () => {
  const Navigate =useNavigate()
  return (
    <div className="text-center" style={{ padding: '100px 20px' }}>
      <Row justify="center">
        <Col xs={24} sm={24} md={16}>
          <Title level={1}>Welcome to Notely</Title>
          <Paragraph>
            Collaborate and share notes effortlessly with your team.
          </Paragraph>
          <Paragraph>
            Organize your thoughts, ideas, and projects in one place.
          </Paragraph>
          <Button type="primary" size="large" className="btn btn-primary" onClick={()=>Navigate("/auth/register")}>
            Get Started
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
