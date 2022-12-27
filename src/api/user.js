import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'admin/login',
    method: 'post',
    data
  })
}

export function getMenu() {
  return request({
    url: 'api/public/account/list_menu',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
