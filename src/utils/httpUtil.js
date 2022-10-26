import { httpReq } from "./httpReq";

export default class httpUtill {
   // 注册登录
   login = (params) => httpReq("post", "/core/employee/login", params);
   register = (params) => httpReq("post", "/core/employee/register", params);
   }