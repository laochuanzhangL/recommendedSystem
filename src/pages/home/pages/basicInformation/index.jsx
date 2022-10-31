import React from "react";
import BasicInfoTable from "./components/BasicInfoTable";
import httpUtil from "../../../../utils/httpUtil";
import { useEffect, useState } from "react";
import PubSub from "pubsub-js";
import moment from "moment";

import "./index.css";

export default function Basic() {
  // 获得uid
  const uid = localStorage.getItem("uid");

  const [basicSaved,setBasicSaved] = useState(false)

  const [basicInfoData, setBasicInfoData] = useState({
    enterpriseKey: "",
    enterpriseName: "",
    taxpayernum: "",
    establishTime: "",
    registeredCapital: "",
    legalPerson: "",
    personNum: "",
    totalAssets: "",
    investmentAbroad: 0,
    enterpriseType: 0,
    businessList: [],
    shareholderInfo: [],
    investee: [],
    taxpayerQualification: -1,
    invoiceType: -1,
    taxRate: [],
    uid,
  });

  useEffect(() => {
    // 订阅保存动作,存储企业Key
    const basicSavedToken = PubSub.subscribe("basicSaved", (_, savedKey) => {
      sessionStorage.setItem("savedKey", savedKey);
      const params = {
        uid,
        enterpriseKey: savedKey,
      };
      setBasicSaved(true)
      // 保存后获取企业基本信息
      httpUtil.getEnterpriseBasicMsg(params).then((res) => {
        const { code, data:enterpriseBasicMsgVo } = res;
        if (code === 200) {
          setBasicInfoData(enterpriseBasicMsgVo);
        }
      });
    });
    const enterpriseKey = sessionStorage.getItem("savedKey");
    const params = {
      uid,
      enterpriseKey,
    };
    
    // 加载时获取企业基本信息
    if (enterpriseKey != "" && enterpriseKey != undefined) {
      httpUtil.getEnterpriseBasicMsg(params).then((res) => {
        const { code, data:enterpriseBasicMsgVo } = res;
        if (code === 200) {
          setBasicInfoData(enterpriseBasicMsgVo);
        }
      });
    }

    return () => {
      PubSub.unsubscribe(basicSavedToken);
    };
  }, []);

  return (
    <div>
      <BasicInfoTable basicInfoData={basicInfoData} />
    </div>
  );
}
