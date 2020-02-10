import React, { useEffect, useState } from "react";
import styles from "./contacts-list.module.scss";
import { Card, Avatar, Button } from "antd";
import { getContacts } from "../../api/contacts";
import { Contact } from "../../models/contact";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const ContactsList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function get() {
      const contacts = await getContacts();
      setContacts(contacts);
    }

    get();
  }, []);

  const handleAddCustomer = () => {
    history.push("/home/contacts/details");
  };

  return (
    <>
      <div className={styles.addCustomerButton}>
        <Button onClick={handleAddCustomer} size="large" type="primary" shape="round">
          Add contact
        </Button>
      </div>
      <div className={styles.container}>
        {contacts.map((contact: Contact) => (
          <Card
            title={contact.email}
            extra={
              <Avatar size="large" style={{ backgroundColor: "#87d068" }}>
                <UserOutlined />
              </Avatar>
            }
            className={styles.card}
          >
            <div>{contact.name}</div>
            <div>{contact.jobTitle}</div>
            <div>{contact.telephone}</div>
          </Card>
        ))}
      </div>
    </>
  );
};
