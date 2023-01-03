import Resource from '@/api/resource'
import request from '@/utils/request'

class ItinerariesResource extends Resource {
  constructor() {
    super('tour_itineraries')
  }
  itinerariesList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeItineraries(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateItineraries(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  deleteCate(id) {
    return request({
      url: `/${this.uri}/delete/${id}?${this.getVerify()}`,
      method: 'get'
    })
  }
  search_tour(query) {
    return request({
      url: `/${this.uri}/search_tour?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}

export { ItinerariesResource as default }
