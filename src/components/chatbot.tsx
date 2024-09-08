import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
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
import remarkGfm from "remark-gfm";

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

type MessageType = "rewrite" | "feedback";
type DepartmentType = "ATO" | "home_affairs" | "treasury" | "APSC";
interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  file?: UploadFile;
  type?: MessageType;
  department?: DepartmentType;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedOption, setSelectedOption] = useState<MessageType>("rewrite");
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentType>("APSC");

  // Handle sending messages
  const handleSend = () => {
    if (inputText.trim() || fileList.length > 0) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText.trim(),
        sender: "user",
        file: fileList[0],
        type: selectedOption,
      };
      setMessages([...messages, newMessage]);

      setInputText("");
      setFileList([]);

      fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newMessage.text,
          type: selectedOption,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const botResponse: Message = {
            id: Date.now(),
            text: data.answer,
            sender: "bot",
            type: selectedOption,
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        })
        .catch((error) => {
          console.error("Error:", error);
          const botResponse: Message = {
            id: Date.now(),
            text: "Unfortunately, at the moment this site cannot be accessed. Please contact Hax Team for further assistance.",
            sender: "bot",
            type: selectedOption,
          };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        });

      // setTimeout(() => {
      //   const botResponse: Message = {
      //     id: Date.now(),
      //     text: {response.answer},
      //     sender: "bot",
      //     type: selectedOption,
      //   };
      //   setMessages((prevMessages) => [...prevMessages, botResponse]);
      // }, 1000);
    }
  };

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance); // Reads the text aloud
  };

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
      label: "feedback",
      key: "feedback",
    },
    {
      label: "rewrite",
      key: "rewrite",
    },
  ];

  const departments = [
    {
      label: "ATO",
      key: "ATO",
    },
    {
      label: "Home Affairs",
      key: "home_affairs",
    },
    {
      label: "Treasury",
      key: "treasury",
    },
    {
      label: "APSC",
      key: "APSC",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info(`Selected: ${e.key}`);
    setSelectedOption(e.key as MessageType);
  };
  const handleDepartmentClick: MenuProps["onClick"] = (e) => {
    message.info(`Selected: ${e.key}`);
    setSelectedDepartment(e.key as DepartmentType);
  };
  const departmentProps = {
    items: departments,
    onClick: handleDepartmentClick,
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
          className="h-[calc(100vh-300px)] mt-4 border border-gray-200 rounded overflow-y-auto"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              className={
                item.sender === "user" ? "justify-end" : "justify-start"
              }
            >
              <div
                className={`max-w-[70%] p-2 rounded text-wrap ${
                  item.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                <ReactMarkdown>{item.text}</ReactMarkdown>
                <Button
                  icon={<SoundOutlined />}
                  onClick={() => speak(item.text)}
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
      <Footer>
        <div style={{ position: "relative", width: "100%" }}>
          <Dropdown menu={menuProps}>
            <Button
              style={{
                position: "absolute",
                left: "10px",
                top: "10px",
                zIndex: 1,
              }}
            >
              <Space>
                {selectedOption}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Dropdown menu={departmentProps}>
            <Button
              style={{
                position: "absolute",
                left: "10px",
                top: "50px",
                zIndex: 1,
              }}
            >
              <Space>
                {selectedDepartment}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            autoSize={{ minRows: 6, maxRows: 6 }}
            style={{
              paddingLeft: "160px",
              paddingRight: "60px",
            }}
          />

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            aria-label="Send message"
            style={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
            }}
          />
        </div>
      </Footer>
    </div>
  );
}
