import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Result } from "antd";
import styles from "./customer-details.module.scss";
import { useHistory } from "react-router-dom";
import { Customer } from "../models/customer";
import { addCustomer, editCustomer } from "../api/customer";
import { InfoCircleOutlined } from "@ant-design/icons";

export const CustomerDetails = () => {
  const history = useHistory();
  const [customer, setCustomer] = useState();
  const [title, setTitle] = useState("");
  const [newCustomer, setNewCustomer] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const customer = history.location.state;
    setCustomer(customer);
    form.setFieldsValue({ ...customer });
    if (customer) {
      setTitle("Customers - Edit Customer");
      setNewCustomer(false);
    } else {
      setTitle("Customers - Add Customer");
      setNewCustomer(true);
    }
  }, [form, history.location.state]);

  const handleCancel = () => {
    history.push("/home/customers");
  };

  const handleSubmit = (values: any) => {
    const customerModel: Customer = { ...values };

    if (!newCustomer) {
      customerModel._id = customer._id;
    }

    const apiCall = newCustomer ? addCustomer : editCustomer;

    apiCall(customerModel)
      .then(() => {
        setMessage("Successfully saved customer details");
        setSuccess(true);
      })
      .catch(() => {
        setMessage("An unexpected error occurred. Please try again");
        setSuccess(false);
      });
  };

  return (
    <>
      <Card className={styles.card} title={title}>
        {message && (
          <Result
            status={success ? "success" : "error"}
            title={message}
            extra={[
              <Button onClick={handleCancel} type="primary" size={"large"} shape="round" key="console">
                Go Back
              </Button>
            ]}
          />
        )}
        {!message && (
          <div className={styles.container}>
            <div>
              <Form name="customerForm" onFinish={handleSubmit} initialValues={{ ...customer }} form={form}>
                <Form.Item name="name" rules={[{ required: true, message: "Customer name is required" }]}>
                  <Input size="large" placeholder="Name" />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, message: "Email is required" }]}>
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item name="address">
                  <Input size="large" placeholder="Address" />
                </Form.Item>
                <Form.Item>
                  <div className={styles.actions}>
                    <Button size="large" shape="round" type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Button size="large" shape="round" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
            <div className={styles.iconContainer}>
              <InfoCircleOutlined className={styles.icon} />
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam porro autem corporis veritatis a tempore
                esse, qui aspernatur in dolorum velit voluptas quibusdam! Aliquid ut, incidunt itaque voluptas
                repellendus sed.
              </div>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};
