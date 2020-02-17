import React, { useState, useEffect, useRef } from "react";
import { Card, Form, Input, Result, Button } from "antd";
import styles from "./login.module.scss";
import { useAuthDataContext } from "../../core/auth/auth-provider";
import {
  LockOutlined,
  TeamOutlined,
  SolutionOutlined,
  DollarCircleOutlined,
  InfoCircleOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import image from "./image.png";
import gsap from "gsap";

export const LoginEmbedded = () => {
  const { login } = useAuthDataContext();
  const [showError, setShowError] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const publishers = useRef(null);
  const reports = useRef(null);
  const accounting = useRef(null);
  const muchMore = useRef(null);
  const header = useRef(null);
  const loginButton = useRef(null);
  const [spinSetting, setSpinSetting] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.from(header.current, { scale: 2, duration: 2, ease: "back" });
    timeline.to(publishers.current, { duration: 0.5, fontSize: "1.8rem", fontWeight: "bold" });
    timeline.to(reports.current, { duration: 0.5, fontSize: "1.8rem", fontWeight: "bold" });
    timeline.to(accounting.current, { duration: 0.5, fontSize: "1.8rem", fontWeight: "bold" });
    timeline.to(muchMore.current, { duration: 0.5, fontSize: "1.8rem", fontWeight: "bold" });
    timeline.to(publishers.current, { duration: 0, fontWeight: "normal" });
    timeline.to(reports.current, { duration: 0, fontWeight: "normal" });
    timeline.to(accounting.current, { duration: 0, fontWeight: "normal" });
    timeline.to(muchMore.current, { duration: 0, fontWeight: "normal" });
    timeline.to(loginButton.current, { scale: 1.5 });
    timeline.to(loginButton.current, { scale: 1 });
  }, []);

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

  const handleLoginButtonHover = () => {
    gsap.to(loginButton.current, 0.5, { scale: 1.5, opacity: 0.7 });
  };

  const handleLoginButtonLeave = () => {
    gsap.to(loginButton.current, 0.5, { scale: 1, opacity: 1 });
  };

  return (
    <>
      <div className={styles.container}>
        <div ref={header} className={styles.header}>
          Congregation Manager
        </div>
        <ul className={styles.subHeader}>
          <li>
            <TeamOutlined className={styles.icon} />
            <span ref={publishers} className={styles.text}>
              Publishers
            </span>
          </li>
          <li>
            <SolutionOutlined className={styles.icon} />
            <span ref={reports} className={styles.text}>
              Reports
            </span>
          </li>
          <li>
            <DollarCircleOutlined className={styles.icon} />
            <span ref={accounting} className={styles.text}>
              Accounting
            </span>
          </li>
          <li>
            <InfoCircleOutlined className={styles.icon} />
            <span ref={muchMore} className={styles.text}>
              Much more...
            </span>
          </li>
        </ul>
        <div className={styles.loginRow}>
          <div>
            <img src={image} />
          </div>
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
                    <div
                      ref={loginButton}
                      onClick={() => form.submit()}
                      onMouseOver={handleLoginButtonHover}
                      onMouseLeave={handleLoginButtonLeave}
                      className={styles.lockIconContainer}
                    >
                      <LockOutlined className={styles.lockIcon} />
                    </div>
                  </Form.Item>
                </Form>
              </div>
            )}
          </Card>
          <div
            className={styles.settingIcon}
            onMouseOver={() => setSpinSetting(!spinSetting)}
            onMouseLeave={() => setSpinSetting(false)}
          >
            <span>
              <SettingOutlined className={styles.first} spin={spinSetting} />
            </span>
            <span>
              <SettingOutlined className={styles.second} spin={spinSetting} />
            </span>
            <span>
              <SettingOutlined className={styles.third} spin={spinSetting} />
            </span>
          </div>
        </div>
        <footer>Congregation Manager @ {new Date().getFullYear()}</footer>
      </div>
      <div className={styles.stepOneContainer}>
        <div className={styles.icon}>
          <TeamOutlined className={styles.icon} />
        </div>
      </div>
      <div className={styles.stepTwoContainer}>
        <div className={styles.icon}>
          <SolutionOutlined className={styles.icon} />
        </div>
      </div>
      <div className={styles.stepThreeContainer}>
        <div className={styles.icon}>
          <DollarCircleOutlined className={styles.icon} />
        </div>
      </div>
    </>
  );
};
