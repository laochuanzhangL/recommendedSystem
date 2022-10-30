import React from "react";
import SituationTable from "./components/SituationTable";
import httpUtil from "../../../../utils/httpUtil";
import { useEffect, useState } from "react";
import PubSub from "pubsub-js";

import { message } from "antd";
import "./index.css";

export default function Manage() {
  // 获得uid
  const uid = localStorage.getItem("uid");
  const enterpriseKey = sessionStorage.getItem("savedKey");

  const [manageData,setManageData] = useState({
    enterpriseKey,
    annualCost:"",
    annualTurnover:"",
    salesTaxpayer:-1,
    revenueRelateList:[],
    costRelatedList:[],
    manualRelatedDto:{},
  })

  useEffect(()=>{
    const params = {
      uid,
      enterpriseKey,
    };
    // 订阅保存动作
    const manageSavedToken = PubSub.subscribe("manageSaved",(_,manageSavedFlag)=>{
      // 保存后获取企业经营情况
      httpUtil.getEnterpriseManageMsg(params).then((res) => {
        const { code, data:enterpriseOperationalMsgVo } = res;
        if (code === 200) {
          setManageData(enterpriseOperationalMsgVo);
        }
      });
    })

    //加载时获取企业经营情况
    if (enterpriseKey != "") {
      httpUtil.getEnterpriseManageMsg(params).then((res) => {
        const { code, data:enterpriseOperationalMsgVo } = res;
        if (code === 200) {
          setManageData(enterpriseOperationalMsgVo);
        }
      });
    }

    return ()=>{
      PubSub.unsubscribe(manageSavedToken)
    }
  },[])

  return (
    <div>
      <SituationTable manageData={manageData}/>
    </div>
  );
}
