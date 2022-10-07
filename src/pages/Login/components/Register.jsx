import React, { useState } from "react";
import { Button, Form, Input, Radio, message, Select, Cascader } from "antd";
// 测试接口数据
import axios from "axios";

import LoginMsg from "../../../static/loginForRegister.json";
import BG from "../../../utils/BG";
import "./Register.css";

const { Option } = Select;

export function Register() {
  const { Name } = LoginMsg;
  const { Status } = LoginMsg;
  const { Deparment } = LoginMsg;
  const { Position } = LoginMsg;
  const [userMsg, setUserMsg] = useState({});
  // 提交表单后正确和错误的信息
  const onFinish = (values) => {
    const { rePassword } = values;
    delete values.rePassword;
    if (rePassword !== values.password) {
      message.error("两次密码输入不相同，请重新输入！");
      return;
    }
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  // 填写完工号后获取员工信息
  const getUserMsg = (data) => {
    const value = data.target.value;
    if (!value) {
      message.warn("您似乎还没有输入工号哦~");
      return;
    }
    axios
      .get(
        "https://www.fastmock.site/mock/8b2962f568e930a3d394e505c2edc00d/getUserMsgTest/user"
      )
      .then((res) => {
        console.log(res.data);
        setUserMsg({ ...res.data });
      });
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
          {/* 标题 */}
          <div className="center-item">
            <span style={{ textAlign: "center", fontSize: "30px" }}>
              财 税 服 务 评 估 系 统
            </span>
          </div>

          {/* 中间注册信息 */}
          {/* 工号&姓名 */}
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
                <Input
                  className="reg-msg-write"
                  placeholder="请输入您的工号"
                  maxLength={12}
                  onBlur={getUserMsg}
                />
              </Form.Item>
            </div>
            <div className="right">
              <div className="text">
                <span style={{ color: "red" }}>*</span>姓 名:
              </div>
              <div className="reg-msg-write">
                {userMsg.name ? userMsg.name : Name}
              </div>
            </div>
          </div>

          {/* 登录密码&性别 */}
          <div className="center-item">
            <div className="left">
              <div className="text">
                <span style={{ color: "red" }}>*</span>登录密码:
              </div>
              <Form.Item
                name="password"
                noStyle
                rules={[{ required: true, message: "密码不能为空!" }]}
              >
                <Input.Password
                  className="reg-msg-write"
                  placeholder="请输入您的密码"
                />
              </Form.Item>
            </div>
            <div className="right">
              <div className="text">
                <span style={{ color: "red" }}>*</span>性 别:
              </div>
              <div className="reg-msg-write" style={{ borderBottom: "none" }}>
                <Radio checked={userMsg.gender === "mail"} disabled>
                  男
                </Radio>
                <Radio checked={userMsg.gender === "femail"} disabled>
                  女
                </Radio>
              </div>
            </div>
          </div>

          {/* 确认密码&员工状态 */}
          <div className="center-item">
            <div className="left">
              <div className="text">
                <span style={{ color: "red" }}>*</span>确认密码:
              </div>
              <Form.Item
                name="rePassword"
                noStyle
                rules={[{ required: true, message: "请再次确认您的密码!" }]}
              >
                <Input
                  className="reg-msg-write"
                  placeholder="请确认您的密码"
                  type="password"
                />
              </Form.Item>
            </div>
            <div className="right">
              <div className="text">
                <span style={{ color: "red" }}>*</span>员工状态:
              </div>
              <Select
                defaultValue={"在岗"}
                value={userMsg.status}
                className="reg-msg-write"
              >
                {Status.map((item) => {
                  return (
                    <Option value={`${item}`} key={`${item}`} disabled>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>

          {/* 所属部门&职位 */}
          <div className="center-item">
            <div className="left">
              <div className="text">
                <span style={{ color: "red" }}>*</span>所属部门:
              </div>
              <Select
                defaultValue={"市场部"}
                value={userMsg.deparment}
                className="reg-msg-write"
              >
                {Deparment.map((item) => {
                  return (
                    <Option key={`${item}`} value={`${item}`} disabled>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="right">
              <div className="text">
                <span style={{ color: "red" }}>*</span>职 位:
              </div>
              <Cascader
                options={Position}
                defaultValue="市场部 市场总监"
                value={userMsg.position}
                className="reg-msg-write"
                allowClear={false}
              />
            </div>
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
