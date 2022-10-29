import React from "react";
import { Select } from "antd";

export default function NumDropdown(props) {
  const {arr,defaultValue,popupClassName,ratioChange}=props
  const { Option } = Select;
  return (
    <Select
      bordered={false}
      showArrow={false}
      defaultValue={defaultValue}
      style={{ color: "skyblue" }}
      popupClassName={popupClassName}
      onChange={(ratio)=>{
        ratioChange(ratio)
      }}
    >
      {arr.map((item) => {
        return (
          <Option key={item} value={item}>
            {item}
          </Option>
        );
      })}
    </Select>
  );
}
