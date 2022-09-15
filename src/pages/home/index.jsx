import React from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";

import Basic from "./basicInformation";
import Manage from "./manageSituation";
import Relevant from "./relevantIssues";
import Solve from "./solveAndCost";
import Success from "./successCase";
import Detail from "./detailedIntroduce";
import Sign from "./signContract";

import "./index.css";
import "../../static/iconfont.css";

export default function Home() {
  const history = useHistory();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [isHidden, setisHidden] = useState(true);
  const [isOpen, setisOpen] = useState(false);

  // logo点击动画
  const logoOpen = () => {
    setisHidden(false);
    setisOpen(true);
  };
  const logoClose = function (e) {
    e.stopPropagation();
    setisOpen(false);
  };

  // 点击菜单函数
  const change = (e) => {
    history.replace(`/home/${e.key}`);
  };
  return (
    <Layout className="homeBack">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" onClick={logoOpen}>
          <div className="logo-top">
            <i className="iconfont">&#xe62d;</i>
            <span>&nbsp;物流运输行业</span>
          </div>
          <div
            className={isOpen ? "down-logo-open" : "down-logo-close"}
            onClick={logoClose}
            hidden={isHidden}
          ></div>
        </div>
        <Menu
          theme="dark"
          // style={{ background: "rgb(31,42,61)" }}
          mode="inline"
          defaultSelectedKeys={["basic"]}
          onClick={change}
          items={[
            {
              key: "basic",
              label: "企业基本情况",
            },
            {
              key: "manage",
              label: "企业经营情况",
            },
            {
              key: "relevant",
              label: "企业相关问题",
            },
            {
              key: "solve",
              label: "解决方案及成本",
            },
            {
              key: "success",
              label: "成功案例",
            },
            {
              key: "detail",
              label: "详细介绍",
            },
            {
              key: "sign",
              label: "合同签订",
            },
          ]}
        />
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
          <div className="head-left">
            <span>2022年9月10日 7:05:20</span>
          </div>
          <div className="head-right">
            <div className="head-right-img"></div>
            <div className="head-right-text">
              <div className="head-right-text-tittle">xxxxx</div>
              <div>TEST管理员</div>
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/home/basic" component={Basic} />
            <Route path="/home/manage" component={Manage} />
            <Route path="/home/relevant" component={Relevant} />
            <Route path="/home/solve" component={Solve} />
            <Route path="/home/success" component={Success} />
            <Route path="/home/detail" component={Detail} />
            <Route path="/home/sign" component={Sign} />
            <Redirect to="/home/basic" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
