import React from "react";
import { useState,useEffect } from "react";
import { Button, Space, Modal, message } from "antd";


export default function BasicInfoTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [foreignInvest, setForeignInvest] = useState(false)

  // 订阅表格修改
  useEffect(()=>{
    
  },[])

  // 判断是否对外投资展示不一样的表格内容
  function isForeignInvest() {
    setForeignInvest(true);
  }
  function isNotForeignInvest() {
    setForeignInvest(false);
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
            <input disabled type="text" name="companyName" className="cbi-tb-input"></input>
          </td>
          <td className="cbi-title-td">纳税人识别号</td>
          <td className="cbi-tb-info-td" colSpan={2}></td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">成立时间</td>
          <td className="cbi-tb-info-td" colSpan={2}></td>
          <td className="cbi-title-td">注册资本</td>
          <td className="cbi-tb-info-td" colSpan={2}></td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">法定代表人</td>
          <td className="cbi-tb-info-td" colSpan={2}></td>
          <td className="cbi-title-td">是否对外投资</td>
          <td className="cbi-tb-info-td" colSpan={2}>
            <div className="foreign-invest-wrap">
              <span style={{ position: "relative", left: -29 }}>
                <input
                  type="radio"
                  name="isForeignInvest"
                  onClick={isForeignInvest}
                />
                有
              </span>
              <span style={{ position: "relative", left: 29 }}>
                <input
                  type="radio"
                  name="isForeignInvest"
                  defaultChecked
                  onClick={isNotForeignInvest}
                />
                无
              </span>
            </div>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">主要经营项目</td>
          <td colSpan={5}>
            <Space>
              <input type="checkbox" />
              运输服务
              <input type="checkbox" />
              仓储服务
              <input type="checkbox" />
              挂靠服务
              <input type="checkbox" />
              经纪代理服务
              <input type="checkbox" />
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
          <td className="cbi-sh-info-td" colSpan={2}></td>
          <td className="cbi-title-td">持股比例</td>
          <td className="cbi-sh-info-td" colSpan={2}></td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东2</td>
          <td className="cbi-sh-info-td" colSpan={2}></td>
          <td className="cbi-title-td">持股比例</td>
          <td className="cbi-sh-info-td" colSpan={2}></td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东3</td>
          <td className="cbi-sh-info-td" colSpan={2}></td>
          <td className="cbi-title-td">持股比例</td>
          <td className="cbi-sh-info-td" colSpan={2}></td>
        </tr>

        {foreignInvest ? (
          <>
            <tr className="cbi-table-row">
              <td className="cbi-big-title" colSpan={6}>
                对外投资信息
              </td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业1</td>
              <td className="cbi-fi-info-com-td"></td>
              <td className="cbi-title-td">投资比例</td>
              <td></td>
              <td className="cbi-title-td">主营项目</td>
              <td></td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业2</td>
              <td className="cbi-fi-info-com-td"></td>
              <td className="cbi-title-td">投资比例</td>
              <td></td>
              <td className="cbi-title-td">主营项目</td>
              <td></td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业3</td>
              <td className="cbi-fi-info-com-td"></td>
              <td className="cbi-title-td">投资比例</td>
              <td></td>
              <td className="cbi-title-td">主营项目</td>
              <td></td>
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
              <input name="qualificationOfTaxpayer" type="radio" />
              一般纳税人
            </span>
            <span style={{ position: "relative", left: -29 }}>
              <input name="qualificationOfTaxpayer" type="radio" />
              小规模纳税人
            </span>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">发票种类</td>
          <td className="cbi-tax-info-td" colSpan={5}>
            <span style={{ position: "relative", left: -200 }}>
              <input name="typeOfInvoice" type="radio" />
              专票
            </span>
            <span style={{ position: "relative", left: -77 }}>
              <input name="typeOfInvoice" type="radio" />
              普票
            </span>
            <span style={{ position: "relative", left: 16 }}>
              <input name="typeOfInvoice" type="radio" />
              专票+普票
            </span>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">税率</td>
          <td className="cbi-tax-info-td" colSpan={5}></td>
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
