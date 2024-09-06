import React, { useState } from "react";
import { Layout, Input, Button, List, Upload, message, Typography } from "antd";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

export default function Home() {
  return (
    <Layout className="h-screen">
      <Header className="bg-white border-b border-gray-200">
        <Title level={3} className="m-3 text-center">
          ChatBot
        </Title>
      </Header>
      <Content className="p-4">
        <List
          className="h-[calc(100vh-165px)] overflow-y-auto mb-4 border border-gray-200 rounded"
          itemLayout="horizontal"
        />
      </Content>
      <Footer className="p-4 bg-white">
        <div className="flex items-center space-x-2">
          <TextArea
            placeholder="Type your message here..."
            autoSize={{ minRows: 1, maxRows: 3 }}
            className="flex-grow"
          />
          <Upload accept=".pdf" maxCount={1} className="flex-shrink-0">
            <Button icon={<PaperClipOutlined />} aria-label="Attach PDF file" />
          </Upload>
          <Button
            type="primary"
            icon={<SendOutlined />}
            aria-label="Send message"
          >
            Send
          </Button>
        </div>
      </Footer>
    </Layout>
  );
}
