import React from "react";
import BG from "../../utils/BG";
import styles from "./index.module.css";
import { User, Register } from "./components/index";
import { Tabs } from "antd";

  export default function Login() {
  return (
    <div>
      <div className={styles["login-wrap"]}>
        <div className={styles["login-top"]}>财务优化服务评估系统</div>
        <Tabs
          className={styles["login-select-form"]}
          defaultActiveKey="1"
          centered={true}
          tabBarGutter={80}
          items={[
            {
              label: `PasswordLog`,
              key: "1",
              children: <User />,
              className: styles["login-select-form-content"],
            },
            {
              label: `Register`,
              key: "2",
              children: <Register />,
              className: styles["login-select-form-content"],
            },
          ]}
        />
        <div className={styles["login-text"]}>
          Copyright &copy; {new Date().getFullYear()} MISLab 版权所有
        </div>
      </div>
      <BG />
    </div>
  );
}
