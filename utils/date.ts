/*
 * @Author: 段云龙
 * @Date: 2021-10-26 17:08:31
 * @LastEditors: 段云龙
 * @LastEditTime: 2022-08-02 14:39:45
 * @Description: 日期处理工具
 */
export type Format = 'yyyy-MM' | 'yyyy-MM-dd' | 'yyyy-MM-dd hh:mm:ss' | 'yyyy年MM月dd日' | 'dd'
export type FormatTime = 'hh:mm:ss'
/**
 * 日期格式化
 * @param val
 * @param format
 * @returns
 */
export function dateFormat(val: string | number | Date, format: Format = 'yyyy-MM-dd'): string {
  let result = ''
  val = new Date(val)
  if (val.toString() === 'Invalid Date') return val.toString()
  const map: {
    [propName: string]: number | string
  } = {
    'M+': val.getMonth() + 1, // 月份
    'd+': val.getDate(), // 日
    'h+': val.getHours(), // 小时
    'm+': val.getMinutes(), // 分
    's+': val.getSeconds(), // 秒
    'q+': Math.floor((val.getMonth() + 3) / 3), // 季度
    S: val.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(format)) {
    result = format.replace(RegExp.$1, (val.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in map) {
    if (new RegExp('(' + k + ')').test(result)) {
      const currMap: string = map[k].toString()
      const replaceValue: string = RegExp.$1.length === 1 ? currMap : ('00' + map[k]).substr(currMap.length)
      result = result.replace(RegExp.$1, replaceValue)
    }
  }
  return result
}
export function timeFormat(val: string | number | Date, format: FormatTime = 'hh:mm:ss'): string {
  let result = ''
  val = new Date(val)
  if (val.toString() === 'Invalid Date') return val.toString()
  const map: {
    [propName: string]: number | string
  } = {
    'h+': val.getHours(), // 小时
    'm+': val.getMinutes(), // 分
    's+': val.getSeconds(), // 秒
  }
  if (/(h+)/.test(format)) {
    result = format.replace(RegExp.$1, (val.getHours() + '').substr(2 - RegExp.$1.length))
  }
  for (const k in map) {
    if (new RegExp('(' + k + ')').test(result)) {
      const currMap: string = map[k].toString()
      const replaceValue: string = RegExp.$1.length === 1 ? currMap : ('00' + map[k]).substr(currMap.length)
      result = result.replace(RegExp.$1, replaceValue)
    }
  }
  return result
}
/**
 * 计算时间差
 * @param startTime
 * @param endTime
 * @returns
 */
export function takeUpTime(startTime: string, endTime: string) {
  if (startTime === '') {
    return 0 + '秒'
  }
  if (endTime === '') {
    return (new Date().getTime() - new Date(startTime).getTime()) / 1000 + '秒'
  }
  return (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000 + '秒'
}
/**
 * 获取当周时间区间
 * @returns
 */
export function getCurrentWeek(): Array<string> {
  const startStop = []
  const currentDate = new Date()
  const week = currentDate.getDay()
  const millisecond = 1000 * 60 * 60 * 24
  const minusDay = week !== 0 ? week - 1 : 6
  const monday = new Date(currentDate.getTime() - minusDay * millisecond)
  startStop.push(dateFormat(monday, 'yyyy-MM-dd'))
  for (let index = 2; index <= 6; index++) {
    const minusDay = week - index
    const monday = new Date(currentDate.getTime() - minusDay * millisecond)
    startStop.push(dateFormat(monday, 'yyyy-MM-dd'))
  }
  const sunday = new Date(monday.getTime() + 6 * millisecond)
  startStop.push(dateFormat(sunday, 'yyyy-MM-dd'))
  return startStop
}
