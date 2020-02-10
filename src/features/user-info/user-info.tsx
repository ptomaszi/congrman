import React from "react";
import { User } from "./models/user";
import { Descriptions, Avatar } from "antd";
import styles from "./user-info.module.scss";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export interface Props {
  user: User;
}

export const UserInfo = (props: Props) => {
  const lastLogin = new Date(props.user.updated_at).toLocaleString();
  return (
    <>
      <Avatar className={styles.avatar} src={props.user.picture} size={80} />
      <Descriptions title="User Info" bordered column={{ md: 1 }}>
        <Descriptions.Item label="Nickname">{props.user.nickname}</Descriptions.Item>
        <Descriptions.Item label="Name">{props.user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{props.user.email}</Descriptions.Item>
        <Descriptions.Item label="Last login">{lastLogin}</Descriptions.Item>
        <Descriptions.Item label="Verfied">
          {props.user.email_verified && <CheckCircleOutlined className={styles.iconEmailVerified} />}
          {!props.user.email_verified && <CloseCircleOutlined className={styles.iconEmailNotVerified} />}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
