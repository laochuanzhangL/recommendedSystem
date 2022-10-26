import React, { useState, useEffect } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Layout, Menu, Button, Space, Modal, Input, message } from "antd";

import Routes from "./routes";
import IndustrySelect from "./components/IndustrySelect";

import "./index.css";
import "../../static/iconfont.css";

export default function Home() {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [showTime, setShowTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainCompanies, setMainCompanies] = useState([
    { name: "主体公司1xxx", checked: true },
    { name: "主体公司2xxx", checked: false },
    { name: "主体公司3xxx", checked: false },
  ]);
  const [edit, setEdit] = useState({
    basicEdit: false,
    manageEdit: false,
  });

  // 各表格的修改状态
  const { basicEdit } = edit;
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

  // Home组件挂载时显示时间
  useEffect(() => {
    setInterval(() => {
      const currenTime = formateDate(new Date().getTime());
      setShowTime(currenTime);
    }, 1000);
  }, []);

  // url
  const urlParams = new URL(window.location.href);
  const pathname = urlParams.pathname;

  // 点击添加主体公司函数
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    message.success("添加成功");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addMainCompany = () => {
    setMainCompanies("添加");
  };

  // 点击active
  const itemClick = function (item, index) {
    mainCompanies.forEach((item) => {
      item.checked = false;
    });
    mainCompanies[index].checked = true;
  };
    // 保存成功函数
    const Preservation=() => {
      message.success("保存成功！",2.5)
    }

  return (
    <Layout className="homeBack">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <IndustrySelect />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" title="企业基本信息">
            <Link to="/home/basic">
              企业基本信息
            </Link>
          </Menu.Item>
          <Menu.Item key="2" title="企业经营情况">
            <Link to="/home/manage">企业经营情况</Link>
          </Menu.Item>
          <Menu.Item key="3" title="企业相关问题">
            <Link to="/home/relevant">企业相关问题</Link>
          </Menu.Item>
          <Menu.Item key="4" title="解决方案及成本">
            <Link to="/home/solve">解决方案及成本</Link>
          </Menu.Item>
          <Menu.Item key="5" title="成功案例">
            <Link to="/home/success">成功案例</Link>
          </Menu.Item>
          <Menu.Item key="6" title="详细介绍">
            <Link to="/home/detail">详细介绍</Link>
          </Menu.Item>
          <Menu.Item key="7" title="合同签订">
            <Link to="/home/sign">合同签订</Link>
          </Menu.Item>
        </Menu>
        <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div className="head-left">{showTime}</div>
          <div className="head-middle">财税服务评估系统</div>
          <div className="head-right">
            <div className="head-right-img"></div>
            <div className="head-right-text">
              {/* 这里的具体信息要用参数实时获取 */}
              <div className="head-right-text-tittle">20230834</div>
              <div>张峰管理员</div>
            </div>
          </div>
        </Header>
        <Space
          style={{
            width: "99%",
            marginTop: "5px",
            justifyContent: "space-between",
            paddingLeft: "16px",
          }}
        >
          <div style={{ display: pathname == "/home/basic" ? "flex" : "none" }}>
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
          </div>
          <div>
            <Button
              className="saveBtn"
              type="primary"
              style={{ borderRadius: "5px" }}
              size="middle"
              onClick={Preservation}
            >
              保存
            </Button>
            <Button
              className="editBtn"
              style={{ borderRadius: "5px" }}
              size="middle"
              onClick={() => {
                if (pathname === "/home/basic") {
                  setEdit({
                    basicEdit: true
                  })
                }
              }}
            >
              修改
            </Button>
          </div>
        </Space>
        <Content
          className="site-layout-background"
          style={{
            margin: "5px 16px 0px 16px",
            padding: 0,
          }}
        >
          <Switch>
            {Routes.map((item) => (
              <Route path={item.path} component={item.component} />
            ))}
            <Redirect to="/home/basic" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
