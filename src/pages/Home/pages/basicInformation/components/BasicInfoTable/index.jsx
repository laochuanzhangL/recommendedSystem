import React from "react"
import { useState, useEffect } from "react";
import { Button, Space, Modal, message, DatePicker, Input } from "antd";
import PubSub from "pubsub-js";
import moment from "moment";
import httpUtil from "../../../../../../utils/httpUtil";

export default function BasicInfoTable(props) {
  const basicInfoData = props.basicInfoData
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [basicEdit, setBasicEdit] = useState(false);

  const dateFormat = "YYYY-MM-DD";

  // 企业基本信息
  const [enterpriseName, setenterpriseName] = useState(basicInfoData.enterpriseName);
  const [taxpayernum, settaxpayernum] = useState(basicInfoData.taxpayernum);
  const [establishTime, setestablishTime] = useState(basicInfoData.establishTime);
  const [registeredCapital, setregisteredCapital] = useState(basicInfoData.registeredCapital);
  const [legalPerson, setlegalPerson] = useState(basicInfoData.legalPerson);
  const [personNum, setpersonNum] = useState(basicInfoData.personNum);
  const [totalAssets, settotalAssets] = useState(basicInfoData.totalAssets);
  const [investmentAbroad, setinvestmentAbroad] = useState(basicInfoData.investmentAbroad);
  const [enterpriseType, setenterpriseType] = useState(basicInfoData.enterpriseType);
  const [businessList, setbusinessList] = useState(basicInfoData.businessList);
  const [shareholderInfo, setshareholderInfo] = useState(basicInfoData.shareholderInfo);
  const [investee, setinvestee] = useState(basicInfoData.investee);
  const [taxpayerQualification, settaxpayerQualification] = useState(basicInfoData.taxpayerQualification);
  const [invoiceType, setinvoiceType] = useState(basicInfoData.invoiceType);
  const [taxRate, settaxRate] = useState(basicInfoData.taxRate);

  // 获取登录的用户信息
  const uid = localStorage.getItem("uid");
  const enterpriseKey = sessionStorage.getItem("savedKey");


  const params = {
    enterpriseKey: enterpriseKey!==""?enterpriseKey:"",
    enterpriseName,
    taxpayernum,
    establishTime,
    registeredCapital,
    legalPerson,
    personNum:parseInt(personNum),
    totalAssets:parseInt(totalAssets),
    investmentAbroad,
    enterpriseType,
    businessList,
    shareholderInfo,
    investee,
    taxpayerQualification,
    invoiceType,
    taxRate,
    uid,
  };

  useEffect(() => {
    // 订阅表格修改
    const basicEditToken = PubSub.subscribe("basicEdit", (_, basicEdit) => {
      if (basicEdit) {
        setBasicEdit(basicEdit);
        message.success("表格修改已开启!");
      } else setBasicEdit(basicEdit);
    });
    // 保存表格
    const basicSaveToken = PubSub.subscribe("basicSave", (_, basicSave) => {
      httpUtil.saveEnterpriseBasicMsg(params).then((res) => {
        const {code,data:{enterprise_key}} = res
        if(code==200){
          message.success("保存成功!")
          console.log(enterprise_key);
          PubSub.publish("basicSaved",enterprise_key)
        }
      });
    });
    return () => {
      PubSub.unsubscribe(basicEditToken);
      PubSub.unsubscribe(basicSaveToken);
    };
  }, []);

  // 判断是否对外投资展示不一样的表格内容
  function isForeignInvest() {
    setinvestmentAbroad(1);
  }
  function isNotForeignInvest() {
    setinvestmentAbroad(0);
  }

  // 点击删除主体公司出现对话框
  const showDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <table>
        <tr className="cbi-table-row">
          <td className="cbi" colSpan={6}>
            企业基本信息
          </td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-big-title" colSpan={6}>
            工商信息
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">企业名称</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="company-name"
              className="cbi-input"
              defaultValue={enterpriseName}
              onBlur={(e) => {
                const enterpriseName = e.target.value;
                setenterpriseName(enterpriseName);
              }}
            />
          </td>
          <td className="cbi-title-td">纳税人识别号</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="taxpayer-id"
              className="cbi-input"
              defaultValue={taxpayernum}
              onBlur={(e) => {
                const taxpayernum = e.target.value;
                settaxpayernum(taxpayernum);
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">成立时间</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <DatePicker
              allowClear={false}
              bordered={false}
              disabled={!basicEdit}
              type="text"
              name="founded-time"
              className="cbi-input"
              placeholder=""
              defaultValue={establishTime}
              onBlur={(e) => {
                const establishTime = e.target.value;
                setestablishTime(moment(establishTime, dateFormat));
              }}
            />
          </td>
          <td className="cbi-title-td">注册资本</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="registered-capital"
              className="cbi-input"
              defaultValue={registeredCapital}
              onBlur={(e) => {
                const registeredCapital = e.target.value;
                setregisteredCapital(registeredCapital);
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">总资产</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="total-capital"
              className="cbi-input"
              defaultValue={totalAssets}
              onBlur={(e) => {
                const totalAssets = e.target.value;
                settotalAssets(totalAssets);
              }}
            />
          </td>
          <td className="cbi-title-td">人员数量</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="staff-number"
              className="cbi-input"
              defaultValue={personNum}
              onBlur={(e) => {
                const personNum = e.target.value;
                setpersonNum(personNum);
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">法定代表人</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="legal-representative"
              className="cbi-input"
              defaultValue={legalPerson}
              onBlur={(e) => {
                const legalPerson = e.target.value;
                setlegalPerson(legalPerson);
              }}
            />
          </td>
          <td className="cbi-title-td">是否对外投资</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <div className="foreign-invest-wrap">
              <span style={{ position: "relative", left: -29 }}>
                <input
                  disabled={!basicEdit}
                  type="radio"
                  name="isForeignInvest"
                  onClick={isForeignInvest}
                  checked={investmentAbroad == 1 ? true : false}
                />
                有
              </span>
              <span style={{ position: "relative", left: 29 }}>
                <input
                  disabled={!basicEdit}
                  type="radio"
                  name="isForeignInvest"
                  checked={investmentAbroad == 0 ? true : false}
                  onClick={isNotForeignInvest}
                />
                无
              </span>
            </div>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">企业类型</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <span style={{ position: "relative", left: -200 }}>
              <input
                disabled={!basicEdit}
                name="type-of-company"
                type="radio"
                defaultChecked={enterpriseType == 1 ? true : false}
                onClick={() => {
                  setenterpriseType(1);
                }}
              />
              一般企业
            </span>
            <span style={{ position: "relative", left: -77 }}>
              <input
                disabled={!basicEdit}
                name="type-of-company"
                type="radio"
                defaultChecked={enterpriseType == 2 ? true : false}
                onClick={() => {
                  setenterpriseType(2);
                }}
              />
              高新技术企业
            </span>
            <span style={{ position: "relative", left: 16 }}>
              <input
                disabled={!basicEdit}
                name="type-of-company"
                type="radio"
                defaultChecked={enterpriseType == 3 ? true : false}
                onClick={() => {
                  setenterpriseType(3);
                }}
              />
              西部大开发企业
            </span>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">主要经营项目</td>
          <td colSpan={5}>
            <Space>
              <input
                disabled={!basicEdit}
                type="checkbox"
                defaultChecked={
                  businessList.includes("运输服务") ? true : false
                }
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("运输服务");
                    setbusinessList(businessList);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "运输服务") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList(businessList);
                  }
                  console.log(businessList);
                }}
              />
              运输服务
              <input
                disabled={!basicEdit}
                type="checkbox"
                defaultChecked={
                  businessList.includes("仓储服务") ? true : false
                }
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("仓储服务");
                    setbusinessList(businessList);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "仓储服务") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList(businessList);
                  }
                  console.log(businessList);
                }}
              />
              仓储服务
              <input
                disabled={!basicEdit}
                type="checkbox"
                defaultChecked={
                  businessList.includes("挂靠服务") ? true : false
                }
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("挂靠服务");
                    setbusinessList(businessList);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "挂靠服务") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList(businessList);
                  }
                  console.log(businessList);
                }}
              />
              挂靠服务
              <input
                disabled={!basicEdit}
                type="checkbox"
                defaultChecked={
                  businessList.includes("经纪代理服务") ? true : false
                }
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("经纪代理服务");
                    setbusinessList(businessList);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "经纪代理服务") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList(businessList);
                  }
                  console.log(businessList);
                }}
              />
              经纪代理服务
              <input
                disabled={!basicEdit}
                type="checkbox"
                defaultChecked={
                  businessList.includes("车辆销售") ? true : false
                }
                onClick={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    businessList.push("车辆销售");
                    setbusinessList(businessList);
                  } else if (!checked) {
                    businessList.map((item, index, arr) => {
                      if (item == "车辆销售") {
                        arr.splice(index, 1);
                      }
                    });
                    setbusinessList(businessList);
                  }
                  console.log(businessList);
                }}
              />
              车辆销售
            </Space>
          </td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-big-title" colSpan={6}>
            股东信息
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东1</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="shareholoder-1"
              className="cbi-input"
              defaultValue={shareholderInfo[0] ? shareholderInfo[0].name : ""}
              onBlur={(e) => {
                const name = e.target.value;
                if (shareholderInfo.length==0) {
                  shareholderInfo.splice(0,0,{
                    name,
                    proportion:""
                  })
                  setshareholderInfo(shareholderInfo)
                }else{
                  shareholderInfo[0].name=name
                  setshareholderInfo(shareholderInfo)
                }
                console.log(shareholderInfo);
              }}
            />
          </td>
          <td className="cbi-title-td">持股比例(%)</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="share-ratio-1"
              className="cbi-input"
              defaultValue={
                shareholderInfo[0] ? shareholderInfo[0].proportion : ""
              }
              onBlur={(e) => {
                const proportion = e.target.value;
                if (shareholderInfo.length==0) {
                  shareholderInfo.splice(0,0,{
                    name:"",
                    proportion
                  })
                  setshareholderInfo(shareholderInfo)
                }else{
                  shareholderInfo[0].proportion=proportion
                  setshareholderInfo(shareholderInfo)
                }
                console.log(shareholderInfo);
              }}
            />
          </td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东2</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="shareholoder-2"
              className="cbi-input"
              defaultValue={shareholderInfo[1] ? shareholderInfo[1].name : ""}
              onBlur={(e) => {
                const name = e.target.value;
                if (shareholderInfo.length==1) {
                  shareholderInfo.splice(1,0,{
                    name,
                    proportion:""
                  })
                  setshareholderInfo(shareholderInfo)
                }else{
                  shareholderInfo[1].name=name
                  setshareholderInfo(shareholderInfo)
                }
                console.log(shareholderInfo);
              }}
            />
          </td>
          <td className="cbi-title-td">持股比例(%)</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="share-ratio-2"
              className="cbi-input"
              defaultValue={
                shareholderInfo[1] ? shareholderInfo[1].proportion : ""
              }
              onBlur={(e) => {
                const proportion = e.target.value;
                if (shareholderInfo.length==1) {
                  shareholderInfo.splice(1,0,{
                    name:"",
                    proportion
                  })
                  setshareholderInfo(shareholderInfo)
                }else{
                  shareholderInfo[1].proportion=proportion
                  setshareholderInfo(shareholderInfo)
                }
                console.log(shareholderInfo);
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东3</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="shareholoder-3"
              className="cbi-input"
              defaultValue={shareholderInfo[2] ? shareholderInfo[2].name : ""}
              onBlur={(e) => {
                const name = e.target.value;
                if (shareholderInfo.length==2) {
                  shareholderInfo.splice(2,0,{
                    name,
                    proportion:""
                  })
                  setshareholderInfo(shareholderInfo)
                }else{
                  shareholderInfo[2].name=name
                  setshareholderInfo(shareholderInfo)
                }
                console.log(shareholderInfo);
              }}
            />
          </td>
          <td className="cbi-title-td">持股比例(%)</td>
          <td className="cbi-sh-info-td" colSpan={2}>
            <input
              disabled={!basicEdit}
              type="text"
              name="share-ratio-3"
              className="cbi-input"
              defaultValue={
                shareholderInfo[2] ? shareholderInfo[2].proportion : ""
              }
              onBlur={(e) => {
                const proportion = e.target.value;
                if (shareholderInfo.length==2) {
                  shareholderInfo.splice(2,0,{
                    name:"",
                    proportion
                  })
                  setshareholderInfo(shareholderInfo)
                }else{
                  shareholderInfo[2].proportion=proportion
                  setshareholderInfo(shareholderInfo)
                }
                console.log(shareholderInfo);
              }}
            />
          </td>
        </tr>

        {investmentAbroad == 1 ? (
          <>
            <tr className="cbi-table-row">
              <td className="cbi-big-title" colSpan={6}>
                对外投资信息
              </td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业1</td>
              <td className="cbi-fi-info-com-td">
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invested-company-1"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[0]
                        ? investee[0].name
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const name = e.target.value;
                    if (investee.length==0) {
                      investee.splice(0,0,{
                        name,
                        proportion:"",
                        mainProject:""
                      })
                      setinvestee(investee)
                    }else{
                      investee[0].name=name
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">投资比例</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invest-rate-1"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[0]
                        ? investee[0].proportion
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const proportion = e.target.value;
                    if (investee.length==0) {
                      investee.splice(0,0,{
                        name:"",
                        proportion,
                        mainProject:""
                      })
                      setinvestee(investee)
                    }else{
                      investee[0].proportion=proportion
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">主营项目</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="main-project-1"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[0]
                        ? investee[0].mainProject
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const mainProject = e.target.value;
                    if (investee.length==0) {
                      investee.splice(0,0,{
                        name:"",
                        proportion:"",
                        mainProject
                      })
                      setinvestee(investee)
                    }else{
                      investee[0].mainProject=mainProject
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业2</td>
              <td className="cbi-fi-info-com-td">
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invested-company-2"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[1]
                        ? investee[1].name
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const name = e.target.value;
                    if (investee.length==1) {
                      investee.splice(1,0,{
                        name,
                        proportion:"",
                        mainProject:""
                      })
                      setinvestee(investee)
                    }else{
                      investee[1].name=name
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">投资比例</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invest-rate-2"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[1]
                        ? investee[1].proportion
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const proportion = e.target.value;
                    if (investee.length==1) {
                      investee.splice(1,0,{
                        name:"",
                        proportion,
                        mainProject:""
                      })
                      setinvestee(investee)
                    }else{
                      investee[1].proportion=proportion
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">主营项目</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="main-project-2"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[1]
                        ? investee[1].mainProject
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const mainProject = e.target.value;
                    if (investee.length==1) {
                      investee.splice(1,0,{
                        name:"",
                        proportion:"",
                        mainProject
                      })
                      setinvestee(investee)
                    }else{
                      investee[1].mainProject=mainProject
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业3</td>
              <td className="cbi-fi-info-com-td">
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invested-company-3"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[2]
                        ? investee[2].name
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const name = e.target.value;
                    if (investee.length==2) {
                      investee.splice(2,0,{
                        name,
                        proportion:"",
                        mainProject:""
                      })
                      setinvestee(investee)
                    }else{
                      investee[2].name=name
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">投资比例</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="invest-rate-3"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[2]
                        ? investee[2].proportion
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const proportion = e.target.value;
                    if (investee.length==2) {
                      investee.splice(2,0,{
                        name:"",
                        proportion,
                        mainProject:""
                      })
                      setinvestee(investee)
                    }else{
                      investee[2].proportion=proportion
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
              <td className="cbi-title-td">主营项目</td>
              <td>
                <input
                  disabled={!basicEdit}
                  type="text"
                  name="main-project-3"
                  className="cbi-input"
                  defaultValue={
                    investmentAbroad == 1
                      ? investee[2]
                        ? investee[2].mainProject
                        : ""
                      : ""
                  }
                  onBlur={(e) => {
                    const mainProject = e.target.value;
                    if (investee.length==2) {
                      investee.splice(2,0,{
                        name:"",
                        proportion:"",
                        mainProject
                      })
                      setinvestee(investee)
                    }else{
                      investee[2].mainProject=mainProject
                      setinvestee(investee)
                    }
                    console.log(investee);
                  }}
                />
              </td>
            </tr>
          </>
        ) : (
          <>
            <tr className="no-cbi-table-row">
              <td className="cbi-big-title" colSpan={6}></td>
            </tr>
            <tr>
              <td className="cbi-title-td"></td>

              <td className="cbi-title-td"></td>

              <td className="cbi-title-td"></td>
            </tr>
            <tr className="no-cbi-table-row">
              <td className="cbi-title-td"></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
            </tr>
            <tr className="no-cbi-table-row">
              <td></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
            </tr>
          </>
        )}

        <tr className="cbi-table-row">
          <td className="cbi-big-title" colSpan={6}>
            税务情况
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">纳税人资格</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <span style={{ position: "relative", left: -160 }}>
              <input
                disabled={!basicEdit}
                name="qualificationOfTaxpayer"
                type="radio"
                defaultChecked={taxpayerQualification == 0 ? true : false}
                onClick={() => {
                  settaxpayerQualification(0);
                }}
              />
              一般纳税人
            </span>
            <span style={{ position: "relative", left: -29 }}>
              <input
                disabled={!basicEdit}
                name="qualificationOfTaxpayer"
                type="radio"
                defaultChecked={taxpayerQualification == 1 ? true : false}
                onClick={() => {
                  settaxpayerQualification(1);
                }}
              />
              小规模纳税人
            </span>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">发票种类</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <span style={{ position: "relative", left: -200 }}>
              <input
                disabled={!basicEdit}
                name="typeOfInvoice"
                type="radio"
                defaultChecked={invoiceType == 0 ? true : false}
                onClick={() => {
                  setinvoiceType(0);
                }}
              />
              专票
            </span>
            <span style={{ position: "relative", left: -77 }}>
              <input
                disabled={!basicEdit}
                name="typeOfInvoice"
                type="radio"
                defaultChecked={invoiceType == 1 ? true : false}
                onClick={() => {
                  setinvoiceType(1);
                }}
              />
              普票
            </span>
            <span style={{ position: "relative", left: 16 }}>
              <input
                disabled={!basicEdit}
                name="typeOfInvoice"
                type="radio"
                defaultChecked={invoiceType == 2 ? true : false}
                onClick={() => {
                  setinvoiceType(2);
                }}
              />
              专票+普票
            </span>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">税率</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <input
              disabled={!basicEdit}
              type="text"
              name="tax-rate"
              className="cbi-input"
              defaultValue={taxRate}
              onBlur={(e)=>{
                const taxrate = e.target.value
                if(taxRate.length==0){
                  taxRate.push(taxrate)
                  settaxRate(taxRate)
                }
              }}
            />
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td colSpan={6}>
            <Space
              style={{
                margin: "10px 0 10px 0",
              }}
            >
              <Button
                type="primary"
                style={{ borderRadius: "10px", height: "30px" }}
              >
                添加主体公司
              </Button>
              <Button
                onClick={showDeleteModal}
                type="primary"
                danger
                style={{ borderRadius: "10px", height: "30px" }}
              >
                删除主体公司
              </Button>
              <Modal
                centered={true}
                closable={false}
                open={isModalOpen}
                // onOk={handleOk}
                onCancel={handleCancel}
                title="操作"
                okText={"确认"}
                cancelText={"取消"}
                footer={
                  <div>
                    <Button type="primary" onClick={handleCancel}>
                      取消
                    </Button>
                    <Button type="primary" danger onClick={handleOk}>
                      确认
                    </Button>
                  </div>
                }
              >
                <span>是否确认需要删除本主体公司？</span>
              </Modal>
            </Space>
          </td>
        </tr>
      </table>
    </>
  );
}
