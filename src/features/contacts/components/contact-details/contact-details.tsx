import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Result } from "antd";
import styles from "./contact-details.module.scss";
import { useHistory } from "react-router-dom";
import { Contact } from "../../models/contact";
import { addContact, editContact } from "../../api/contacts";
import { InfoCircleOutlined } from "@ant-design/icons";

export const ContactDetails = () => {
  const history = useHistory();
  const [contact, setContact] = useState();
  const [title, setTitle] = useState("");
  const [newContact, setNewContact] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const contact = history.location.state;
    setContact(contact);
    form.setFieldsValue({ ...contact });
    if (contact) {
      setTitle("Contacts - Edit Contact");
      setNewContact(false);
    } else {
      setTitle("Contacts - Add Contact");
      setNewContact(true);
    }
  }, [form, history.location.state]);

  const handleCancel = () => {
    history.push("/home/contacts");
  };

  const handleSubmit = (values: any) => {
    const contactModel: Contact = { ...values };

    if (!newContact) {
      contactModel._id = contact._id;
    }

    const apiCall = newContact ? addContact : editContact;

    apiCall(contactModel)
      .then(() => {
        setMessage("Successfully saved contact details");
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
              <Form name="contactForm" onFinish={handleSubmit} initialValues={{ ...contact }} form={form}>
                <Form.Item name="name" rules={[{ required: true, message: "Name is required" }]}>
                  <Input size="large" placeholder="Name" />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, message: "Email is required" }]}>
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item name="telephone">
                  <Input size="large" placeholder="Telephone" />
                </Form.Item>
                <Form.Item name="jobTitle">
                  <Input size="large" placeholder="Job Title" />
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
