import React, { useEffect, useState } from "react";
import { Table, Tag, Card, Button, Divider, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getReceipts } from "../api/receipts";
import { Receipt } from "../models/receipt";
import { useHistory } from "react-router-dom";
import styles from "./receipts-list.module.scss";

export const ReceiptsList = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const history = useHistory();

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Worldwide Work",
      dataIndex: "worldWide",
      key: "worldWide"
    },
    {
      title: "Congregation",
      dataIndex: "congregation",
      key: "congregation"
    },
    {
      title: "Branch",
      key: "branch",
      dataIndex: "branch"
    },
    {
      title: "Total",
      render: (receipt: Receipt) => <div>{receipt.worldWide + receipt.congregation + receipt.branch}</div>
    },
    {
      title: "Actions",
      key: "actions",
      render: (receipt: Receipt) => (
        <div>
          <Button onClick={() => handleReceiptEdit(receipt)} size="large" type="default" shape="circle">
            <EditOutlined />
          </Button>
          <Divider type="vertical" />
          <Popconfirm title="Are you sure to delete this receipt?" okText="Yes" cancelText="No" onConfirm={() => {}}>
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
      const receipts = await getReceipts();
      setReceipts(receipts);
    }

    get();
  }, []);

  const handleAddReceipt = () => {
    history.push("/home/customers/details");
  };

  const handleReceiptEdit = (receipt: Receipt) => {
    history.push("/home/customers/details", receipt);
  };

  return (
    <Card
      className={styles.card}
      title="Customers"
      extra={
        <Button onClick={handleAddReceipt} size="large" type="primary" shape="round">
          Add receipt
        </Button>
      }
    >
      <Table columns={columns} dataSource={receipts} />
    </Card>
  );
};
