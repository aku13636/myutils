/*
 * @Author: 段云龙
 * @Date: 2021-10-27 17:21:00
 * @LastEditors: 段云龙
 * @LastEditTime: 2022-08-02 14:43:17
 * @Description: 缓存工具
 */

import Cookies from 'js-cookie'
const systemName = import.meta.env.VITE_SYSTEM_NAME_EN || ''
interface StorageValue {
  key?: any
  value?: any
  expires?: any
}
/**
 * 本地存储函数
 * @param data 存储的数据
 * @param type 存储的方式
 */
export function setStorage(data: StorageValue = {}, type: 'local' | 'session' | 'cookies' = 'session'): void {
  const value: string = JSON.stringify(data.value)
  const key = `${systemName}-${data.key}`
  switch (type) {
    case 'local':
      localStorage.setItem(key, value)
      break
    case 'session':
      sessionStorage.setItem(key, value)
      break
    default:
      Cookies.set(key, value, { expires: data.expires })
      break
  }
}
/**
 * 获取本地缓存函数
 * @param key 缓存key
 * @param type
 */
export function getStorage(key: string = '', type: 'local' | 'session' | 'cookies' = 'session'): any {
  try {
    key = `${systemName}-${key}`
    if (type === 'local') {
      return JSON.parse(localStorage.getItem(key) ?? 'null')
    } else if (type === 'session') {
      return JSON.parse(sessionStorage.getItem(key) ?? 'null')
    }
    return JSON.parse(Cookies.get(key) || 'null')
  } catch (error) {
    return null
  }
}
/**
 *清除缓存
 * @param key
 * @param type
 */
export function delStorage(key: string = '', type: 'local' | 'session' | 'cookies' = 'session'): any {
  const sysKey = `${systemName}-${key}`
  if (type === 'local') {
    if (key) {
      localStorage.removeItem(sysKey)
    } else {
      localStorage.clear()
    }
  } else if (type === 'session') {
    if (key) {
      sessionStorage.removeItem(sysKey)
    } else {
      sessionStorage.clear()
    }
  } else {
    Cookies.remove(sysKey)
  }
}
