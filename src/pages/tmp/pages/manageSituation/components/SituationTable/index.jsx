import React from "react";
import { useState } from "react";
import { Button, Modal, Space, Slider, Select, Table,message } from "antd";

import NumDropdown from "../NumDropdown";
import TextDropdown from "../TextDropdown";

export default function SituationTable() {
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const number = [];
  for (let i = 0; i <= 100; i++) {
    number.push(i);
  }
  // 车辆选项
  const carCostGeneral = ["新车", "二手车"];
  const carCostSmall = ["新车专票", "新车普票", "二手车专票", "二手车普票"];
  const carCostNatural = ["有票", "无票"];
  // 人工选项
  const LaborCostGeneral = ["运输行业", "人力资源和灵活用工"];
  const LaborCostSmall = ["专票", "普票"];
  const LaborCostNatural = ["外包有票", "外包无票"];
  // 办公选项
  const OfficeCostSmall = ["专票", "普票"];
  const OfficeCostNatural = ["有票", "无票"];

  // 评估结果
  const sharedOnCell = (_, index) => {
    if (index === 4) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };
  const columns = [
    {
      title: "增值税应纳税额",
      dataIndex: "valueAddedTax",
      onCell: sharedOnCell,
    },
    {
      title: "附加税",
      dataIndex: "additionalTax",
      onCell: sharedOnCell,
    },
    {
      title: "企业所得税应纳税额",
      dataIndex: "incomeTax",
      onCell: sharedOnCell,
    },
    {
      title: "股东个税",
      dataIndex: "personalIncomeTax",
      onCell: sharedOnCell,
    },
    {
      title: "预留字段",
      dataIndex: "5",
      onCell: sharedOnCell,
    },
    {
      title: "预留字段 ",
      dataIndex: "6",
      onCell: sharedOnCell,
    },
    {
      title: "预留字段 ",
      dataIndex: "7",
      onCell: sharedOnCell,
    },
  ];
  const data = [
    {
      key: "1",
      valueAddedTax: 51.83,
      additionalTax: 6.22,
      incomeTax: 104.36,
      personalIncomeTax: 62.61,
      5: "null",
      6: "null",
      7: "null",
    },
  ];

  // 提交数据函数
  const commit=() => {
    message.success("提交成功！",2.5)
  }
  return (
    <div>
      <table>
        <tr className="ms-table-row">
          <td className="ms" colSpan={5}>
            企业经营情况
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-big-title" colSpan={5}>
            收入相关
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">年营业额(万元)</td>
          <td className="ms-ic-info-td" colSpan={2}>1000</td>
          <td className="ms-title-td">是否兼营销售纳税人</td>
          <td className="ms-ic-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isSalesTaxpayer" />是
              </div>
              <div>
                <input type="radio" name="isSalesTaxpayer" />否
              </div>
            </div>
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">收入类别</td>
          <td className="ms-title-td">占比(%)</td>
          <td className="ms-title-td">金额(万元)</td>
          <td className="ms-title-td">销售发票占比</td>
          <td className="ms-title-td">甲方资质选择(%)</td>
        </tr>
        {/* 运输服务 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">运输服务</td>
          <td className="ms-ic-info-td">50%</td>
          <td className="ms-ic-info-td">500</td>
          <td className="ms-title-td" rowSpan={5}>
            甲方资质
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isTransportationServices" />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isTransportationServices" />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isTransportationServices" />
                自然人(
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 仓储、搬运服务 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">仓储、搬运服务</td>
          <td className="ms-ic-info-td">20%</td>
          <td className="ms-ic-info-td">200</td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isWarehousingServices" />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isWarehousingServices" />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isWarehousingServices" />
                自然人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 车辆销售 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">车辆销售</td>
          <td className="ms-ic-info-td">10%</td>
          <td className="ms-ic-info-td">100</td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isVehicleSales" />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isVehicleSales" />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isVehicleSales" />
                自然人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 运输代理服务 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">运输代理服务</td>
          <td className="ms-ic-info-td">20%</td>
          <td className="ms-ic-info-td">200</td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isTransportationAgencyService" />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isTransportationAgencyService" />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isTransportationAgencyService" />
                自然人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 挂靠服务 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">挂靠服务</td>
          <td className="ms-ic-info-td">0%</td>
          <td className="ms-ic-info-td">0</td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isAffiliatedService" />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isAffiliatedService" />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isAffiliatedService" />
                自然人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">收入总计</td>
          <td className="ms-ic-info-td">100%</td>
          <td className="ms-ic-info-td">1000</td>
          <td className="ms-title-td">年经营成本(万元)</td>
          <td>500</td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-big-title" colSpan={5}>
            支出相关
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">成本费用类别</td>
          <td className="ms-title-td">占比(%)</td>
          <td className="ms-title-td">金额(万元)</td>
          <td className="ms-title-td">进项发票占比</td>
          <td className="ms-title-td">供应商资质选择</td>
        </tr>
        {/* 车辆成本 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">车辆成本</td>
          <td className="ms-ex-info-td">40</td>
          <td className="ms-ex-info-td">200</td>
          <td className="ms-title-td" rowSpan={5}>
            供应商资质
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isVehicleCost" />
                一般纳税人 (
                <TextDropdown
                  arr={carCostGeneral}
                  defaultValue={"新车"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isVehicleCost" />
                小规模纳税人 (
                <TextDropdown
                  arr={carCostSmall}
                  defaultValue={"新车专票"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isVehicleCost" />
                自然人 (
                <TextDropdown
                  arr={carCostNatural}
                  defaultValue={"有票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 人工成本 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">人工成本</td>
          <td className="ms-ex-info-td">20</td>
          <td className="ms-ex-info-td">100</td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isLaborCost" />
                一般纳税人 (
                <TextDropdown
                  arr={LaborCostGeneral}
                  defaultValue={"运输行业"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isLaborCost" />
                小规模纳税人 (
                <TextDropdown
                  arr={LaborCostSmall}
                  defaultValue={"专票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isLaborCost" />
                自然人 (
                <TextDropdown
                  arr={LaborCostNatural}
                  defaultValue={"外包有票"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 办公成本 */}
        <tr className="ms-table-row">
          <td className="ms-title-td">办公成本</td>
          <td className="ms-ex-info-td">5</td>
          <td className="ms-ex-info-td">25</td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isOfficeCost" />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isOfficeCost" />
                小规模纳税人 (
                <TextDropdown
                  arr={OfficeCostSmall}
                  defaultValue={"专票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
              <div>
                <input type="radio" name="isOfficeCost" />
                自然人 (
                <TextDropdown
                  arr={OfficeCostNatural}
                  defaultValue={"有票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 运输成本（油费） */}
        <tr className="ms-table-row">
          <td className="ms-title-td">运输成本（油费）</td>
          <td className="ms-ex-info-td">25</td>
          <td className="ms-ex-info-td">125</td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isFuelCost" />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        {/* 运输成本（路桥费） */}
        <tr className="ms-table-row">
          <td className="ms-title-td">运输成本（路桥费）</td>
          <td className="ms-ex-info-td">10</td>
          <td className="ms-ex-info-td">50</td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isRoadCost" />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={0}
                  popupClassName={"selectDropdown-short"}
                />
                )
              </div>
            </div>
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">支出总计</td>
          <td className="ms-ex-info-td">100</td>
          <td className="ms-ex-info-td">500</td>
          <td className="ms-title-td">企业利润(万元)</td>
          <td>500</td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-big-title" colSpan={5}>
            人工相关
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">高管人数</td>
          <td className="ms-ar-info-td" colSpan={2}>10</td>
          <td className="ms-title-td">司机人数</td>
          <td className="ms-ar-info-td">30</td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">平均工资</td>
          <td className="ms-ar-info-td" colSpan={2}>20000</td>
          <td className="ms-title-td">平均工资</td>
          <td className="ms-ar-info-td">10000</td>
        </tr>
        <tr className="ms-table-row">
          <td colSpan={5}>
            <Space>
              <Button type="primary" onClick={commit} >提交数据</Button>
              <Button onClick={showModal}>查看结果</Button>
              <Modal
                centered={true}
                className="evaluation-results"
                width={1000}
                closable={false}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                title={null}
                okText={"确认"}
                cancelText={"取消"}
              >
                <Table
                  columns={columns}
                  dataSource={data}
                  bordered={false}
                  pagination={false}
                  title={() => {
                    return "评估结果  单位：万元";
                  }}
                />
              </Modal>
            </Space>
          </td>
        </tr>
      </table>
    </div>
  );
}
