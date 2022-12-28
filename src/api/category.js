import Resource from '@/api/resource'
import request from '@/utils/request'

class CategoryResource extends Resource {
  constructor() {
    super('category')
  }
  categoryList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
  storeCategory(resource) {
    return request({
      url: `/${this.uri}/create?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
  updateCategory(resource) {
    return request({
      url: `/${this.uri}/update?${this.getVerify()}`,
      method: 'post',
      data: resource
    })
  }
}

export { CategoryResource as default }
