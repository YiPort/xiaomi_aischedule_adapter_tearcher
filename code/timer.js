async function scheduleTimer() {
  // 引入交互工具
  await loadTool('AIScheduleTools');

  // 获取用户输入的总周数
  const totalWeeks = await AISchedulePrompt({
    titleText: '输入总周数',
    tipText: '请输入本学期的总周数（1-30周之间）',
    defaultText: '20',  // 默认值为20周
    validator: value => {
      if (!value || isNaN(value) || value < 1 || value > 30) {
        return '请输入一个有效的周数，范围在1到30周之间。';
      }
      return false;
    },
    confirmText: '确认'
  });

  // 确认是否显示周末
  const showWeekendResponse = await AIScheduleConfirm({
    titleText: '显示周末',
    contentText: '您是否希望在课程表中显示周末？',
    confirmText: '显示',
    cancelText: '不显示'
  });

  // 根据用户选择决定是否显示周末
  const showWeekend = showWeekendResponse;

  // 返回设置
  return {
    totalWeek: parseInt(totalWeeks),
    startSemester: new Date(startSemester).getTime(), // 转换为时间戳
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 2, // 晚间课程节数：[0, 10]之间的整数
    showWeekend: showWeekend,
    sections: [
      { section: 1, startTime: '08:00', endTime: '08:45' },
      { section: 2, startTime: '08:55', endTime: '09:40' },
      { section: 3, startTime: '09:55', endTime: '10:40' },
      { section: 4, startTime: '10:50', endTime: '11:35' },
      { section: 5, startTime: '14:30', endTime: '15:15' },
      { section: 6, startTime: '15:25', endTime: '16:10' },
      { section: 7, startTime: '16:20', endTime: '17:05' },
      { section: 8, startTime: '17:15', endTime: '18:00' },
      { section: 9, startTime: '19:00', endTime: '19:45' },
      { section: 10, startTime: '19:55', endTime: '20:40' }
    ]
  };
}
