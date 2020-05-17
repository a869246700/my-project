export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      // apply 调用函数
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(date, fmt) {
  //  获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  //  获取具体时间
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 动画版返回顶部
export function smoothScroll(timer) {
  cancelAnimationFrame(timer)
  timer = requestAnimationFrame(function fn() {
    // 防止移动端拿不到 top 值
    const oTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    if (oTop > 0) {
      scrollTo(0, oTop - 500)
      timer = requestAnimationFrame(fn)
    } else {
      cancelAnimationFrame(timer)
    }
  })
}
