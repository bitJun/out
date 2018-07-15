import swal from 'sweetalert'
export function loginHandle(res) {
  if (res.ok) {
    let result = res.body
    if (result.message == '未登录') {
      localStorage.removeItem('username')
      window.appEvent.emit('login')
      throw res
    } else if (result.success === false) {
      throw res
    } else {
      return res
    }
  } else {
    throw res
  }
}
export function errorRequestHandle(res) {
  if (res && res.body && res.body.message) {
    if (res.body.message == '未登录') {
      return
    }
    swal({
      title: res.body.message,
      text: '',
      type: 'error',
      timer: 3000
    })
  } else if (res && res.ok === false) {
    swal({
      title: '网络异常',
      text: '',
      type: 'error',
      timer: 3000
    })
  }
}
export function mounted() {
  scrollTo(0, 0);
}
