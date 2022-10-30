import React, { useState, useEffect } from "react";
import "./index.css";
import { Layout, Carousel } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import AllItems from "./components/AllItems";
import FinishItems from "./components/FinishItems";
import CreateItems from "./components/CreateItems";
import WaitItems from "./components/WaitItems";
import ErrorItems from "./components/ErrorItems";

import "../../../../static/我的首页页面所用图标/iconfont.css";

export default function HomePage() {
  const [time, setTime] = useState({});
  const [currentPage, setCurrentSlide] = useState("all-items");
  const [lastPage, setLastSlide] = useState("all-items");
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let translateX =
    currentPage == "all-items"
      ? 0
      : currentPage == "finish-items"
      ? "147%"
      : currentPage == "wait-items"
      ? "293%"
      : currentPage == "create-items"
      ? "439%"
      : 0;
  useEffect(() => {
    let time = formateDate();
    setTime(time);
    let timer = setInterval(() => {
      let time = formateDate();
      setTime(time);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // 实时获取时间年月日
  function formateDate() {
    let date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      min: date.getMinutes(),
      week: weeks[date.getDay()],
    };
  }
  const changePage = (page) => {
    setCurrentSlide(page);
  };
  return (
    <Layout>
      <div className="homePage-top-layout-background">
        <div className="homePage-header-left">
          <div className="homePage-header-left-top">
            <span style={{ fontSize: "2em", fontWeight: "700" }}>个人首页</span>
            <span style={{ marginLeft: "30px", color: "rgb(215,215,215)" }}>
              <SettingOutlined />
              设置个人首页
            </span>
          </div>
          <div className="homePage-header-left-buttom">
            <div className="have-finish">
              <div className="homePage-left-number">10</div>
              <div className="homePage-left-text">已完成</div>
            </div>
            <div className="wait-finish">
              <div className="homePage-left-number">2</div>
              <div className="homePage-left-text">待完成</div>
            </div>
            <div className="now-time">
              <div className="homePage-left-number">
                {time.hour}:{time.min}
              </div>
              <div className="homePage-left-text">
                {time.year}年{time.month}月{time.day}日 {time.week}
              </div>
            </div>
          </div>
        </div>
        <div className="homePage-header-right">
          <div className="homePage-right-image">
            <div className="test-img"></div>
          </div>
          <div className="homePage-right-text">
            <p className="homePage-right-text-title">早上好，张全蛋007！</p>
            <p className="homePage-right-text-department">|市场部</p>
            <div>
              <textarea
                type="text"
                className="homePage-right-text-introduce"
                defaultValue="这个人很懒，什么也没留下..."
                disabled={false}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="homePage-middle-layout-background">
        <p className="homePage-middle-layout-background-title">项目预览</p>
        <div className="homePage-middle-layout-background-content">
          {/* 所有项目 */}
          <div
            className="homePage-middle-layout-background-content-text all-items"
            onClick={() => {
              changePage("all-items");
            }}
          >
            <i className="iconfont homePage-middle-layout-background-content-text-icon all-items-icon">
              &#xe716;
            </i>
            <span>所有项目</span>
          </div>
          {/* 已完成项目 */}
          <div
            className="homePage-middle-layout-background-content-text finish-items"
            onClick={() => {
              changePage("finish-items");
            }}
          >
            <i className="iconfont homePage-middle-layout-background-content-text-icon finish-items-icon">
              &#xe615;
            </i>
            <span>已完成项目</span>
          </div>
          {/* 待完成项目 */}
          <div
            className="homePage-middle-layout-background-content-text wait-items"
            onClick={() => {
              changePage("wait-items");
            }}
          >
            <i className="iconfont homePage-middle-layout-background-content-text-icon wait-items-icon">
              &#xe64b;
            </i>
            <span>待完成项目</span>
          </div>
          {/* 创建新项目 */}
          <div
            className="homePage-middle-layout-background-content-text create-items"
            onClick={() => {
              changePage("create-items");
            }}
          >
            <i className="iconfont homePage-middle-layout-background-content-text-icon create-items-icon">
              &#xe64e;
            </i>
            <span>创建新项目</span>
          </div>
        </div>
        <div className="homePage-middle-layout-background-linebox">
          <div
            className="homePage-middle-layout-background-line"
            style={{ transform: `translateX(${translateX})` }}
          ></div>
        </div>
      </div>
      <div className="homePage-buttom-layout-background">
        {currentPage == "all-items" ? (
          <AllItems/>
        ) : currentPage == "finish-items" ? (
          <FinishItems/>
        ) : currentPage == "wait-items" ? (
          <WaitItems/>
        ) : currentPage == "create-items" ? (
          <CreateItems/>
        ) : (
          <ErrorItems/>
        )}
      </div>
    </Layout>
  );
}
