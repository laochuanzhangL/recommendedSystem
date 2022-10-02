import React from "react";
import { Button, Modal, Space } from "antd";

export default function SituationTable() {
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
          <td colSpan={2}></td>
          <td className="ms-title-td">是否兼营销售纳税人</td>
          <td>
            <input type="radio" />是<input type="radio" />否
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">收入类别</td>
          <td className="ms-title-td">占比(%)</td>
          <td className="ms-title-td">金额(万元)</td>
          <td className="ms-title-td">销售发票占比</td>
          <td className="ms-title-td">甲方资质选择(%)</td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">运输服务</td>
          <td></td>
          <td></td>
          <td className="ms-title-td" rowSpan={5}>甲方资质</td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">仓储、搬运服务</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">车辆销售</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">运输代理服务</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">挂靠服务</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">收入总计</td>
          <td></td>
          <td></td>
          <td className="ms-title-td">年经营成本(万元)</td>
          <td></td>
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
        <tr className="ms-table-row">
          <td className="ms-title-td">车辆成本</td>
          <td></td>
          <td></td>
          <td className="ms-title-td"  rowSpan={5}>供应商资质</td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">人工成本</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">办公成本</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">税费成本</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">其他成本</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">支出总计</td>
          <td></td>
          <td></td>
          <td className="ms-title-td">企业利润(万元)</td>
          <td></td>
        </tr>

        <tr className="ms-table-row">
          <td className="ms-big-title" colSpan={5}>
            人工相关
          </td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">高管人数</td>
          <td></td>
          <td className="ms-title-td">司机人数</td>
          <td></td>
        </tr>
        <tr className="ms-table-row">
          <td className="ms-title-td">平均工资</td>
          <td></td>
          <td className="ms-title-td">平均工资</td>
          <td></td>
        </tr>

        <tr className="ms-table-row">
          <td colSpan={5}>
            <Space>
              <Button type="primary">提交数据</Button>
              <Button>查看结果</Button>
            </Space>
          </td>
        </tr>
      </table>
    </div>
  );
}
