import React, { useState } from "react";
import { Layout as AntLayout, Menu, Avatar, PageHeader, Drawer } from "antd";
import styles from "./layout.module.scss";
import { PieChartFilled, InboxOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useAuthDataContext } from "../../core/auth/auth-provider";
import { Link, Route, useHistory } from "react-router-dom";
import { ReceiptsList } from "../receipts/components/receipts-list";
import { Home } from "../home/home";
import { ReceiptDetails } from "../receipts/components/receipt-details";
import { Settings } from "../settings/settings";
import logo from "./logo.jpg";

const { Header, Sider, Content } = AntLayout;

export const Layout = () => {
  const { user, logout } = useAuthDataContext();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const history = useHistory();

  const handleLogout = () => logout(handleLogoutSuccess);
  const handleLogoutSuccess = () => {
    history.push("/");
  };
  const handleShowUserInfo = () => setShowUserInfo(!showUserInfo);

  return (
    <>
      <AntLayout className={styles.container}>
        <Sider theme="light" className={styles.sider} collapsible={true}>
          <div className={styles.menuIcon}>
            <img src={logo} />
          </div>
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <HomeOutlined />
              <span>Home</span>
              <Link to="/home" />
            </Menu.Item>
            <Menu.Item key="2">
              <PieChartFilled />
              <span>Receipts</span>
              <Link to="/home/receipts" />
            </Menu.Item>
            <Menu.Item key="3">
              <InboxOutlined />
              <span>Settings</span>
              <Link to="/home/settings" />
            </Menu.Item>
            <Menu.Item key="4" onClick={handleLogout}>
              <LogoutOutlined />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout>
          <Header className={styles.header}>
            <div className={styles.headerContent}>
              <PageHeader title="Congregation Manager" />
              <div className={styles.myInformation} onClick={handleShowUserInfo}>
                <Avatar size="large">{user.email?.substring(0, 2).toUpperCase()}</Avatar>
                <span className={styles.email}>{user.email}</span>
              </div>
            </div>
          </Header>
          <Content className={styles.content}>
            <Route path="/home" component={Home} exact />
            <Route path="/home/receipts" component={ReceiptsList} exact />
            <Route path="/home/receipts/details" component={ReceiptDetails} />
            <Route path="/home/settings" component={Settings} />
          </Content>
        </AntLayout>
      </AntLayout>
      <Drawer width="400px" placement="right" closable={true} visible={showUserInfo} onClose={handleShowUserInfo}>
        Test
      </Drawer>
    </>
  );
};
