import React, { useState } from "react";

import "./index.css";
import "../../../../static/iconfont.css";

export default function IndustrySelect() {
  const [isHidden, setIsHidden] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // 行业logo数组
  const industries = [
    {
      icon: "&#xe62d;",
      name: "物流运输行业",
    },
    {
      icon: "&#xeb38;",
      name: "建筑行业",
    },
    {
      icon: "&#xe600;",
      name: "教育培训行业",
    },
    {
      icon: "&#xe73b;",
      name: "科技行业",
    },
  ];

  // logo点击动画
  const logoOpen = () => {
    setIsHidden(false)
    setIsOpen(true)
  };
  const logoClose = function (e) {
    e.stopPropagation()
    setIsOpen(false)
  };

  // 选择指定行业   
  const chooseIndustry =  () => {}

  return (
    <div className="logo" onClick={logoOpen}>
      <div className="logo-top">
        <i className="iconfont">&#xe62d;</i>
        <span>&nbsp;物流运输行业</span>
      </div>
      <div
        className={isOpen ? "down-logo-open" : "down-logo-close"}
        onClick={logoClose}
        hidden={isHidden}
      >
        <div>
          <i className="iconfont">&#xeb38;</i>
          <span>&nbsp;建筑行业</span>
        </div>
        <div>
          <i className="iconfont">&#xe600;</i>
          <span>&nbsp;教育培训行业</span>
        </div>
        <div>
          <i className="iconfont">&#xe73b;</i>
          <span>&nbsp;科技行业</span>
        </div>
      </div>
      {/* {industries.map((item) => {
        return (
          <div className={isOpen? "logo-open" : "logo-close"} onClick={chooseIndustry}>
            <i
              className="iconfont"
              dangerouslySetInnerHTML={{ __html: item.icon }}
            ></i>
            <span>&nbsp;{item.name}</span>
          </div>
        );
      })} */}
    </div>
  );
}
