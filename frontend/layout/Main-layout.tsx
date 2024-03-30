import { Avatar, Button, Layout, Space, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useCookies } from "react-cookie";
import React from "react";

const MainLayout = (props) => {
  // const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const logout = () => {
    navigate("/logout");
  };
  return (
    <>
        <Layout>
          <Header className="flex justify-between bg-white px-6">
            <Button
              className="my-auto flex-none "
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <div>
              <Space size={24}>
                <Tooltip title={cookies.LoginData.User_role} color="#1677ff">
                  <Avatar
                    size={40}
                    className=" mr-4 cursor-pointer bg-[#1677ff] align-middle hover:bg-black"
                    shape="square"
                    icon={<UserOutlined />}
                    // src={<img src={url} alt="avatar" />}
                  />
                </Tooltip>
              </Space>
              <Tooltip title="logout" color="red">
                <LogoutOutlined
                  className="mr-20 cursor-pointer hover:text-red-500"
                  onClick={logout}
                />
              </Tooltip>
            </div>
          </Header>
          <Content className="min-h-[280px] p-6">{props.children}</Content>
        </Layout>
    </>
  );
};

export default MainLayout;
