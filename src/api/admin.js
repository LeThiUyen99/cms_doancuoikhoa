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
}

export { AdminResource as default }
