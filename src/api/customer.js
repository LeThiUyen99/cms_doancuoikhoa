import Resource from '@/api/resource'
import request from '@/utils/request'

class CustomerResource extends Resource {
  constructor() {
    super('customer')
  }
  customerList(query) {
    return request({
      url: `/${this.uri}/list?${this.getVerify()}`,
      method: 'get',
      params: query
    })
  }
}
export { CustomerResource as default }
