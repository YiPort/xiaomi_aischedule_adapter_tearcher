function scheduleHtmlParser(html) {
  const $ = cheerio.load(html);

  let courses = [];

  // 选择包含课程表的表格
  $('#kb table').find('tr').each(function (rowIndex) {
    // 跳过表头行
    if (rowIndex === 0) return;

    let tds = $(this).find('td');

    // 第一列是时间标签，跳过
    tds.each(function (colIndex) {
      if (colIndex === 0) return;

      let td = $(this);
      let day = colIndex; // 星期几（1-7）

      // 查找单元格内的课程链接
      let aTags = td.find('a');

      aTags.each(function () {
        let title = $(this).attr('title');
        if (title) {
          // 解析课程详细信息
          let details = parseTitle(title);

          // 检查必要字段是否存在
          if (!details['课程名称'] || !details['上课班级'] || !details['开课地点'] || !details['授课教师'] || !details['开课时间'] || !details['上课周次']) {
            return;
          }

          // 合并课程名称和上课班级
          let courseName = details['课程名称'] + '(' + details['上课班级'] + ')';

          // 解析上课周次，获取weeks数组
          let weeks = parseWeeks(details['上课周次']);

          // 解析节次
          let sections = parseSections(details['开课时间']);

          // 创建课程对象
          let course = {
            name: courseName,
            position: details['开课地点'],
            teacher: details['授课教师'],
            weeks: weeks,
            day: day,
            sections: sections,
          };

          courses.push(course);
        }
      });
    });
  });

  return courses;
}

// 解析课程详细信息
function parseTitle(title) {
  let lines = title.trim().split('\n');
  let details = {};
  lines.forEach((line) => {
    line = line.trim();
    if (line) {
      let parts = line.split('：');
      if (parts.length === 2) {
        details[parts[0].trim()] = parts[1].trim();
      }
    }
  });
  return details;
}

// 解析周次
function parseWeeks(weeksStr) {
  let weeks = [];
  weeksStr = weeksStr.replace(/周/g, ''); // 去除'周'字
  let parts = weeksStr.split(',');

  parts.forEach((part) => {
    if (part.includes('-')) {
      let [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        weeks.push(i);
      }
    } else {
      let week = parseInt(part);
      if (!isNaN(week)) {
        weeks.push(week);
      }
    }
  });
  return weeks;
}

// 解析节次
function parseSections(timeStr) {
  // timeStr格式示例：'20102'，第1位表示星期几，后面4位表示节次
  let startSection = parseInt(timeStr.substring(1, 3)); // 第二和第三个字符表示开始节次
  let endSection = parseInt(timeStr.substring(3, 5)); // 第四和第五个字符表示结束节次

  let sections = [];
  for (let i = startSection; i <= endSection; i++) {
    sections.push(i);
  }

  return sections;
}
