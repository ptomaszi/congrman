import React, { useState } from "react";
import { Card, Form, Input, Result, Button } from "antd";
import styles from "./login.module.scss";
import { useAuthDataContext } from "../../core/auth/auth-embedded-provider";
import { LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const LoginEmbedded = () => {
  const { login } = useAuthDataContext();
  const [showError, setShowError] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const handleSubmit = () => {
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");

    setShowError(false);
    login(username, password, handleLoginSuccess, handleLoginFail);
  };

  const handleLoginSuccess = () => {
    history.push("/home");
  };

  const handleLoginFail = () => {
    setShowError(true);
  };

  const handleTryAgain = () => {
    setShowError(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Card title="Login" className={styles.card}>
          {showError && (
            <Result
              status="403"
              title="Login Failed"
              subTitle="Sorry, the login details you provided are incorrect."
              extra={
                <Button type="primary" shape="round" size="large" onClick={handleTryAgain}>
                  Try again
                </Button>
              }
            />
          )}
          {!showError && (
            <div>
              <div className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsa optio quod harum amet tempore
                laboriosam ex hic saepe sit accusamus deleniti error, eum ad ullam iure nemo minima veritatis?
              </div>
              <Form form={form} name="loginForm" onFinish={handleSubmit}>
                <Form.Item name="username" rules={[{ required: true, message: "Username is required" }]}>
                  <Input size="large" placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Password is required" }]}>
                  <Input size="large" placeholder="Password" type="password" />
                </Form.Item>
                <Form.Item>
                  <div onClick={() => form.submit()} className={styles.lockIconContainer}>
                    <LockOutlined className={styles.lockIcon} />
                  </div>
                </Form.Item>
              </Form>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};
