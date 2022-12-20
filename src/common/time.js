// 获取当天的零时刻
export function h0(timeStamp= Date.now()) {
  const target = new Date(timeStamp)

  target.setHours(0)
  target.setMinutes(0)
  target.setSeconds(0)
  target.setMilliseconds(0)

  return target.getTime()
}

// 获取当月的第一天
export function h1(now = new Date()) {
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  now.setDate(1)
  return now
}