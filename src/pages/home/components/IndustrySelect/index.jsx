import React, { useState,useRef } from "react";

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
  const logoOpenOrClose = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      setIsHidden(false);
      setIsOpen(true);
    } else if (isOpen) {
      setIsHidden(true);
      setIsOpen(false);
    }
  };

  // 选择指定行业
  const chooseIndustry = (e) => {
    // 用正则表达式将所选行业提取出来，在数组里面寻找，将找到的选定的行业放置到数组第一个
    console.log(e.target.textContent);
  };

  return (
    <div className="logo-wrap">
      <div>
        <div onClick={logoOpenOrClose}>
          <i
            className="iconfont"
            dangerouslySetInnerHTML={{ __html: industries[0].icon }}
          ></i>
          <span>&nbsp;{industries[0].name}</span>
        </div>
        <div
          className={isOpen ? "down-logo-open" : "down-logo-close"}
          hidden={isHidden}
        >
          {industries.map((item, index) => {
            if (index >= 1) {
              return (
                <div onClick={chooseIndustry}>
                  <i
                    className="iconfont"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  ></i>
                  <span>&nbsp;{item.name}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
