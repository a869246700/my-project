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
};

export function animate(obj, target, delay = 30, callback) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    // step 步长  每次移动的距离
    let step = (target - obj.pageYOffset) / 2
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    // 当到达目标点 停止  清除定时器
    if (obj.pageYOffset === target) {
      clearInterval(obj.timer)
      callback && callback()
    } else {
      // 缓慢动画效果核心算法   (目标值-现在的位置)/10
      window.scroll(0, obj.pageYOffset + step)
    }
  }, delay)
}
