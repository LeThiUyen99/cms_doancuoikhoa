import Resource from '@/api/resource'
import request from '@/utils/request'

class TagResource extends Resource {
  constructor() {
    super('tag')
  }
  tagList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeTag(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateTag(resource) {
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
}

export { TagResource as default }
