import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { Form, Input, Button, Checkbox, Skeleton } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
// import httpUtill from "../../../utils/httpUtil";

export const User = () => {
  const onFinish = (values) => {
    // const { code } = values;
    // delete values.code;
    // const data = {
    //   userMessage: values,
    //   code,
    // };
    console.log(values);
  };

  const [serverCode, setServerCode] = useState("");

  useEffect(() => {
    getServerCode();
  }, []);

  const getServerCode = () => {
    // httpUtill.getServerCode("3212960476@qq.com").then((res) => {
    //   console.log(res);
    // });
    // httpUtill.getRegisterStatus().then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="userName"
        rules={[
          {
            required: true,
            message: "please enter your account!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="post office addressing"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "please enter your password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="password"
        />
      </Form.Item>

      {/* <div
        style={{
          position: "relative",
        }}
      >
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: "please enter the verification code!",
            },
          ]}
          style={{
            width: "72%",
          }}
        >
          <Input
            prefix={<SafetyCertificateOutlined />}
            type="text"
            placeholder="verification code"
          />
        </Form.Item> */}
        {/* {serverCode ? (
          <img
            src={serverCode}
            alt=""
            style={{
              width: "28%",
              height: "100%",
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
            }}
            onClick={getServerCode}
          />
        ) : (
          <Skeleton.Button
            active
            style={{
              width: "28%",
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
            }}
          />
        )}
      </div> */}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginTop: 20 }}
        >
          Login
        </Button>
      </Form.Item>

      <Form.Item>
        <Form.Item valuePropName="checked" noStyle>
          <Checkbox>remember password</Checkbox>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};
