function scheduleHtmlProvider() {
  // 创建XMLHttpRequest对象
  var http = new XMLHttpRequest();
  // 初始化请求
  http.open('GET', '/JWJS/PKGL/JSKB_LIST.aspx', false); // 使用同步方法
  // 发送请求
  http.send();
  // 返回响应文本，即课程表页面的HTML
  return http.responseText;
}
