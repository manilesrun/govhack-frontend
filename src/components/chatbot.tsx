import React, { useState, useEffect } from "react";
import {
  Layout,
  Input,
  Button,
  List,
  Typography,
  Dropdown,
  Space,
  message,
} from "antd";
import {
  SendOutlined,
  SoundOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { MenuProps } from "antd";

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  file?: UploadFile;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Handle sending messages
  const handleSend = () => {
    if (inputText.trim() || fileList.length > 0) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText.trim(),
        sender: "user",
        file: fileList[0],
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setFileList([]);

      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now(),
          text: "Thank you for your message. How can I assist you further?",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
        // speak(botResponse.text);
      }, 1000);
    }
  };

  // const speak = (text: string) => {
  //   const synth = window.speechSynthesis;
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   synth.speak(utterance); // Reads the text aloud
  // };

  // const handleFileUpload = (info: any) => {
  //   const { status } = info.file;
  //   if (status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //     setFileList([info.file]);
  //   } else if (status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  const items = [
    {
      label: "Feedback",
      key: "feedback",
    },
    {
      label: "Rewrite",
      key: "rewrite",
    },
  ];

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div>
      <Header className="bg-white border-b border-gray-200">
        <Title level={2} className="p-3 text-center">
          Chat Bot
        </Title>
      </Header>
      <Content className="p-4">
        <List
          className="h-[calc(100vh-195px)] mt-4 border border-gray-200 rounded overflow-y-auto"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              className={
                item.sender === "user" ? "justify-end" : "justify-start"
              }
            >
              <div
                className={`max-w-[70%] p-2 rounded ${
                  item.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                <p>{item.text}</p>
                {item.file && (
                  <p className="mt-2">Attached: {item.file.name}</p>
                )}
                <Button
                  icon={<SoundOutlined />}
                  // onClick={() => speak(item.text)}
                  aria-label="Listen to message"
                  className="mt-2"
                >
                  Listen
                </Button>
              </div>
            </List.Item>
          )}
        />
      </Content>
      <Footer className="mt-5 p-4 bg-white">
        <div className="flex items-center space-x-2">
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Choose Option
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            autoSize={{ minRows: 1, maxRows: 1 }}
            className="flex-grow"
          />

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            aria-label="Send message"
          >
            Send
          </Button>
        </div>
      </Footer>
    </div>
  );
}
