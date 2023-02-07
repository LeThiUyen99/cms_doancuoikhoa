import Resource from '@/api/resource'
import request from '@/utils/request'

class AdminResource extends Resource {
  constructor() {
    super('admin')
  }
  storeAccount(resource) {
    return request({
      url: `/${this.uri}/register`,
      method: 'post',
      data: resource
    })
  }
  AccountList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  updateAccount(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteAccount(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  login(data) {
    return request({
      url: `/${this.uri}/login`,
      method: 'post',
      data
    })
  }
  updateActive(resource) {
    return request({
      url: `/${this.uri}/update_active?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  menuList(query) {
    return request({
      url: `/${this.uri}/menus?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  detailAdmin(id) {
    return request({
      url: `/${this.uri}/detail?id=${id}&${this.getVerify()}`,
      method: 'get'
    })
  }
  chartList(query) {
    return request({
      url: `chart/chart?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { AdminResource as default }
