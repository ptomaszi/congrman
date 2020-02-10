import React from "react";
import { Statistic, Card } from "antd";
import styles from "./home.module.scss";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Statistic title="Total Customers" value={12283621}></Statistic>
      </Card>
      <Card className={styles.card}>
        <Statistic
          title="Active Contacts"
          value={23}
          valueStyle={{ color: "#3f8600" }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        ></Statistic>
      </Card>
      <Card className={styles.card}>
        <Statistic
          title="Active Customers"
          value={11}
          valueStyle={{ color: "#cf1322" }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        ></Statistic>
      </Card>
      <Card className={styles.card}>
        <Statistic title="Total Files Exchanged" value={5283621}></Statistic>
      </Card>
      <Card className={styles.card}>
        <Statistic title="Total Documents Exchanged" value={1115283621}></Statistic>
      </Card>
      <Card className={styles.card}>
        <Statistic title="Total Invoices Exchanged" value={1115283621}></Statistic>
      </Card>
    </div>
  );
};
