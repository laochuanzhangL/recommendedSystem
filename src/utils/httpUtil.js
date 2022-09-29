import { httpReq } from "./httpReq";

export default class httpUtill {
    // 获取登陆状态
    static getRegisterStatus = () => httpReq('get', '/check')
    // 获取验证码（登陆LOG， 注册REG，找回密码FIND）
    static getServerCodeLOG = (email) => httpReq('post', `/check/getCode/${email}/LOG`, '', { "Content-Type": "application/x-www-form-urlencoded" })
    static getServerCodeREG = (email) => httpReq('post', `/check/getCode/${email}/REG`, '', { "Content-Type": "application/x-www-form-urlencoded" })
    static getServerCodeFIND = (email) => httpReq('post', `/check/getCode/${email}/FIND`, '', { "Content-Type": "application/x-www-form-urlencoded" })
}