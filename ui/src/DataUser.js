/**
 * Created by Vu Tien Dai on 08/07/2018.
 */
export function getData(data) {
  var storage =JSON.parse(localStorage.getItem('data'))
  var dt =storage[[data]]
  return dt;
}
export function isLogin() {
  var storage =JSON.parse(localStorage.getItem('data'))
  if(storage!=null)
    return true;
  return false;
}

export function ClearData() {
  localStorage.removeItem('data')

}
export function login(result) {
  localStorage.setItem('data',JSON.stringify(result))
}

export function logout() {
  ClearData();
}
export function formEncode(obj) {
  var str = [];
  for (var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}
