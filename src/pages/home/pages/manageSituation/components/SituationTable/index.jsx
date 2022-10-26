import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal, Space, Slider, Select, Table, message } from "antd";
import PubSub from "pubsub-js";
import httpUtil from "../../../../../../utils/httpUtil";

import NumDropdown from "../NumDropdown";
import TextDropdown from "../TextDropdown";

export default function SituationTable(props) {
  const manageData = props.manageData
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manageEdit, setManageEdit] = useState(false);

  // 企业经营信息
  const [annualCost,setannualCost]=useState(manageData.annualCost)
  const [annualTurnover,setannualTurnover]=useState(manageData.annualTurnover)
  const [salesTaxpayer,setsalesTaxpayer]=useState(manageData.salesTaxpayer)
  const [revenueRelateList,setrevenueRelateList]=useState(manageData.revenueRelateList)
  const [costRelatedList,setcostRelatedList]=useState(manageData.costRelatedList)
  const [manualRelatedDto,setmanualRelatedDto]=useState(manageData.manualRelatedDto)

  const params={
    enterpriseKey:manageData.enterpriseKey,
    annualCost:parseInt(annualCost),
    annualTurnover:parseInt(annualTurnover),
    salesTaxpayer,
    revenueRelateList,
    costRelatedList,
    manualRelatedDto
  }

  // 订阅表格修改
  useEffect(() => {
    const manageEditToken = PubSub.subscribe("manageEdit", (_, basicEdit) => {
      if (basicEdit) {
        setManageEdit(basicEdit);
        message.success("表格修改已开启!");
      } else setManageEdit(basicEdit);
    });
    const manageSaveToken = PubSub.subscribe("manageSave",(_,manageSave)=>{
      httpUtil.saveEnterpriseManageMsg(params)
      .then((res)=>{
          const {code} = res
          if(code===200){
            message.success("保存成功!")
            PubSub.publish("manageSaved",true)
          }
      })
    })
    return () => {
      PubSub.unsubscribe(manageEditToken);
      PubSub.unsubscribe(manageSaveToken);
    };
  }, []);

  const { Option } = Select;

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
          <td className="ms-ic-info-td" colSpan={2}>
            <input
              disabled={!manageEdit}
              type="text"
              name="annual-turnover"
              className="ms-input"
            />
          </td>
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
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-service-proportion"
              className="ms-input"
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-service-capital"
              className="ms-input"
            />
          </td>
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
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="storage-porterage-service-proportion"
              className="ms-input"
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="storage-porterage-service-capital"
              className="ms-input"
            />
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
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="vehicle-sale-service-proportion"
              className="ms-input"
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="vehicle-sale-service-capital"
              className="ms-input"
            />
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
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-proxy-service-proportion"
              className="ms-input"
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-proxy-service-capital"
              className="ms-input"
            />
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
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="affiliated-service-proportion"
              className="ms-input"
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="affiliated-service-capital"
              className="ms-input"
            />
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
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="income-total-proportion"
              className="ms-input"
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="income-total-capital"
              className="ms-input"
            />
          </td>
          <td className="ms-title-td">年经营成本(万元)</td>
          <td>
            <input
              disabled={!manageEdit}
              type="text"
              name="annual-turnover-cost"
              className="ms-input"
            />
          </td>
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
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="vehicle-cost-propotion"
              className="ms-input"
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="vehicle-cost-capital"
              className="ms-input"
            />
          </td>
          <td className="ms-title-td" rowSpan={5}>
            供应商资质
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isTransportationServices" />
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
                <input type="radio" name="isTransportationServices" />
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
                <input type="radio" name="isTransportationServices" />
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
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="staff-cost-propotion"
              className="ms-input"
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="staff-cost-capital"
              className="ms-input"
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input type="radio" name="isTransportationServices" />
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
                <input type="radio" name="isTransportationServices" />
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
                <input type="radio" name="isTransportationServices" />
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
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="office-cost-propotion"
              className="ms-input"
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="office-cost-capital"
              className="ms-input"
            />
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
                <input type="radio" name="isTransportationServices" />
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
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-cost-oil-propotion"
              className="ms-input"
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-cost-oil-capital"
              className="ms-input"
            />
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
            </div>
          </td>
        </tr>
        {/* 运输成本（路桥费） */}
        <tr className="ms-table-row">
          <td className="ms-title-td">运输成本（路桥费）</td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-cost-bridge-propotion"
              className="ms-input"
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-cost-bridge-capital"
              className="ms-input"
            />
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
            </div>
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">支出总计</td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="expenditure-propotion"
              className="ms-input"
            />
          </td>
          <td className="ms-ex-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="expenditure-capital"
              className="ms-input"
            />
          </td>
          <td className="ms-title-td">企业利润(万元)</td>
          <td>
            <input
              disabled={!manageEdit}
              type="text"
              name="company-profit"
              className="ms-input"
            />
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-big-title" colSpan={5}>
            人工相关
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">高管人数</td>
          <td className="ms-ar-info-td" colSpan={2}>
            <input
              disabled={!manageEdit}
              type="text"
              name="executive-number"
              className="ms-input"
            />
          </td>
          <td className="ms-title-td">司机人数</td>
          <td className="ms-ar-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="driver-number"
              className="ms-input"
            />
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">平均工资</td>
          <td className="ms-ar-info-td" colSpan={2}>
            <input
              disabled={!manageEdit}
              type="text"
              name="executive-average-salary"
              className="ms-input"
            />
          </td>
          <td className="ms-title-td">平均工资</td>
          <td className="ms-ar-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="driver-average-salary"
              className="ms-input"
            />
          </td>
        </tr>
        <tr className="ms-table-row">
          <td colSpan={5}>
            <Space>
              <Button type="primary">提交数据</Button>
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