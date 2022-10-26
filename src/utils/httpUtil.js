import {httpReq} from "./httpReq";

class httpUtil {
   // 登录注册模块
   // 登录
   login = (params) => httpReq("post",`/core/employee/login`,params)
   // 注册
   register = (params) => httpReq("post",`/core/employee/register`,params)

   // 信息模块
   // 获取用户基本信息
   getEmployeeMsg = (params) => httpReq("get",`/core/employee/getEmployeeMsg?uid=${params}`)

   // 企业基本信息表格
   // 获取企业基本信息
   getEnterpriseBasicMsg = (params) => httpReq("get",`/core/enterprise/getEnterpriseMsgOfFirst?enterpriseKey=${params.enterpriseKey}&uid=${params.uid}`)
   // 保存
   saveEnterpriseBasicMsg = (params) => httpReq("post",`/core/enterprise/saveEnterpriseMsg`,params)

   // 企业经营信息表格
   //获取企业经营信息
   getEnterpriseManageMsg = (params) => httpReq("get",`/core/enterprise/getEnterpriseMsgOfSecond?enterpriseKey=${params.enterpriseKey}&uid=${params.uid}`)
   // 保存
   saveEnterpriseManageMsg = (params) => httpReq("post",`/core/enterprise/saveEnterpriseOperationalMsg`,params)
}

export default new httpUtil()