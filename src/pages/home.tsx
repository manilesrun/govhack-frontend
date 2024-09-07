import React, { useState } from "react";
import { Layout, Input, Button, List, Upload, message, Typography } from "antd";
import Chatbot from "../components/chatbot.tsx";
import ControlCenter from "../components/options.tsx";

export default function Home() {
  return (
    <Layout className="h-screen flex flex-row ">
      <div className="w-[25%]">
        <ControlCenter />
      </div>
      <div className="w-[75%]">
        <Chatbot />
      </div>
    </Layout>
  );
}
