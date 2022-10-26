import React, { useState, useEffect } from "react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DesktopOutlined,
  EditFilled,
  CopyFilled,
  DeleteFilled,
  FundFilled,
} from "@ant-design/icons";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Space,
  Select,
  Modal,
  Input,
  message,
  Divider,
  DatePicker,
  Table,
} from "antd";
import PubSub from "pubsub-js";

import Routes from "./routes";
import Basic from "./pages/basicInformation";
import Manage from "./pages/manageSituation";
import httpUtil from "../../utils/httpUtil.js";

import "./index.css";
import "../../static/iconfont.css";

export default function Home() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("");
  const [showTime, setShowTime] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [mainCompanies, setMainCompanies] = useState([
  //   { name: "主体公司1xxx", checked: true },
  //   { name: "主体公司2xxx", checked: false },
  //   { name: "主体公司3xxx", checked: false },
  // ]);
  const [edit, setEdit] = useState({
    basicEdit: false,
    manageEdit: false,
  });

  // 各表格的修改状态
  const { basicEdit, manageEdit } = edit;

  // 获取登录的用户信息
  const userid = localStorage.getItem("uid");

  // 实时获取时间
  function formateDate(time) {
    if (!time) return "";
    let date = new Date(time);
    return (
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getDate() +
      "日 " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }

  useEffect(() => {
    httpUtil.getEmployeeMsg(userid).then((res) => {
      if (res.code == 200) {
        message.success("用户请求成功!");
        setUserName(res.data.name);
      }
    });
  }, []);

  // url
  const urlParams = new URL(window.location.href);
  const pathname = urlParams.pathname;

  // // 点击添加主体公司函数
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   message.success("添加成功");
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // const addMainCompany = () => {
  //   setMainCompanies("添加");
  // };

  // // 点击active
  // const itemClick = function (item, index) {
  //   mainCompanies.forEach((item) => {
  //     item.checked = false;
  //   });
  //   mainCompanies[index].checked = true;
  // };

  return (
    <Layout className="homeBack">
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
        <div className="head-left">
          <div>海修睿</div>
          <Divider
            type="vertical"
            style={{
              backgroundColor: "white",
            }}
          />
          <div>
            <div>共享平台经济</div>
            <div>让企业经营变得简单</div>
          </div>
        </div>
        <div className="head-right">
          <div className="head-right-img"></div>
          <div className="head-right-text">
            {/* 这里的具体信息要用参数实时获取 */}
            <div>{userName}</div>
          </div>
        </div>
      </Header>
      <Layout className="site-layout">
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
          {/* <IndustrySelect /> */}
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["homePage"]}
            defaultOpenKeys={["workBench"]}
          >
            <Menu.SubMenu
              key="workBench"
              icon={<DesktopOutlined />}
              title="工作台"
            >
              <Menu.Item key="homePage" icon={<FundFilled />}>
                <Link to="/home/homePage">我的首页</Link>
              </Menu.Item>
              <Menu.Item icon={<CopyFilled />}>
                <Link to="/home/projectManage">项目管理</Link>
              </Menu.Item>
              <Menu.Item icon={<DeleteFilled />}>
                <Link to="/home/bin">回收站</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="infoFill" icon={<EditFilled />} title="信息填写">
              <Menu.Item key="basic" title="企业基本信息">
                <Link to="/home/basic">企业基本信息</Link>
              </Menu.Item>
              <Menu.Item key="manage" title="企业经营情况">
                <Link to="/home/manage">企业经营情况</Link>
              </Menu.Item>
              <Menu.Item key="relevant" title="企业相关问题">
                <Link to="/home/relevant">企业相关问题</Link>
              </Menu.Item>
              <Menu.Item key="solve" title="解决方案及成本">
                <Link to="/home/solve">解决方案及成本</Link>
              </Menu.Item>
              <Menu.Item key="success" title="成功案例">
                <Link to="/home/success">成功案例</Link>
              </Menu.Item>
              <Menu.Item key="detail" title="详细介绍">
                <Link to="/home/detail">详细介绍</Link>
              </Menu.Item>
              <Menu.Item key="sign" title="合同签订">
                <Link to="/home/sign">合同签订</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
          </div>
        </Sider>
        {pathname == "/home/basic" ? (
          <Content
            className="site-layout-background"
            style={{
              margin: "5px 16px 0px 16px",
              padding: 0,
            }}
          >
            <Space
              style={{
                width: "99%",
                height: "60px",
                marginTop: "5px",
                justifyContent: "end",
                paddingLeft: "16px",
                display: "flex",
              }}
            >
              {/* <div style={{ display: pathname == "/home/basic" ? "flex" : "none" }}>
            {mainCompanies.map((item, index) => {
              return (
                <div
                  className={
                    item.checked
                      ? "mainCompany mainCompany-active"
                      : "mainCompany "
                  }
                  key={index}
                  onClick={itemClick.bind(this, item, index)}
                >
                  {item.name}
                </div>
              );
            })}
            <div className="iconfont" onClick={showModal}>
              &#xe608;
            </div>
            <Modal
              title="请输入公司名字"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input placeholder="主题公司名字" />
            </Modal>
          </div> */}
              <div>
                <Button
                  className="saveBtn"
                  type="primary"
                  style={{ borderRadius: "5px" }}
                  size="middle"
                  onClick={() => {
                    setEdit({
                      basicEdit: false,
                    });
                    if(basicEdit){
                    PubSub.publish("basicEdit", !basicEdit);
                    PubSub.publish("basicSave",true)
                    }
                  }}
                >
                  保存
                </Button>
                <Button
                  className="editBtn"
                  style={{ borderRadius: "5px" }}
                  size="middle"
                  onClick={() => {
                    setEdit({
                      basicEdit: true,
                      manageEdit: false,
                    });
                    if(!basicEdit)
                    PubSub.publish("basicEdit", !basicEdit);
                  }}
                >
                  修改
                </Button>
              </div>
            </Space>
            <Switch>
                <Route path={'/home/basic'} component={Basic} />
              <Redirect to="/home/homePage" />
            </Switch>
          </Content>
        ) : pathname == "/home/manage" ? (
          <Content
            className="site-layout-background"
            style={{
              margin: "5px 16px 0px 16px",
              padding: 0,
            }}
          >
            <Space
              style={{
                width: "99%",
                height: "60px",
                marginTop: "5px",
                justifyContent: "end",
                paddingLeft: "16px",
                display: "flex",
              }}
            >
              {/* <div style={{ display: pathname == "/home/basic" ? "flex" : "none" }}>
            {mainCompanies.map((item, index) => {
              return (
                <div
                  className={
                    item.checked
                      ? "mainCompany mainCompany-active"
                      : "mainCompany "
                  }
                  key={index}
                  onClick={itemClick.bind(this, item, index)}
                >
                  {item.name}
                </div>
              );
            })}
            <div className="iconfont" onClick={showModal}>
              &#xe608;
            </div>
            <Modal
              title="请输入公司名字"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input placeholder="主题公司名字" />
            </Modal>
          </div> */}
              <div>
                <Button
                  className="saveBtn"
                  type="primary"
                  style={{ borderRadius: "5px" }}
                  size="middle"
                  onClick={() => {
                    setEdit({
                      manageEdit: false,
                    });
                    if(manageEdit){
                      PubSub.publish("manageEdit", !manageEdit);
                      PubSub.publish("manageSave", true);
                    }
                  }}
                >
                  保存
                </Button>
                <Button
                  className="editBtn"
                  style={{ borderRadius: "5px" }}
                  size="middle"
                  onClick={() => {
                    setEdit({
                      basicEdit: false,
                      manageEdit: true,
                    });
                    if(!manageEdit)
                    PubSub.publish("manageEdit", !manageEdit);
                  }}
                >
                  修改
                </Button>
              </div>
            </Space>
            <Switch>
                <Route path={'/home/manage'} component={Manage} />
              <Redirect to="/home/homePage" />
            </Switch>
          </Content>
        ) : pathname == "/home/homePage" ? (
          <Layout>
            <div className="homePage-top-layout-background"></div>
            <div className="homePage-middle-layout-background"></div>
            <div className="homePage-buttom-layout-background"></div>
          </Layout>
        ) : pathname == "/home/projectManage" ? (
          <Layout>
            <div className="projectManage-top-layout-background">
              <div className="projectManage-top-title-wrap">
                <span>查询</span>
              </div>
              <div className="projectManage-top-queryForm-wrap1">
                <div>
                  <span>项目编号&nbsp;</span>
                  <Input type="text" style={{ width: "15vw" }}></Input>
                </div>
                <div>
                  <span>企业名称&nbsp;</span>
                  <Input type="text" style={{ width: "15vw" }}></Input>
                </div>
                <div>
                  <span>所属行业&nbsp;</span>
                  <Select style={{ width: "15vw" }}>
                    <Select.Option>物流运输行业</Select.Option>
                    <Select.Option>建筑行业</Select.Option>
                    <Select.Option>教育培训行业</Select.Option>
                    <Select.Option>科技行业</Select.Option>
                  </Select>
                </div>
                <div>
                  <span>项目状态&nbsp;</span>
                  <Select style={{ width: "10vw" }}>
                    <Select.Option>暂定</Select.Option>
                    <Select.Option>暂定</Select.Option>
                  </Select>
                </div>
              </div>
              <div className="projectManage-top-queryForm-wrap2">
                <div>
                  <span>创建时间&nbsp;</span>
                  <DatePicker.RangePicker
                    showTime
                    style={{ width: "35.3vw" }}
                  ></DatePicker.RangePicker>
                </div>
                <div>
                  <span>完成时间&nbsp;</span>
                  <DatePicker.RangePicker
                    showTime
                    style={{ width: "36vw" }}
                  ></DatePicker.RangePicker>
                </div>
              </div>
              <div className="projectManage-top-actionBtn-wrap">
                <div className="projectManage-top-leftBtn-wrap">
                  <Space size={"middle"}>
                    <Button danger>删除</Button>
                    <Button>导出</Button>
                  </Space>
                </div>
                <div className="projectManage-top-rightBtn-wrap">
                  <Space size={"middle"}>
                    <Button type="primary">搜索</Button>
                    <Button>重置</Button>
                  </Space>
                </div>
              </div>
            </div>
            <div className="projectManage-buttom-layout-background">
              <Table></Table>
            </div>
          </Layout>
        ) : (
          <Content
            className="site-layout-background"
            style={{
              margin: "5px 16px 0px 16px",
              padding: 0,
            }}
          >
            <Space
              style={{
                width: "99%",
                height: "60px",
                marginTop: "5px",
                justifyContent: "end",
                paddingLeft: "16px",
                display:
                  pathname == "/home/basic"
                    ? "flex"
                    : pathname == "/home/manage"
                    ? "flex"
                    : "none",
              }}
            >
              {/* <div style={{ display: pathname == "/home/basic" ? "flex" : "none" }}>
            {mainCompanies.map((item, index) => {
              return (
                <div
                  className={
                    item.checked
                      ? "mainCompany mainCompany-active"
                      : "mainCompany "
                  }
                  key={index}
                  onClick={itemClick.bind(this, item, index)}
                >
                  {item.name}
                </div>
              );
            })}
            <div className="iconfont" onClick={showModal}>
              &#xe608;
            </div>
            <Modal
              title="请输入公司名字"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input placeholder="主题公司名字" />
            </Modal>
          </div> */}
              <div>
                <Button
                  className="saveBtn"
                  type="primary"
                  style={{ borderRadius: "5px" }}
                  size="middle"
                  onClick={() => {
                    if (pathname === "/home/basic" && basicEdit) {
                      setEdit({
                        basicEdit: false,
                      });
                      PubSub.publish("basicEdit", !basicEdit);
                      //保存企业基本信息
                      httpUtil.saveEnterpriseBasicMsg().then((data) => {
                        console.log(data);
                      });
                    }
                    if (pathname === "/home/manage" && manageEdit) {
                      setEdit({
                        manageEdit: false,
                      });
                      PubSub.publish("manageEdit", !manageEdit);
                      //保存企业经营情况
                      httpUtil.saveEnterpriseManageMsg().then((data) => {
                        console.log(data);
                      });
                    }
                  }}
                >
                  保存
                </Button>
                <Button
                  className="editBtn"
                  style={{ borderRadius: "5px" }}
                  size="middle"
                  onClick={() => {
                    if (pathname === "/home/basic" && !basicEdit) {
                      setEdit({
                        basicEdit: true,
                        manageEdit: false,
                      });
                      PubSub.publish("basicEdit", !basicEdit);
                    }
                    if (pathname === "/home/manage" && !manageEdit) {
                      setEdit({
                        basicEdit: false,
                        manageEdit: true,
                      });
                      PubSub.publish("manageEdit", !manageEdit);
                    }
                  }}
                >
                  修改
                </Button>
              </div>
            </Space>
            <Switch>
              {Routes.map((item) => (
                <Route path={item.path} component={item.component} />
              ))}
              <Redirect to="/home/homePage" />
            </Switch>
          </Content>
        )}
      </Layout>
    </Layout>
  );
}
