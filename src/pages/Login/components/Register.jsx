import React, { useState } from "react";
import { Button, Form, Input, Radio, message, Select } from "antd";

import BG from "../../../utils/BG";
import "./Register.scss";

const { Option } = Select;

export function Register() {
  // 提交表单后正确和错误的信息
  const onFinish = (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  // 下拉框
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="Register">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="reg-center">
          <div className="center-item">
            <span style={{ textAlign: "center", fontSize: "30px" }}>
              优 化 服 务 评 估 系 统
            </span>
          </div>
          {/* 中间注册信息 */}
          {/* 工号&密码 */}
          <div className="center-item">
            <div className="left">
              <div className="text">
                <span style={{ color: "red" }}>*</span>工 号:
              </div>
              <Form.Item
                name="userId"
                noStyle
                rules={[{ required: true, message: "请输入您的工号!" }]}
              >
                <Input className="reg-msg-write" />
              </Form.Item>
            </div>
            <div className="right">
              <div className="text">
                <span style={{ color: "red" }}>*</span>登录密码:
              </div>
              <Form.Item
                name="password"
                noStyle
                rules={[{ required: true, message: "请输入您的密码!" }]}
              >
                <Input className="reg-msg-write" />
              </Form.Item>
            </div>
          </div>

          {/* 姓名&性别 */}
          <div className="center-item">
            <div className="left">
              <div className="text">
                <span style={{ color: "red" }}>*</span>姓 名:
              </div>
              <div className="reg-msg-write">jiejie</div>
            </div>
            <div className="right">
              <div className="text">
                <span style={{ color: "red" }}>*</span>性 别:
              </div>
              <div className="reg-msg-write" style={{ borderBottom: "none" }}>
                <Radio defaultChecked={true} disabled>
                  男
                </Radio>
                <Radio disabled>女</Radio>
              </div>
            </div>
          </div>

          {/* 所属部门&员工状态 */}
          <div className="center-item">
            <div className="left">
              <div className="text">
                <span style={{ color: "red" }}>*</span>所属部门:
              </div>
              {/* <div className="reg-msg-write"> */}
                <Select
                  defaultValue="市场部"
                  className="reg-msg-write"
                >
                  <Option value="shichang">市场部</Option>
                  <Option value="xiangmu">项目部</Option>
                  <Option value="zongjingban">总经办</Option>
                </Select>
              {/* </div> */}
            </div>
            <div className="right">
              <div className="text">
                <span style={{ color: "red" }}>*</span>员工状态:
              </div>
              <div className="reg-msg-write"></div>
            </div>
          </div>

          {/* 职位 */}
          <div className="center-item">
            <div className="left">
              <div className="text">
                <span style={{ color: "red" }}>*</span>职 位:
              </div>
              <div className="reg-msg-write"></div>
            </div>
            <div className="right"></div>
          </div>

          {/* 注册按钮 */}
          <div className="center-item">
            <Button
              type="primary"
              className="reg-button-center"
              htmlType="submit"
            >
              注册
            </Button>
          </div>

          {/* 版权信息 */}
          <div className="center-item">
            <span style={{ fontSize: "16px" }}>
              Copyright &copy; {new Date().getFullYear()} MISLab 版权所有
            </span>
          </div>
        </div>
      </Form>
      <BG />
    </div>
  );
}
