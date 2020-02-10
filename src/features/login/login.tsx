import React from "react";
import { Card } from "antd";
import styles from "./login.module.scss";
import { useAuthDataContext } from "../../core/auth/auth-provider";
import { LockOutlined } from "@ant-design/icons";

export const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuthDataContext();

  return (
    <>
      {!isAuthenticated && (
        <div className={styles.container}>
          <Card title="Login" className={styles.card}>
            <div className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsa optio quod harum amet tempore
              laboriosam ex hic saepe sit accusamus deleniti error, eum ad ullam iure nemo minima veritatis?
            </div>
            <div onClick={loginWithRedirect} className={styles.lockIconContainer}>
              <LockOutlined className={styles.lockIcon} />
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
