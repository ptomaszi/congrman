import React, { useState } from "react";
import { Layout as AntLayout, Menu, Avatar, PageHeader, Drawer } from "antd";
import styles from "./layout.module.scss";
import { PieChartFilled, DesktopOutlined, InboxOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useAuthDataContext } from "../../core/auth/auth-embedded-provider";
import { Link, Route } from "react-router-dom";
import { CustomersList } from "../customer/components/customers-list";
import { Home } from "../home/home";
import { CustomerDetails } from "../customer/components/customer-details";
import { Settings } from "../settings/settings";
import { UserInfo } from "../user-info/user-info";
import { ContactsList } from "../contacts/components/contacts-list/contacts-list";
import { ContactDetails } from "../contacts/components/contact-details/contact-details";

const { Header, Sider, Content } = AntLayout;

export const Layout = () => {
  const { getUser, logout } = useAuthDataContext();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleLogout = () => logout();
  const handleShowUserInfo = () => setShowUserInfo(!showUserInfo);

  return (
    <>
      <AntLayout className={styles.container}>
        <Sider theme="light" className={styles.sider} collapsible={true}>
          <div className={styles.menuIcon}>
            <Avatar size="large" src={getUser().picture} />
          </div>
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <HomeOutlined />
              <span>Home</span>
              <Link to="/home" />
            </Menu.Item>
            <Menu.Item key="2">
              <PieChartFilled />
              <span>Customers</span>
              <Link to="/home/customers" />
            </Menu.Item>
            <Menu.Item key="3">
              <DesktopOutlined />
              <span>Contacts</span>
              <Link to="/home/contacts" />
            </Menu.Item>
            <Menu.Item key="4">
              <InboxOutlined />
              <span>Settings</span>
              <Link to="/home/settings" />
            </Menu.Item>
            <Menu.Item key="5" onClick={handleLogout}>
              <LogoutOutlined />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout>
          <Header className={styles.header}>
            <div className={styles.headerContent}>
              <PageHeader title="Customer Manager" subTitle="Manage your customers and users from a single place..." />
              <div className={styles.myInformation} onClick={handleShowUserInfo}>
                <Avatar src={getUser().picture} />
                <span className={styles.email}>{getUser().name}</span>
              </div>
            </div>
          </Header>
          <Content className={styles.content}>
            <Route path="/home" component={Home} exact />
            <Route path="/home/customers" component={CustomersList} exact />
            <Route path="/home/customers/details" component={CustomerDetails} />
            <Route path="/home/contacts" component={ContactsList} exact />
            <Route path="/home/contacts/details" component={ContactDetails} />
            <Route path="/home/settings" component={Settings} />
          </Content>
        </AntLayout>
      </AntLayout>
      <Drawer width="400px" placement="right" closable={true} visible={showUserInfo} onClose={handleShowUserInfo}>
        <UserInfo user={getUser()} />
      </Drawer>
    </>
  );
};
