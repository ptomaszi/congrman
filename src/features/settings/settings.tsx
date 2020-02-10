import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

export const Settings = () => {
  const history = useHistory();

  const handleBackHome = () => {
    history.push("/home");
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" size="large" shape="round" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};
