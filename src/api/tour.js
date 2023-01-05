import Resource from '@/api/resource'
import request from '@/utils/request'

class TourResource extends Resource {
  constructor() {
    super('tour')
  }
  tourList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeTour(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateTour(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteTour(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  getCountryList(query) {
    return request({
      url: `/${this.uri}/country?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  getProvinceList(query) {
    return request({
      url: `/${this.uri}/city?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeListImage(resource) {
    return request({
      url: `/${this.uri}/create_img?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  sendMess(query) {
    return request({
      url: `/${this.uri}/message?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { TourResource as default }
