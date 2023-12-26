import http from '../utils/http';

let resquest = "http://192.168.10.xx:8080";   //请求地址 需改成自己的主机地址

//获取列表数据
export function getList(params){
    return http.get(`${resquest}/list`,params)
}
// 用户登录
export function userLogin(params){
    return http.post(`${resquest}/login`,params)
}
// 获取表格数据
export function testTable(params){
    return http.post(`${resquest}/testTable`,params)
}

// 获取指令相关数据
export function instructData(params){
    return http.get(`${resquest}/instructData`,params)
}