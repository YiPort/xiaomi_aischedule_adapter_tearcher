function scheduleHtmlProvider() {
  // 首先，发送同步GET请求获取初始页面，提取必要的隐藏字段（如__VIEWSTATE等）
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/JWJS/PKGL/JSKB_LIST.aspx', false); // 同步GET请求
  xhr.send(null);

  var initialHtml = xhr.responseText;

  // 使用DOMParser解析HTML，提取隐藏字段的值
  var parser = new DOMParser();
  var doc = parser.parseFromString(initialHtml, 'text/html');

  var __VIEWSTATE = doc.querySelector('input[name="__VIEWSTATE"]').value;
  var __VIEWSTATEGENERATOR = doc.querySelector('input[name="__VIEWSTATEGENERATOR"]').value;
  var __EVENTVALIDATION = doc.querySelector('input[name="__EVENTVALIDATION"]').value;

  // 构造POST请求的表单数据
  var formData = new URLSearchParams();
  formData.append('__EVENTTARGET', 'zc');
  formData.append('__EVENTARGUMENT', '');
  formData.append('__LASTFOCUS', '');
  formData.append('__VIEWSTATE', __VIEWSTATE);
  formData.append('__VIEWSTATEGENERATOR', __VIEWSTATEGENERATOR);
  formData.append('__EVENTVALIDATION', __EVENTVALIDATION);
  formData.append('zc', '');
  formData.append('rb', 'rb2');

  // 发送同步POST请求，获取更新后的课表页面
  var xhrPost = new XMLHttpRequest();
  xhrPost.open('POST', '/JWJS/PKGL/JSKB_LIST.aspx', false); // 同步POST请求
  xhrPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhrPost.send(formData.toString());

  // 返回获取到的HTML内容
  return xhrPost.responseText;
}
