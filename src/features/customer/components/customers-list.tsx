import React, { useEffect, useState } from "react";
import { Table, Tag, Card, Button, Divider, Popconfirm, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getCustomers, deleteCustomer } from "../api/customer";
import { Customer } from "../models/customer";
import { useHistory } from "react-router-dom";
import styles from "./customers-list.module.scss";

export const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const history = useHistory();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (customer: Customer) => (
        <span>
          <Tag color="green">Active</Tag>
        </span>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (customer: Customer) => (
        <div>
          <Button onClick={() => handleCustomerEdit(customer)} size="large" type="default" shape="circle">
            <EditOutlined />
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete this customer?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleCustomerDelete(customer._id)}
          >
            <Button type="danger" shape="circle" size="large">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  useEffect(() => {
    async function get() {
      const customers = await getCustomers();
      setCustomers(customers);
    }

    get();
  }, []);

  const handleAddCustomer = () => {
    history.push("/home/customers/details");
  };
  const handleCustomerDelete = (id: string) => {
    deleteCustomer(id)
      .then(() => {
        notification.info({ message: "Customer deleted" });
      })
      .catch(() => {
        notification.info({ message: "Failed to delete customer" });
      });
  };
  const handleCustomerEdit = (customer: Customer) => {
    history.push("/home/customers/details", customer);
  };

  return (
    <Card
      className={styles.card}
      title="Customers"
      extra={
        <Button onClick={handleAddCustomer} size="large" type="primary" shape="round">
          Add customer
        </Button>
      }
    >
      <Table columns={columns} dataSource={customers} />
    </Card>
  );
};
