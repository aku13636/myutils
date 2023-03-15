/*
 * @Author: 段云龙
 * @Date: 2022-08-02 11:29:46
 * @LastEditors: 段云龙
 * @LastEditTime: 2022-08-04 17:24:05
 * @Description:
 */
/**
 * 将kebab-case名称转换为驼峰标识
 * @param params
 */
export function changeHump(params: string): string {
  const reg = /-(\w)/g
  return params.replace(reg, (_, $1: string) => {
    return $1.toUpperCase()
  })
}
/**
 * 将kebab-case与驼峰转PascalCase
 * @param params
 * @returns
 */
export function changePascalCase(params: string): string {
  params = changeHump(params)
  return params.replace(params.charAt(0), ($0) => {
    return $0.toUpperCase()
  })
}

export function changeLine(params: string): string {
  return params.replace(/([A-Z])/g, '-$1').toLowerCase()
}

//防抖函数
type CallbackFn = (item?: any) => void

export function debounce(Callback: CallbackFn, delay = 1000) {
  let timer: any = null
  return function () {
    timer != null ? clearTimeout(timer) : null
    timer = setTimeout(() => {
      Callback && Callback() //当有值才会执行
    }, delay)
  }
}
