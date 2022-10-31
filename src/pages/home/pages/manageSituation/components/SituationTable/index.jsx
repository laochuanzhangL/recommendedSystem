import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Button, Modal, Space, Select, Table, message } from "antd";
import PubSub from "pubsub-js";
import httpUtil from "../../../../../../utils/httpUtil";

import NumDropdown from "../NumDropdown";
import TextDropdown from "../TextDropdown";

export default function SituationTable(props) {
  const manageData = props.manageData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manageEdit, setManageEdit] = useState(false);

  // 企业经营信息
  const [annualCost, setannualCost] = useState(manageData.annualCost);
  const [annualTurnover, setannualTurnover] = useState(
    manageData.annualTurnover
  );
  const [salesTaxpayer, setsalesTaxpayer] = useState(manageData.salesTaxpayer);
  const [revenueRelateList, setrevenueRelateList] = useState(
    manageData.revenueRelateList
  );
  const [costRelatedList, setcostRelatedList] = useState(
    manageData.costRelatedList
  );
  const [manualRelatedDto, setmanualRelatedDto] = useState(
    manageData.manualRelatedDto
  );

  // 年经营成本, 收入合计，支出合计的ref
  const aCostRef = useRef()
  const totalRevRef = useRef()
  const totalCostRef = useRef()

  // 各服务，成本的ref
  const tsRef=useRef()

  const params = {
    enterpriseKey: manageData.enterpriseKey,
    annualCost:parseInt(annualCost),
    annualTurnover:parseInt(annualTurnover),
    salesTaxpayer,
    revenueRelateList,
    costRelatedList,
    manualRelatedDto,
  };
  // 各甲方资质选择改变函数
  // 运输服务
  const transportGeneralTaxpayerRatioChange = (ratio) => {
    revenueRelateList[0].generalTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const transportSmallScaleTaxpayerRatioChange = (ratio) => {
    revenueRelateList[0].smallscaleTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const transportNaturalPersonRatioChange = (ratio) => {
    revenueRelateList[0].naturalPersonRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  // 仓储、搬运服务
  const storeGeneralTaxpayerRatioChange = (ratio) => {
    revenueRelateList[1].generalTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const storeSmallScaleTaxpayerRatioChange = (ratio) => {
    revenueRelateList[1].smallscaleTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const storeNaturalPersonRatioChange = (ratio) => {
    revenueRelateList[1].naturalPersonRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  // 车辆销售
  const saleGeneralTaxpayerRatioChange = (ratio) => {
    revenueRelateList[2].generalTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const saleSmallScaleTaxpayerRatioChange = (ratio) => {
    revenueRelateList[2].smallscaleTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const saleNaturalPersonRatioChange = (ratio) => {
    revenueRelateList[2].naturalPersonRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  // 运输代理服务
  const proxyGeneralTaxpayerRatioChange = (ratio) => {
    revenueRelateList[3].generalTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const proxySmallScaleTaxpayerRatioChange = (ratio) => {
    revenueRelateList[3].smallscaleTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const proxyNaturalPersonRatioChange = (ratio) => {
    revenueRelateList[3].naturalPersonRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  // 挂靠服务
  const anchorGeneralTaxpayerRatioChange = (ratio) => {
    revenueRelateList[4].generalTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const anchorSmallScaleTaxpayerRatioChange = (ratio) => {
    revenueRelateList[4].smallscaleTaxpayerRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }
  const anchorNaturalPersonRatioChange = (ratio) => {
    revenueRelateList[4].naturalPersonRatio = parseInt(ratio)
    setrevenueRelateList(revenueRelateList)
  }

  // 各供应商资质选择改变函数
  // 车辆成本
  const vehicleGeneralTaxpayerRatioChange = (ratio) => {
    costRelatedList[0].supplierProportions[0].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  const vehicleSmallScaleTaxpayerRatioChange = (ratio) => {
    costRelatedList[0].supplierProportions[1].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  const vehicleNaturalPersonRatioChange = (ratio) => {
    costRelatedList[0].supplierProportions[2].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  // 人工成本
  const staffGeneralTaxpayerRatioChange = (ratio) => {
    costRelatedList[1].supplierProportions[0].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  const staffSmallScaleTaxpayerRatioChange = (ratio) => {
    costRelatedList[1].supplierProportions[1].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  const staffNaturalPersonRatioChange = (ratio) => {
    costRelatedList[1].supplierProportions[2].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  // 办公成本
  const officeGeneralTaxpayerRatioChange = (ratio) => {
    costRelatedList[2].supplierProportions[0].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  const officeSmallScaleTaxpayerRatioChange = (ratio) => {
    costRelatedList[2].supplierProportions[1].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  const officeNaturalPersonRatioChange = (ratio) => {
    costRelatedList[2].supplierProportions[2].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  // 运输成本(油费)
  const oilGeneralTaxpayerRatioChange = (ratio) => {
    costRelatedList[3].supplierProportions[0].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  // 运输成本(路桥费)
  const bridgeGeneralTaxpayerRatioChange = (ratio) => {
    costRelatedList[4].supplierProportions[0].proportion = parseInt(ratio)
    setcostRelatedList(costRelatedList)
  }
  
  useEffect(() => {
    // 订阅表格修改
    const manageEditToken = PubSub.subscribe("manageEdit", (_, basicEdit) => {
      if (basicEdit) {
        setManageEdit(basicEdit);
        message.success("表格修改已开启!");
      } else setManageEdit(basicEdit);
    });
    // 保存表格
    const manageSaveToken = PubSub.subscribe("manageSave", (_, manageSave) => {
      httpUtil.saveEnterpriseManageMsg(params).then((res) => {
        const { code } = res;
        if (code === 200) {
          message.success("保存成功!");
          PubSub.publish("manageSaved", true);
        }
      });
    });
    return () => {
      PubSub.unsubscribe(manageEditToken)
      PubSub.unsubscribe(manageSaveToken)
    };
  }, [
    annualCost,
    annualTurnover,
    salesTaxpayer
  ]);

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
              defaultValue={annualTurnover}
              onBlur={(e) => {
                const annualTurnover = e.target.value;
                setannualTurnover(annualTurnover);
              }}
            />
          </td>
          <td className="ms-title-td">是否兼营销售纳税人</td>
          <td className="ms-ic-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input
                  disabled={!manageEdit}
                  type="radio"
                  name="isSalesTaxpayer"
                  defaultValue={salesTaxpayer}
                  onClick={() => {
                    setsalesTaxpayer(1);
                  }}
                />
                是
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="radio"
                  name="isSalesTaxpayer"
                  defaultValue={salesTaxpayer}
                  onClick={() => {
                    setsalesTaxpayer(0);
                  }}
                />
                否
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
              defaultValue={revenueRelateList[0].businessRatio}
              ref={tsRef}
              onBlur={(e)=>{
                const businessRatio = e.target.value
                revenueRelateList[0].businessRatio = parseInt(businessRatio)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-service-capital"
              className="ms-input"
              defaultValue={revenueRelateList[0].amount}
              onBlur={(e)=>{
                const amount = e.target.value
                revenueRelateList[0].amount = parseInt(amount)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-title-td" rowSpan={5}>
            甲方资质
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[0].generalTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={transportGeneralTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[0].smallscaleTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={transportSmallScaleTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                自然人(
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[0].naturalPersonRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={transportNaturalPersonRatioChange}
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
              defaultValue={revenueRelateList[1].businessRatio}
              onBlur={(e)=>{
                const businessRatio = e.target.value
                revenueRelateList[1].businessRatio = parseInt(businessRatio)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="storage-porterage-service-capital"
              className="ms-input"
              defaultValue={revenueRelateList[1].amount}
              onBlur={(e)=>{
                const amount = e.target.value
                revenueRelateList[1].amount = parseInt(amount)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[1].generalTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={storeGeneralTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[1].smallscaleTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={storeSmallScaleTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                自然人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[1].naturalPersonRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={storeNaturalPersonRatioChange}
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
              defaultValue={revenueRelateList[2].businessRatio}
              onBlur={(e)=>{
                const businessRatio = e.target.value
                revenueRelateList[2].businessRatio = parseInt(businessRatio)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="vehicle-sale-service-capital"
              className="ms-input"
              defaultValue={revenueRelateList[2].amount}
              onBlur={(e)=>{
                const amount = e.target.value
                revenueRelateList[2].amount = parseInt(amount)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[2].generalTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={saleGeneralTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[2].smallscaleTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={saleSmallScaleTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                自然人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[2].naturalPersonRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={saleNaturalPersonRatioChange}
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
              defaultValue={revenueRelateList[3].businessRatio}
              onBlur={(e)=>{
                const businessRatio = e.target.value
                revenueRelateList[3].businessRatio = parseInt(businessRatio)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="transport-proxy-service-capital"
              className="ms-input"
              defaultValue={revenueRelateList[3].amount}
              onBlur={(e)=>{
                const amount = e.target.value
                revenueRelateList[3].amount = parseInt(amount)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[3].generalTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={proxyGeneralTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[3].smallscaleTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={proxySmallScaleTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                自然人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[3].naturalPersonRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={proxyNaturalPersonRatioChange}
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
              defaultValue={revenueRelateList[4].businessRatio}
              onBlur={(e)=>{
                const businessRatio = e.target.value
                revenueRelateList[4].businessRatio = parseInt(businessRatio)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-ic-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="affiliated-service-capital"
              className="ms-input"
              defaultValue={revenueRelateList[4].amount}
              onBlur={(e)=>{
                const amount = e.target.value
                revenueRelateList[4].amount = parseInt(amount)
                setrevenueRelateList(revenueRelateList)
              }}
            />
          </td>
          <td className="ms-qua-info-td">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[4].generalTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={anchorGeneralTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                小规模纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[4].smallscaleTaxpayerRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={anchorSmallScaleTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                自然人 (
                <NumDropdown
                  arr={number}
                  defaultValue={revenueRelateList[4].naturalPersonRatio}
                  popupClassName={"selectDropdown-short"}
                  ratioChange={anchorNaturalPersonRatioChange}
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
              defaultValue={annualTurnover}
              ref={totalRevRef}
            />
          </td>
          <td className="ms-title-td">年经营成本(万元)</td>
          <td>
            <input
              disabled={!manageEdit}
              type="text"
              name="annual-turnover-cost"
              className="ms-input"
              defaultValue={annualCost}
              onBlur={(e) => {
                const annualCost = e.target.value;
                setannualCost(annualCost);
              }}
              ref={aCostRef}
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
              defaultValue={costRelatedList[0].costRatio}
              onBlur={(e)=>{
                const costRatio = e.target.value 
                costRelatedList[0].costRatio=parseInt(costRatio)
                setcostRelatedList(costRelatedList)           
              }}
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
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <TextDropdown
                  arr={carCostGeneral}
                  defaultValue={"新车"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[0].supplierProportions[0].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={vehicleGeneralTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                小规模纳税人 (
                <TextDropdown
                  arr={carCostSmall}
                  defaultValue={"新车专票"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[0].supplierProportions[1].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={vehicleSmallScaleTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                自然人 (
                <TextDropdown
                  arr={carCostNatural}
                  defaultValue={"有票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[0].supplierProportions[2].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={vehicleNaturalPersonRatioChange}
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
              defaultValue={costRelatedList[1].costRatio}
              onBlur={(e)=>{
                const costRatio = e.target.value 
                costRelatedList[1].costRatio=parseInt(costRatio)
                setcostRelatedList(costRelatedList)           
              }}
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
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <TextDropdown
                  arr={LaborCostGeneral}
                  defaultValue={"运输行业"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[1].supplierProportions[0].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={staffGeneralTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                小规模纳税人 (
                <TextDropdown
                  arr={LaborCostSmall}
                  defaultValue={"专票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[1].supplierProportions[1].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={staffSmallScaleTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                自然人 (
                <TextDropdown
                  arr={LaborCostNatural}
                  defaultValue={"外包有票"}
                  popupClassName={"selectDropdown-long"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[1].supplierProportions[2].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={staffNaturalPersonRatioChange}
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
              defaultValue={costRelatedList[2].costRatio}
              onBlur={(e)=>{
                const costRatio = e.target.value 
                costRelatedList[2].costRatio=parseInt(costRatio)
                setcostRelatedList(costRelatedList)           
              }}
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
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <TextDropdown
                  arr={OfficeCostSmall}
                  defaultValue={"专票"}
                  popupClassName={"selectDropdown-short"}
                />
                )(
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[2].supplierProportions[0].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={officeGeneralTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                小规模纳税人 (
                <TextDropdown
                  arr={OfficeCostSmall}
                  defaultValue={"专票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[2].supplierProportions[1].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={officeSmallScaleTaxpayerRatioChange}
                />
                )
              </div>
              <div>
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                自然人 (
                <TextDropdown
                  arr={OfficeCostNatural}
                  defaultValue={"有票"}
                  popupClassName={"selectDropdown-short"}
                />
                ) (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[2].supplierProportions[2].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={officeNaturalPersonRatioChange}
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
              defaultValue={costRelatedList[3].costRatio}
              onBlur={(e)=>{
                const costRatio = e.target.value 
                costRelatedList[3].costRatio=parseInt(costRatio)
                setcostRelatedList(costRelatedList)           
              }}
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
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[3].supplierProportions[0].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={oilGeneralTaxpayerRatioChange}
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
              defaultValue={costRelatedList[4].costRatio}
              onBlur={(e)=>{
                const costRatio = e.target.value 
                costRelatedList[4].costRatio=parseInt(costRatio)
                setcostRelatedList(costRelatedList)           
              }}
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
                <input
                  disabled={!manageEdit}
                  type="checkbox"
                  name="isTransportationServices"
                />
                一般纳税人 (
                <NumDropdown
                  arr={number}
                  defaultValue={
                    costRelatedList[4].supplierProportions[0].proportion
                  }
                  popupClassName={"selectDropdown-short"}
                  ratioChange={bridgeGeneralTaxpayerRatioChange}
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
              ref={totalCostRef}
            />
          </td>
          <td className="ms-title-td">企业利润(万元)</td>
          <td>
            <input
              disabled={!manageEdit}
              type="text"
              name="company-profit"
              className="ms-input"
              // value={totalRevRef.current.value-totalCostRef.current.value===0?"":totalRevRef.current.value-totalCostRef.current.value}
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
              defaultValue={manualRelatedDto.managerNumber}
              onBlur={(e)=>{
                const managerNumber = e.target.value
                manualRelatedDto.managerNumber = parseInt(managerNumber)
                setmanualRelatedDto(manualRelatedDto)
              }}
            />
          </td>
          <td className="ms-title-td">司机人数</td>
          <td className="ms-ar-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="driver-number"
              className="ms-input"
              defaultValue={manualRelatedDto.driverNumber}
              onBlur={(e)=>{
                const driverNumber = e.target.value
                manualRelatedDto.driverNumber = parseInt(driverNumber)
                setmanualRelatedDto(manualRelatedDto)
              }}
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
              defaultValue={manualRelatedDto.managerAvgSalary}
              onBlur={(e)=>{
                const managerAvgSalary = e.target.value
                manualRelatedDto.managerAvgSalary = parseInt(managerAvgSalary)
                setmanualRelatedDto(manualRelatedDto)
              }}
            />
          </td>
          <td className="ms-title-td">平均工资</td>
          <td className="ms-ar-info-td">
            <input
              disabled={!manageEdit}
              type="text"
              name="driver-average-salary"
              className="ms-input"
              defaultValue={manualRelatedDto.driverAvgSalary}
              onBlur={(e)=>{
                const driverAvgSalary = e.target.value
                manualRelatedDto.driverAvgSalary = parseInt(driverAvgSalary)
                setmanualRelatedDto(manualRelatedDto)
              }}
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
