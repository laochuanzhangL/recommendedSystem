import React from "react";
import SituationTable from "./components/SituationTable";
import httpUtil from "../../../../utils/httpUtil";
import { useEffect, useState } from "react";
import PubSub from "pubsub-js";

import "./index.css";

export default function Manage() {
  // 获得uid
  const uid = localStorage.getItem("uid");
  const enterpriseKey = sessionStorage.getItem("savedKey");

  const [manageSaved, setManageSaved] = useState(false);

  const [manageData, setManageData] = useState({
    enterpriseKey,
    annualCost: "",
    annualTurnover: "",
    salesTaxpayer: -1,
    revenueRelateList: [
      {
        busibusinessName: "运输服务",
        businessRatio: "",
        amount: "",
        generalTaxpayerRatio: 0,
        smallscaleTaxpayerRatio: 0,
        naturalPersonRatio: 0,
      },
      {
        busibusinessName: "仓储、搬运服务",
        businessRatio: "",
        amount: "",
        generalTaxpayerRatio: 0,
        smallscaleTaxpayerRatio: 0,
        naturalPersonRatio: 0,
      },
      {
        busibusinessName: "车辆销售",
        businessRatio: "",
        amount: "",
        generalTaxpayerRatio: 0,
        smallscaleTaxpayerRatio: 0,
        naturalPersonRatio: 0,
      },
      {
        busibusinessName: "运输代理服务",
        businessRatio: "",
        amount: "",
        generalTaxpayerRatio: 0,
        smallscaleTaxpayerRatio: 0,
        naturalPersonRatio: 0,
      },
      {
        busibusinessName: "挂靠服务",
        businessRatio: "",
        amount: "",
        generalTaxpayerRatio: 0,
        smallscaleTaxpayerRatio: 0,
        naturalPersonRatio: 0,
      },
    ],
    costRelatedList: [
      {
        name: "车辆成本",
        costRatio: "",
        industryId: 1,
        supplierProportions: [
          {
            proportion: 0,
            supId: 1,
          },
          {
            proportion: 0,
            supId: 2,
          },
          {
            proportion: 0,
            supId: 3,
          },
        ],
      },
      {
        name: "人工成本",
        costRatio: "",
        industryId: 1,
        supplierProportions: [
          {
            proportion: 0,
            supId: 1,
          },
          {
            proportion: 0,
            supId: 2,
          },
          {
            proportion: 0,
            supId: 3,
          },
        ],
      },
      {
        name: "办公成本",
        costRatio: "",
        industryId: 1,
        supplierProportions: [
          {
            proportion: 0,
            supId: 1,
          },
          {
            proportion: 0,
            supId: 2,
          },
          {
            proportion: 0,
            supId: 3,
          },
        ],
      },
      {
        name: "运输成本(油费)",
        costRatio: "",
        industryId: 1,
        supplierProportions: [
          {
            proportion: 0,
            supId: 1,
          },
        ],
      },
      {
        name: "运输成本(路桥费)",
        costRatio: "",
        industryId: 1,
        supplierProportions: [
          {
            proportion: 0,
            supId: 1,
          },
        ],
      },
    ],
    manualRelatedDto: {
      driverAvgSalary: "",
      driverNumber: "",
      managerAvgSalary: "",
      managerNumber: "",
    },
  });

  useEffect(() => {
    const params = {
      uid,
      enterpriseKey,
    };
    // 订阅保存动作
    const manageSavedToken = PubSub.subscribe(
      "manageSaved",
      (_, manageSavedFlag) => {
        setManageSaved(manageSavedFlag);
        // 保存后获取企业经营情况
        httpUtil.getEnterpriseManageMsg(params).then((res) => {
          const { code, data: enterpriseOperationalMsgVo } = res;
          if (code === 200) {
            setManageData(enterpriseOperationalMsgVo);
          }
        });
      }
    );
    //加载时获取企业经营情况
    if (enterpriseKey != "" && enterpriseKey != undefined) {
      httpUtil.getEnterpriseManageMsg(params).then((res) => {
        const { code, data: enterpriseOperationalMsgVo } = res;
        if (code === 200) {
          setManageData(enterpriseOperationalMsgVo);
        }
      });
    }

    return () => {
      PubSub.unsubscribe(manageSavedToken);
    };
  }, []);

  return (
    <div>
      <SituationTable manageData={manageData} />
    </div>
  );
}
