/*
 * @Author: 段云龙
 * @Date: 2022-02-07 16:37:46
 * @LastEditors: 段云龙
 * @LastEditTime: 2022-07-15 17:06:45
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'
/**
 * 导出或下载文件
 * @param url
 * @param fileName
 */
export function exportFile(url: string, fileName = uuidv4()) {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
}

export function exportBlobFile(value: any) {
  let fileName = value.headers['content-disposition']
  if (fileName) {
    fileName = decodeURI(fileName).substring(fileName.indexOf('=') + 1)
    const blob = new Blob([value.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName ?? uuidv4()
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}
