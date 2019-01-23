import request from "../utils/request";

export async function getIpInfo(params: requstParams): Promise<any> {
  return {
    ip: "27.193.13.255",
    country: "中国",
    province: "山东省",
    city: "青岛市",
    isp: "联通"
  };
}
