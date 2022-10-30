import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Tabs,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import httpUtil from "../../../utils/httpUtil";

import "./User.css";
import BG from "../../../utils/BG";

const Login = (props) => {
  const { history } = props.props;
  // 提交表单信息
  const onFinish = (values) => {
    console.log(values);
    const params={
      uid:values.userID,
      password:values.password,
      verCode:""
    }
    httpUtil.login(params).then((res) => {
      if(res.code==200){
        message.success(res.message)
        localStorage.setItem("uid",res.data.employeeInfo.uid)
        localStorage.setItem("name",res.data.employeeInfo.name)
        localStorage.setItem("token",res.data.employeeInfo.token)
        history.push("/home")
      }
    });
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
      {/* 输入工号 */}
      <Form.Item
        name="userID"
        rules={[
          {
            required: true,
            message: "请输入您的工号！",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder=" 员工工号"
        />
      </Form.Item>

      {/* 输入密码 */}
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "密码不能为空！",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder=" 登录密码"
        />
      </Form.Item>

      {/* 提交表单 */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginTop: 20 }}
        >
          Login
        </Button>
      </Form.Item>

      {/* 记住密码&跳转登录 */}
      <Form.Item>
        <Form.Item valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
          <Link
            to="/login/register"
            style={{ color: "rgb(24,144,255)", marginLeft: "88px" }}
          >
            没有账号？点此注册 &gt;
          </Link>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};
export function User(props) {
  return (
    <Fragment>
      <div className="login-wrap">
        <div className="login-top">财 税 服 务 评 估 系 统</div>
        <Tabs
          className="login-select-form"
          defaultActiveKey="1"
          centered={true}
          tabBarGutter={80}
          items={[
            {
              label: ` 用 户 登 录 `,
              key: "1",
              children: <Login props={props} />,
              className: "login-select-form-content",
            },
          ]}
        />
        <div className="login-text">
          Copyright &copy; {new Date().getFullYear()} MISLab 版权所有
        </div>
        <BG />
      </div>
    </Fragment>
  );
}
