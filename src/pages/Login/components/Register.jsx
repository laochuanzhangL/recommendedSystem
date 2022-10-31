import React from "react";
import { Button, Form, Input, Radio, message, Select, Cascader } from "antd";
import httpUtil from "../../../utils/httpUtil";

import BG from "../../../utils/BG";
import "./Register.css";

const { Option } = Select;

export function Register(props) {
  const {history} = props
  const userStatus = ["在岗", "离职", "请假", "实习", "兼职", "停薪留职"];
  const userPosition = [
    {
      value: "shichang",
      label: "市场部",
      children: [
        {
          value: "zongjian",
          label: "市场总监",
        },
        {
          value: "jingli",
          label: "经理",
        },
        {
          value: "zhuguan",
          label: "主管",
        },
        {
          value: "zhuanyuan",
          label: "市场专员",
        },
      ],
    },
    {
      value: "xiangmu",
      label: "项目部",
      children: [
        {
          value: "jingli",
          label: "项目经理",
        },
        {
          value: "jinglizhuli",
          label: "项目经理助理",
          children: [
            { value: "caiwu", label: "财务" },
            { value: "shuiwu", label: "税务" },
            { value: "fawu", label: "法务" },
          ],
        },
        {
          value: "kuaiji",
          label: "项目会计",
        },
      ],
    },
    {
      value: "zongjingban",
      label: "总经办",
      children: [
        {
          value: "zongjingli",
          label: "总经理",
        },
        {
          value: "mishu",
          label: "经理秘书",
        },
        {
          value: "zhuli",
          label: "经理助理",
        },
      ],
    },
  ];
  // 提交表单后正确和错误的信息
  const onFinish = (values) => {
    console.log(values);
    const params={
      code: "123",
      mobile: "15922852538",
      password: values.password,
      uid: values.userId
    }
    httpUtil.register(params)
    .then((res)=>{
      if(res.code==200){
        message.success("注册成功")
        history.replace("/login/login")
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
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
                <Input className="reg-msg-write" placeholder="请输入您的工号" />
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
                <Input
                  className="reg-msg-write"
                  placeholder="请输入您的密码"
                  type="password"
                />
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
              <Select defaultValue="市场部" className="reg-msg-write">
                <Option value="shichang" disabled>
                  市场部
                </Option>
                <Option value="xiangmu" disabled>
                  项目部
                </Option>
                <Option value="zongjingban" disabled>
                  总经办
                </Option>
              </Select>
            </div>
            <div className="right">
              <div className="text">
                <span style={{ color: "red" }}>*</span>员工状态:
              </div>
              <Select defaultValue="在岗" className="reg-msg-write">
                {userStatus.map((item) => {
                  return (
                    <Option value={`${item}`} key={`${item}`} disabled>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>

          {/* 职位 */}
          <div className="center-item">
            <div className="left">
              <div className="text">
                <span style={{ color: "red" }}>*</span>职 位:
              </div>
              <Cascader
                options={userPosition}
                placeholder="职 位"
                className="reg-msg-write"
              />
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
