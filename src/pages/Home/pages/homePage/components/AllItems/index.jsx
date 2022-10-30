import React from "react";
import { Card } from "antd";

export default function AllItems() {
  return (
    <div>
      <Card
        title="CQUPT20220810777"
        extra={<span>创建时间：2022年8月10日</span>}
        size="small"
        style={{
          width: "450px",
          // height:"50px",
          // backgroundColor:"#bfa"
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
}
