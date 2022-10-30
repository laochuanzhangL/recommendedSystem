import React from "react";
import {
  Layout,
  Button,
  Space,
  Select,
  Input,
  DatePicker,
  Table,
} from "antd";
import "./index.css"

export default function ProjectManage() {
  return (
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
  );
}
