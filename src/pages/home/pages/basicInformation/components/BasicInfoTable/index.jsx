import React from "react";
import { useState } from "react";
import { Button, Space } from "antd";

export default function BasicInfoTable() {
  const [foreignInvest, setForeignInvest] = useState(false);

  // 判断是否对外投资展示不一样的表格内容
  function isForeignInvest() {
    setForeignInvest(true);
  }
  function isNotForeignInvest() {
    setForeignInvest(false);
  }

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
          <td colSpan={2}></td>
          <td className="cbi-title-td">纳税人识别号</td>
          <td colSpan={2}></td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">成立时间</td>
          <td colSpan={2}></td>
          <td className="cbi-title-td">注册资本</td>
          <td colSpan={2}></td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">法定代表人</td>
          <td colSpan={2}></td>
          <td className="cbi-title-td">是否对外投资</td>
          <td colSpan={2}>
            <input
              type="radio"
              name="isForeignInvest"
              onClick={isForeignInvest}
            />
            有
            <input
              type="radio"
              name="isForeignInvest"
              defaultChecked
              onClick={isNotForeignInvest}
            />
            无
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
            </Space>
          </td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-big-title" colSpan={6}>
            股东信息
          </td>
        </tr>
        <tr className="cbi-table-row" >
          <td className="cbi-title-td">股东1</td>
          <td colSpan={2}></td>
          <td className="cbi-title-td">持股比例</td>
          <td colSpan={2}></td>
        </tr>

        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东2</td>
          <td colSpan={2}></td>
          <td className="cbi-title-td">持股比例</td>
          <td colSpan={2}></td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">股东3</td>
          <td colSpan={2}></td>
          <td className="cbi-title-td">持股比例</td>
          <td colSpan={2}></td>
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
              <td></td>
              <td className="cbi-title-td">投资比例</td>
              <td></td>
              <td className="cbi-title-td">主营项目</td>
              <td></td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业2</td>
              <td></td>
              <td className="cbi-title-td">投资比例</td>
              <td></td>
              <td className="cbi-title-td">主营项目</td>
              <td></td>
            </tr>
            <tr className="cbi-table-row">
              <td className="cbi-title-td">被投资企业3</td>
              <td></td>
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
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
              <td className="cbi-title-td"></td>
              <td></td>
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
          <td colSpan={5}>
            <Space>
              <input name="qualificationOfTaxpayer" type="radio" />
              一般纳税人
              <input name="qualificationOfTaxpayer" type="radio" />
              小规模纳税人
            </Space>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">发票种类</td>
          <td colSpan={5}>
            <Space>
              <input name="typeOfInvoice" type="radio" />
              专票
              <input name="typeOfInvoice" type="radio" />
              普票
              <input name="typeOfInvoice" type="radio" />
              专票+普票
            </Space>
          </td>
        </tr>
        <tr className="cbi-table-row">
          <td className="cbi-title-td">税率</td>
          <td colSpan={5}></td>
        </tr>
        <tr className="cbi-table-row">
          <td colSpan={6}>
            <Button style={{ borderRadius: "10px" }}>
              其他主体公司信息填写
            </Button>
          </td>
        </tr>
      </table>
    </>
  );
}
