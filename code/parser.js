function scheduleHtmlParser(html) {
  var $ = cheerio.load(html); // 使用cheerio加载HTML
  var courses = []; // 存储解析后的课程数据

  // 遍历每个课程表单元格
  $('#kb table tr').slice(1).each(function() {
    $(this).find('td').slice(1).each(function(index) {
      var day = index + 1; // 星期几，从1开始
      var sessionDetails = $(this).find('a');

      sessionDetails.each(function() {
        var title = $(this).attr('title');
        if (title) {
          var details = parseTitle(title); // 解析课程详情
          var courseName = details['课程名称'] + '(' + details['上课班级'] + ')'; // 拼接课程名称和班级

          courses.push({
            name: courseName,
            position: details['开课地点'],
            teacher: details['授课教师'],
            weeks: parseWeeks(details['上课周次']),
            day: day,
            sections: parseSections(details['开课时间'])
          });
        }
      });
    });
  });

  return { courseInfos: courses };
}

// 解析title字符串中的课程信息
function parseTitle(title) {
  var details = {};
  var lines = title.split('\n');
  lines.forEach(function(line) {
    var parts = line.split('：');
    if (parts.length === 2) {
      details[parts[0].trim()] = parts[1].trim();
    }
  });
  return details;
}

// 解析上课周次，格式为"1-20"
function parseWeeks(range) {
  var [start, end] = range.split('-').map(Number);
  var weeks = [];
  for (var i = start; i <= end; i++) {
    weeks.push(i);
  }
  return weeks;
}

// 解析上课节次，格式为"20103"
function parseSections(timeStr) {
  var startSection = parseInt(timeStr.substring(1, 3)); // 开始节次
  var endSection = parseInt(timeStr.substring(3, 5)); // 结束节次
  var sections = [];
  for (var i = startSection; i <= endSection; i++) {
    sections.push(i);
  }
  return sections;
}
